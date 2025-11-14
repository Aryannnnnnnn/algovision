import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/algoadmin/sign-in");
  }

  return (
    <SettingsClient
      user={{
        username: user.username,
        firstName: user.firstName,
        emailAddresses: user.emailAddresses || [],
      }}
    />
  );
}
