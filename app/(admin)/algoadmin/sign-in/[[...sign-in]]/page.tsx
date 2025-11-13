import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-[#00b5ff] hover:bg-[#0099dd] text-sm normal-case",
          },
        }}
      />
    </div>
  );
}
