import { auth } from "@/auth";
import HomePage from "@/components/layout/homepage";

export default async function Home() {
  return (
    <div>
      <HomePage />
      <h1>chào mừng admin</h1>
    </div>
  );
}
