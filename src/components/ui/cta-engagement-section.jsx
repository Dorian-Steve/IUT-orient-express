import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react"; // More fitting icons

export function CtaEngagementSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("/path/to/subtle-pattern.svg")', backgroundSize: 'cover' }}></div> {/* Optional: Add a subtle background pattern for texture */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Your Future Starts Here.
          </h2>
          <p className="mb-10 md:mb-14 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Ready to shape your academic path and career? Connect with us to explore possibilities and take the next step towards innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-3 bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl rounded-full">
              <Link href="/orientation">
                Start Your Orientation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-blue-500/50">
            <h3 className="mb-6 text-2xl md:text-3xl font-bold text-blue-50">
              Stay Informed. Join Our Community.
            </h3>
            <p className="mb-8 text-blue-200 max-w-xl mx-auto">
              Get the latest news, event updates, and program insights delivered directly to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow p-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-300 text-gray-900 bg-white/90 shadow-inner placeholder:text-gray-500"
              />
              <Button type="submit" className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center gap-2 transition-colors duration-300 shadow-md">
                Subscribe <Mail className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}