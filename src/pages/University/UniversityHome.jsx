import { Users, BarChart3, Settings } from "lucide-preact"
import { useLocation } from "preact-iso"

export default function UniversityHome() {
  const location = useLocation()
  const universityName = "Université de Test"

  const handleViewStudents = () => {
    location.route("/university/students")
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Bienvenue, {universityName}</h1>
            <p className="text-xl text-gray-700">Gérez vos étudiants et leurs stages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition">
              <div className="mb-6">
                <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4">
                  <Users />
                </div>
                <h2 className="text-2xl font-bold text-vert-mosifra mb-2">Gérer les étudiants</h2>
                <p className="text-gray-600">
                  Consultez la liste des étudiants, leurs profils et leurs placements en stages.
                </p>
              </div>
              <button
                onClick={handleViewStudents}
                className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Accéder
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">1,245</p>
              <p className="text-gray-600">Étudiants</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">892</p>
              <p className="text-gray-600">En stage</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <p className="text-4xl font-bold text-vert-mosifra mb-2">156</p>
              <p className="text-gray-600">Entreprises partenaires</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
