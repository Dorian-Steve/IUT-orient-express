// components/ui/it-solutions-section.jsx
import { PlayCircle } from "lucide-react";

export function ITSolutionsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Area */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              — Notre Mission
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Des Solutions IT Sur Mesure pour l'Orientation à l'IUT
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              L'application Orient-Express a été conçue pour surmonter les défis majeurs de l'orientation académique à l'IUT Douala. Nous fournissons des outils efficaces et accessibles pour améliorer la gestion des informations, renforcer la coordination entre étudiants et administration, et garantir une adéquation optimale entre profil et formation.
            </p>
            <div className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
              <PlayCircle className="h-8 w-8" />
              <span className="text-lg font-medium uppercase">Découvrir Orient-Express</span>
            </div>
          </div>

          {/* Right Grid of Services / Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg flex flex-col justify-between h-64">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h4 className="text-xl font-semibold mb-1">Visibilité sur les Parcours</h4>
              </div>
              <p className="text-blue-200">
                Accédez facilement à toutes les informations sur les filières et cursus disponibles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between h-64">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600 mb-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v2"></path>
                  <path d="M15 11V6a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5"></path>
                  <path d="M19 19v-2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2"></path>
                  <circle cx="12" cy="17" r="2"></circle>
                </svg>
                <h4 className="text-xl font-semibold mb-1 text-gray-900">
                  Orientation Personnalisée
                </h4>
              </div>
              <p className="text-gray-600">
                Un processus d'orientation amélioré pour une meilleure adéquation profil-formation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between h-64">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600 mb-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
                <h4 className="text-xl font-semibold mb-1 text-gray-900">
                  Communication Optimisée
                </h4>
              </div>
              <p className="text-gray-600">
                Renforcez la coordination entre étudiants, professeurs et administration.
              </p>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg flex flex-col justify-between h-64">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 17.5L20 16"></path>
                  <path d="M17 19.5V20"></path>
                  <path d="M12 22s-2-2-4-4L2 12l10-10 10 10-6 6-4 4z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <h4 className="text-xl font-semibold mb-1">
                  Gestion Efficace des Informations
                </h4>
              </div>
              <p className="text-blue-200">
                Centralisation des données pour une meilleure productivité de l'Institut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

