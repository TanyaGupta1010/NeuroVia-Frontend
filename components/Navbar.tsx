import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/skills">My Skills</Link>
      <Link href="/roadmap">Roadmap</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
