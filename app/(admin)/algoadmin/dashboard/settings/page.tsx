import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { User, Bell, Shield, Database } from "lucide-react";

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <nav className="space-y-1">
              <a
                href="#profile"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg"
              >
                <User className="w-5 h-5" />
                Profile
              </a>
              <a
                href="#notifications"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                Notifications
              </a>
              <a
                href="#security"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Shield className="w-5 h-5" />
                Security
              </a>
              <a
                href="#data"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Database className="w-5 h-5" />
                Data & Privacy
              </a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div id="profile" className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Profile Settings
              </h2>
            </div>
            <div className="px-6 py-4 space-y-6">
              <div className="flex items-center gap-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-20 h-20",
                    },
                  }}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.username || user.firstName || "Admin"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user.emailAddresses?.[0]?.emailAddress || "No email"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={user.username || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Managed through Clerk authentication
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.emailAddresses?.[0]?.emailAddress || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Managed through Clerk authentication
                </p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div id="notifications" className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email notifications
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive email updates for new comments and posts
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00b5ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00b5ff]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Weekly summary
                  </p>
                  <p className="text-xs text-gray-600">
                    Get a weekly summary of site activity
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00b5ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00b5ff]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div id="security" className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Security Settings
              </h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Two-factor authentication
                  </p>
                  <p className="text-xs text-gray-600">
                    Managed through Clerk authentication
                  </p>
                </div>
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-[#00b5ff] hover:text-[#0099dd] font-medium"
                >
                  Manage in Clerk
                </a>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Password
                  </p>
                  <p className="text-xs text-gray-600">
                    Change your password in Clerk dashboard
                  </p>
                </div>
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-[#00b5ff] hover:text-[#0099dd] font-medium"
                >
                  Manage in Clerk
                </a>
              </div>
            </div>
          </div>

          {/* Data & Privacy Section */}
          <div id="data" className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Data & Privacy
              </h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Export your data
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  Download all your blog posts and case studies
                </p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Export Data
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Delete account
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  Permanently delete your account and all associated data
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
