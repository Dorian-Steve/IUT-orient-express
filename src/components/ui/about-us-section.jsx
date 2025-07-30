// components/ui/about-us-section.jsx
import Image from "next/image";

export function AboutUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-600 opacity-70 rounded-br-[80px] rounded-tl-[80px] -rotate-3 transform scale-105"></div>
            <div className="absolute bottom-4 right-4 bg-white p-6 rounded-lg shadow-xl text-center z-10">
              <h4 className="text-3xl font-bold text-blue-600">Innovation pour l'Éducation</h4>
            </div>
            <Image
              src="/placeholder.svg" // Replace with your actual image path for component1.png
              alt="Étudiants de l'IUT Douala utilisant l'application Orient-Express"
              width={600}
              height={400}
              className="rounded-br-[80px] rounded-tl-[80px] shadow-lg relative z-0 object-cover w-full h-full"
            />
             {/* You might want to add the blue wave pattern as a background or overlay here if it's a static element */}
          </div>

          {/* Right Content Section */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Orient-Express: Bâtir l'Avenir de l'Orientation à l'IUT
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Orient-Express est le fruit d'une démarche rigoureuse pour révolutionner l'accès à l'information et le processus d'orientation à l'IUT Douala. Notre application est conçue pour résoudre les problèmes de visibilité, d'information dispersée, et d'inadéquation profil-formation.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    Technologie de Pointe
                  </h4>
                  <p className="text-gray-600">
                    Développée avec Next.js, TypeScript, Tailwind CSS, PostgreSQL et Next.Auth.js pour robustesse et flexibilité.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    Impact Durable
                  </h4>
                  <p className="text-gray-600">
                    Maximise la productivité et l'efficacité de l'Institut en optimisant la gestion des informations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
                {/* Placeholder for Signature - you'll likely use an Image component here */}
                <span className="text-5xl font-script text-gray-800">Votre Nom</span> {/* Replace with actual signature */}
                <div>
                    <p className="text-lg font-semibold text-gray-900">Le Chef de Projet</p>
                    <p className="text-gray-600">Équipe Orient-Express</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}