import { BookOpen, FileText, Target } from "lucide-preact"
import { useLocation } from "preact-iso"

export default function StudentHome() {
  const location = useLocation()
  const studentName = "Étudiant"

  const handleBrowseInternships = () => {
    location.route("/internships")
  }

  const handleMyAccount = () => {
    location.route("/student/account")
  }

  const handleMyApplications = () => {
    location.route("/student/applications")
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Bienvenue, {studentName}</h1>
            <p className="text-xl text-gray-700">Trouvez et postulez aux meilleures offres de stage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <BookOpen />
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Parcourir les stages</h2>
                <p className="text-gray-600">
                  Découvrez toutes les offres de stage disponibles adaptées à votre profil et vos aspirations.
                </p>
              </div>
              <button
                onClick={handleBrowseInternships}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <FileText />
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Mon compte</h2>
                <p className="text-gray-600">
                  Gérez votre profil, mettez à jour votre CV et consultez vos candidatures.
                </p>
              </div>
              <button
                onClick={handleMyAccount}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <Target />
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Mes candidatures</h2>
                <p className="text-gray-600">Suivez l'état de vos candidatures et les réponses des entreprises.</p>
              </div>
              <button
                onClick={handleMyApplications}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">24</p>
              <p className="text-gray-600">Stages disponibles</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">5</p>
              <p className="text-gray-600">Candidatures</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">2</p>
              <p className="text-gray-600">En attente</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
