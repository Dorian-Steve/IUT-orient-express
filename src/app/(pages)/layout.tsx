"use client";

import { Navbar } from "@/components/shared/Nav/Navbar";
import { Loader } from "@/components/shared/loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (status === "loading") {
    return <Loader size="md" className="absolute left-3" />;
  }

  return (
    <section>
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* Add padding-top to prevent content from going under the fixed Navbar */}
        {children}
      </main>
    </section>
  );
}
