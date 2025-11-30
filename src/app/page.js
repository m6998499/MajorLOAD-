import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to MajorLoad</h1>
      <p className="text-slate-300 max-w-xl">
        Log in to access your carrier dashboard, see available loads, and manage
        your lanes in one clean interface.
      </p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="rounded-md bg-majorTeal px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Go to Login
        </Link>
        <Link
          href="/loadboard"
          className="rounded-md border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
        >
          View Load Board
        </Link>
      </div>
    </section>
  );
}
