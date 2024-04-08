import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Tensai</CardTitle>
          <CardDescription>Tensai is an AI test generator</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign in with google" />
        </CardContent>
      </Card>
      <a href="/dashboard">by-pass to dashboard</a>
    </div>
  );
}
