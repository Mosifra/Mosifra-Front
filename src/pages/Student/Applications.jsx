import { useState, useEffect } from "preact/hooks"
import { useLocation } from "preact-iso"
import { Clock, CheckCircle, XCircle, FileText, ArrowRight } from "lucide-preact"

export default function Applications() {
  const location = useLocation()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        internshipTitle: "Développeur Full Stack",
        company: "TechCorp",
        location: "Paris",
        status: "accepted",
        appliedDate: "2024-08-15",
        responseDate: "2024-08-20",
        motivation: "Je suis très intéressé par cette opportunité...",
        salary: "Gratuit",
      },
      {
        id: 2,
        internshipTitle: "Designer UX/UI",
        company: "DesignStudio",
        location: "Lyon",
        status: "pending",
        appliedDate: "2024-08-18",
        responseDate: null,
        motivation: "Créez des interfaces innovantes...",
        salary: "Gratuit",
      },
      {
        id: 3,
        internshipTitle: "Data Analyst",
        company: "DataInsights",
        location: "Marseille",
        status: "rejected",
        appliedDate: "2024-08-10",
        responseDate: "2024-08-22",
        motivation: "Analysez les données et créez des rapports...",
        salary: "Rémunéré",
      },
      {
        id: 4,
        internshipTitle: "Frontend Developer",
        company: "WebAgency",
        location: "Toulouse",
        status: "pending",
        appliedDate: "2024-08-20",
        responseDate: null,
        motivation: "Développement d'applications web modernes...",
        salary: "Gratuit",
      },
    ]

    setApplications(mockApplications)
    setLoading(false)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      accepted: {
        label: "Accepté",
        icon: <CheckCircle size={16} />,
        color: "bg-green-100 text-green-700 border-green-300",
      },
      pending: {
        label: "En attente",
        icon: <Clock size={16} />,
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      },
      rejected: {
        label: "Rejeté",
        icon: <XCircle size={16} />,
        color: "bg-red-100 text-red-700 border-red-300",
      },
    }
    return badges[status] || badges.pending
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true
    return app.status === filter
  })

  const stats = {
    total: applications.length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    pending: applications.filter((a) => a.status === "pending").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-beige-mosifra flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-vert-mosifra font-semibold">Chargement des candidatures...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Mes candidatures</h1>
          <p className="text-xl text-gray-700">Suivez l'état de toutes vos candidatures de stage</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">{stats.total}</p>
            <p className="text-gray-600 font-medium">Total</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <p className="text-3xl font-bold text-green-600 mb-1">{stats.accepted}</p>
            <p className="text-gray-600 font-medium">Acceptées</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-yellow-200">
            <p className="text-3xl font-bold text-yellow-600 mb-1">{stats.pending}</p>
            <p className="text-gray-600 font-medium">En attente</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <p className="text-3xl font-bold text-red-600 mb-1">{stats.rejected}</p>
            <p className="text-gray-600 font-medium">Rejetées</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-vert-mosifra text-white"
                : "bg-white text-vert-mosifra border border-vert-mosifra hover:bg-beige-mosifra"
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === "accepted"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border border-green-300 hover:bg-green-50"
            }`}
          >
            Acceptées
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-white text-yellow-600 border border-yellow-300 hover:bg-yellow-50"
            }`}
          >
            En attente
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-300 hover:bg-red-50"
            }`}
          >
            Rejetées
          </button>
        </div>

        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => {
              const statusInfo = getStatusBadge(application.status)
              return (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-beige-mosifra rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="text-vert-mosifra" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-vert-mosifra mb-1">{application.internshipTitle}</h3>
                          <p className="text-gray-600 font-medium mb-2">{application.company}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span>📍 {application.location}</span>
                            <span>💼 {application.salary}</span>
                            <span>📅 Candidature: {new Date(application.appliedDate).toLocaleDateString("fr-FR")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>

                      {application.responseDate && (
                        <p className="text-sm text-gray-600">
                          Réponse: {new Date(application.responseDate).toLocaleDateString("fr-FR")}
                        </p>
                      )}

                      <button className="mt-2 px-4 py-2 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2">
                        Détails
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-4">Aucune candidature trouvée</p>
              <button
                onClick={() => location.route("/internships")}
                className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Parcourir les offres
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
