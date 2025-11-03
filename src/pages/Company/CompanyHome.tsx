import { ClipboardPen, Handshake } from "lucide-preact";
import { useLocation } from "preact-iso"

export default function CompanyHome() {
  const location = useLocation();
  const companyName = "Entreprise bullshit numéro 22"

  const handleSubmitInternship = () => {
    location.route("/company/submitinternship")
  }

  const handleManageCandidates = () => {
    location.route("/company/managecandidates")
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Bienvenue, {companyName}</h1>
            <p className="text-xl text-gray-700">Gérez vos offres de stage et vos candidatures en un seul endroit</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <ClipboardPen/>
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Proposer un stage</h2>
                <p className="text-gray-600">
                  Créez et publiez une nouvelle offre de stage. Définissez les critères, les dates et les formations
                  recherchées.
                </p>
              </div>
              <button
                onClick={handleSubmitInternship}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <Handshake/>
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Gérer les candidatures</h2>
                <p className="text-gray-600">
                  Consultez vos candidatures, communiquez avec les candidats et acceptez ou rejetez des offres.
                </p>
              </div>
              <button
                onClick={handleManageCandidates}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">12</p>
              <p className="text-gray-600">Offres actives</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">45</p>
              <p className="text-gray-600">Candidatures</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">8</p>
              <p className="text-gray-600">Acceptées</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
