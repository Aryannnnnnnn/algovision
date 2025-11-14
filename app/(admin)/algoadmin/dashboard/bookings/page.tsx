import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BookingsClient from "./BookingsClient";

export const metadata = {
  title: "Bookings | Admin Dashboard",
  description: "Manage strategy call bookings",
};

export default async function BookingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/algoadmin/sign-in");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage strategy call bookings and communicate with clients
        </p>
      </div>

      {/* Client Component */}
      <BookingsClient />
    </div>
  );
}
