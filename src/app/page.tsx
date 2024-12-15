import { auth } from "@/auth";
import HomePage from "@/components/layout/homepage";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <HomePage />
      <h1>chào mừng admin</h1>
      <Link href="/auth/login">Login</Link>
    </div>
  );
}
