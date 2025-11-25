import { useState } from "preact/hooks"

const mockCandidates = [
  {
    id: 1,
    name: "Victor Maguer",
    email: "vmaguer@etsmaguer.com",
    status: "pending",
    internship: "Déployeur Openshift",
    appliedDate: "2025-11-01",
  },
  {
    id: 2,
    name: "Philippe Labiroute",
    email: "jeanphi@example.com",
    status: "accepted",
    internship: "Joueur de cor",
    appliedDate: "2025-10-28",
  },
  {
    id: 3,
    name: "Bernard Boule",
    email: "bernardlegoat@bernard.com",
    status: "rejected",
    internship: "Clown molesteur",
    appliedDate: "2025-10-25",
  },
]

export default function ManageCandidates() {
  const [selectedCandidate, setSelectedCandidate] = useState(mockCandidates[0])
  const [messages, setMessages] = useState([
    { role: "candidate", text: "Si j'avais le choix entre tuer ma mère ou abandonner Openshift je tuerais ma mère" },
    { role: "company", text: "Bonjour Victor, en vrai je comprends." },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { role: "company", text: newMessage }])
    setNewMessage("")
  }

  const handleStatusChange = (status) => {
    setSelectedCandidate({ ...selectedCandidate, status })
  }


  const stats = {
    pending: mockCandidates.filter((c) => c.status === "pending").length,
    accepted: mockCandidates.filter((c) => c.status === "accepted").length,
    total: mockCandidates.length,
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-vert-mosifra mb-8">Gestion des candidatures</h1>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <p className="text-sm text-gray-500 mb-2">En attente</p>
              <p className="text-3xl font-bold text-vert-mosifra">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <p className="text-sm text-gray-500 mb-2">Acceptés</p>
              <p className="text-3xl font-bold text-vert-mosifra">{stats.accepted}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <p className="text-sm text-gray-500 mb-2">Total</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col h-96">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                <h2 className="font-semibold text-gray-900">Candidats</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mockCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className={`px-6 py-4 border-b border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-300 transform ${
                      selectedCandidate.id === candidate.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{candidate.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{candidate.internship}</p>
                    <div
                      className={`text-xs font-semibold mt-2 inline-block px-2 py-1 rounded ${
                        candidate.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : candidate.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {candidate.status === "pending"
                        ? "En attente"
                        : candidate.status === "accepted"
                          ? "Accepté"
                          : "Rejeté"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col h-96">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                <h2 className="font-semibold text-gray-900">Détails</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nom</p>
                  <p className="font-semibold text-gray-900">{selectedCandidate.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-gray-900 break-all text-sm">{selectedCandidate.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stage demandé</p>
                  <p className="font-semibold text-gray-900">{selectedCandidate.internship}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de candidature</p>
                  <p className="text-gray-900 text-sm">{selectedCandidate.appliedDate}</p>
                </div>
                <div className="space-y-2 pt-6">
                  <button
                    onClick={() => handleStatusChange("accepted")}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all transform duration-300 text-sm font-medium"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleStatusChange("rejected")}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all transform duration-300 text-sm font-medium"
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-2 bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col h-96">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                <h2 className="font-semibold text-gray-900">Chat avec {selectedCandidate.name}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "company" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "company" ? "bg-vert-mosifra text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 p-6 flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                  placeholder="Écrire un message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-vert-mosifra text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform font-medium"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
