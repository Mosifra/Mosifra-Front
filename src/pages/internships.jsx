import { BookOpen, Send, Upload, X } from "lucide-preact"
import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks"
import { getUserTypeFromCookie } from "../utils"

export default function Internships() {
  const location = useLocation()
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState(null)
  const [loadingUserType, setLoadingUserType] = useState(true)
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    motivationLetter: "",
    cv: null,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {

    const fetchUserType = async () => {
      const type = await getUserTypeFromCookie()
      setUserType(type)
      setLoadingUserType(false)
    }
    fetchUserType()

    const mockInternships = [
      {
        id: 1,
        title: "Développeur Full Stack",
        company: "TechCorp",
        location: "Paris",
        duration: "3 mois",
        description: "Rejoignez notre équipe pour développer des applications web modernes.",
        requirements: ["JavaScript", "React", "Node.js"],
        salary: "Gratuit",
        startDate: "2024-09-01",
        endDate: "2024-11-30",
      },
      {
        id: 2,
        title: "Designer UX/UI",
        company: "DesignStudio",
        location: "Lyon",
        duration: "2 mois",
        description: "Créez des interfaces innovantes pour nos clients.",
        requirements: ["Figma", "Adobe XD", "Prototyping"],
        salary: "Gratuit",
        startDate: "2024-10-01",
        endDate: "2024-11-30",
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "DataInsights",
        location: "Marseille",
        duration: "4 mois",
        description: "Analysez les données et créez des rapports pertinents.",
        requirements: ["Python", "SQL", "Tableau"],
        salary: "Rémunéré",
        startDate: "2024-08-15",
        endDate: "2024-12-15",
      },
    ]

    setInternships(mockInternships)
    setLoading(false)
  }, [])

  const handleApplyClick = (internship) => {
    if (userType !== "student") {
      alert("Seuls les étudiants peuvent postuler à des stages.")
      return
    }
    setSelectedInternship(internship)
    setShowApplicationModal(true)
  }

  const handleSubmitApplication = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("internship_id", selectedInternship.id)
      formData.append("motivation_letter", applicationData.motivationLetter)
      if (applicationData.cv) {
        formData.append("cv", applicationData.cv)
      }

      // Call l'API
      // const response = await fetch("http://localhost:8000/apply", {
      //   method: "POST",
      //   body: formData,
      // });

      console.log("Application submitted:", {
        internshipId: selectedInternship.id,
        motivation: applicationData.motivationLetter,
        cv: applicationData.cv?.name,
      })

      alert("Candidature envoyée avec succès!")
      setShowApplicationModal(false)
      setApplicationData({ motivationLetter: "", cv: null })
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Erreur lors de l'envoi de la candidature.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-beige-mosifra flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-vert-mosifra font-semibold">Chargement des offres...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Offres de stage</h1>
          <p className="text-xl text-gray-700">
            {userType === "student"
              ? "Explorez les meilleures offres de stage et postulez dès maintenant"
              : "Consultez les offres de stage disponibles"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-vert-mosifra mb-1">{internship.title}</h3>
                    <p className="text-gray-600 font-medium">{internship.company}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-vert-mosifra">📍</span>
                    {internship.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-vert-mosifra">⏱️</span>
                    {internship.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-vert-mosifra">💰</span>
                    {internship.salary}
                  </p>
                </div>

                <p className="text-gray-700 text-sm mb-4">{internship.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Compétences requises:</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.requirements.map((req, idx) => (
                      <span key={idx} className="text-xs bg-beige-mosifra text-vert-mosifra px-3 py-1 rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {loadingUserType ? (
                  <div className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-lg text-center font-semibold cursor-not-allowed">
                    Consultation uniquement
                  </div>
                ) : userType === "student" ? (
                  <button
                    onClick={() => handleApplyClick(internship)}
                    className="w-full px-4 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Postuler
                  </button>
                ) : userType === "university" ? (
                  <div className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-lg font-semibold text-center cursor-not-allowed">
                    Consultation uniquement
                  </div>
                ) : (
                  <button
                    onClick={() => location.route("/login")}
                    className="w-full px-4 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                  >
                    Se connecter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {internships.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Aucune offre disponible pour le moment.</p>
          </div>
        )}
      </div>

      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-vert-mosifra">Candidature pour {selectedInternship?.title}</h2>
                  <p className="text-gray-600">{selectedInternship?.company}</p>
                </div>
                <button
                  onClick={() => {
                    setShowApplicationModal(false)
                    setApplicationData({ motivationLetter: "", cv: null })
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-vert-mosifra mb-2">Lettre de motivation</label>
                  <textarea
                    value={applicationData.motivationLetter}
                    onInput={(e) =>
                      setApplicationData({
                        ...applicationData,
                        motivationLetter: e.target.value,
                      })
                    }
                    placeholder="Expliquez pourquoi vous êtes intéressé par ce stage..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-vert-mosifra mb-2">CV (optionnel)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="cv-upload"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0]
                        if (file) {
                          setApplicationData({ ...applicationData, cv: file })
                        }
                      }}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-vert-mosifra transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 hover:text-vert-mosifra"
                    >
                      <Upload size={20} />
                      {applicationData.cv ? applicationData.cv.name : "Cliquez pour télécharger"}
                    </label>
                    {applicationData.cv && (
                      <button
                        type="button"
                        onClick={() => setApplicationData({ ...applicationData, cv: null })}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={submitting || !applicationData.motivationLetter.trim()}
                    className="flex-1 px-4 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {submitting ? "Envoi en cours..." : "Envoyer la candidature"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplicationModal(false)
                      setApplicationData({ motivationLetter: "", cv: null })
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
