// // pages/index.js (or wherever your HomePage component is)
// import { HeroSection } from "@/components/ui/hero-section";
// import { FeaturesSection } from "@/components/ui/features-home"; // Consider replacing this
// import { ProgramOpportunityCard } from "@/components/ui/programs-opportunities-section"; // Import the new section
// import { CtaEngagementSection } from "@/components/ui/cta-engagement-section"; // Import the new section

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <HeroSection />
//       {/*
//         You can choose to fully replace FeaturesSection with ProgramsOpportunitiesSection for a more professional look.
//         Or you can keep FeaturesSection and place ProgramsOpportunitiesSection after it if you want more sections.
//         I recommend replacing it for less redundancy and a more impactful visual.
//       */}
//       {/* <FeaturesSection /> */}
//       <ProgramOpportunityCard
//         icon={() => <span role="img" aria-label="Opportunity">🚆</span>}
//         title="Explore Our Programs"
//         description="Discover unique opportunities and programs tailored for you."
//         link="/programs"
//       />
      
//       {/* Add the new, integrated CTA & Engagement section */}
//       <CtaEngagementSection /> 
//     </div>
//   );
// }
// app/page.jsx (or wherever your HomePage component is located)
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-home";
import { ITSolutionsSection } from "@/components/ui/it-solutions-section"; // Import the new section
import { AboutUsSection } from "@/components/ui/about-us-section"; // Import the new section

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <ITSolutionsSection /> {/* Add the new section here */}
      <AboutUsSection />    {/* Add the new section here */}
    </div>
  );
}