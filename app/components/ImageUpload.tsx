"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = "images",
  folder = "uploads",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Upload via API route (with Clerk authentication)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      // Send old image URL so it can be deleted from storage
      if (value) {
        formData.append("oldImageUrl", value);
      }

      const response = await fetch("/api/upload-featured-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const { url } = await response.json();
      onChange(url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // Delete from storage if it's a Supabase URL
    if (value.includes('/storage/v1/object/public/images/')) {
      try {
        const response = await fetch('/api/delete-image', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: value }),
        });

        if (!response.ok) {
          console.error('Failed to delete image from storage');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    onChange("");
    setError("");
  };

  return (
    <div className="space-y-3">
      {/* Image Preview */}
      {value && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-3">
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#00b5ff] hover:bg-gray-50 transition-colors">
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#00b5ff]" />
                <span className="text-sm text-gray-600">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {value ? "Change Image" : "Upload Image"}
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Manual URL Input */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Or enter image URL manually:
        </label>
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent text-sm"
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
      </p>
    </div>
  );
}
