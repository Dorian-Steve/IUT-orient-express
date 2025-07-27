import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

// import Link from "next/link";

// import { auth } from "@/server/auth";
// import { api, HydrateClient } from "@/trpc/server";

// export default async function Home() {
//   return (
//     <HydrateClient>
//       <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></main>
//     </HydrateClient>
//   );
// }
