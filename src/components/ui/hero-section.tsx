// components/ui/hero-section.jsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import Image for potentially optimized background, or just use CSS directly

export function HeroSection() {
  return (
    <section
      className="relative pt-20 pb-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/image.png')" }} // Set the background image
    >
      {/* Optional: Add an overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10"> {/* z-10 ensures content is above overlay */}
        <div className="max-w-4xl mx-auto text-center text-white"> {/* Changed text color to white for readability on dark background */}
          <h1 className="text-5xl font-bold mb-6">Welcome to Orient Express</h1>
          <p className="text-xl mb-8 leading-relaxed">
            The Orient Express IUT Douala platform is your gateway to excellence in technology and
            innovation. Our intelligent platform guides you through your academic journey with personalized orientation
            and comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
              <Link href="/orientation">Start Your Orientation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/academics">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}