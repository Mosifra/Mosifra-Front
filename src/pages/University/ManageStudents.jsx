import { ChevronLeft, Plus, Trash2, Upload } from "lucide-preact"
import { useState } from "preact/hooks"

export default function UniversityClasses() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Informatique - L3",
      year: "2024-2025",
      students: 45,
      lastUpload: "2024-11-03",
      studentList: [
        { id: 1, name: "Jean Dupont", email: "jean.dupont@uni.fr", matricule: "INF2021001" },
        { id: 2, name: "Marie Martin", email: "marie.martin@uni.fr", matricule: "INF2021002" },
        { id: 3, name: "Pierre Bernard", email: "pierre.bernard@uni.fr", matricule: "INF2021003" },
        { id: 4, name: "Sophie Durand", email: "sophie.durand@uni.fr", matricule: "INF2021004" },
        { id: 5, name: "Luc Laurent", email: "luc.laurent@uni.fr", matricule: "INF2021005" },
      ],
    },
    {
      id: 2,
      name: "Génie Civil - M1",
      year: "2024-2025",
      students: 32,
      lastUpload: "2024-10-15",
      studentList: [
        { id: 1, name: "Alice Moreau", email: "alice.moreau@uni.fr", matricule: "GEO2021001" },
        { id: 2, name: "Thomas Garnier", email: "thomas.garnier@uni.fr", matricule: "GEO2021002" },
        { id: 3, name: "Emma Rousseau", email: "emma.rousseau@uni.fr", matricule: "GEO2021003" },
      ],
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [newClassYear, setNewClassYear] = useState("2024-2025")
  const [uploadingClassId, setUploadingClassId] = useState(null)
  const [selectedClassId, setSelectedClassId] = useState(null)

  const handleAddClass = () => {
    if (newClassName.trim()) {
      const newClass = {
        id: classes.length + 1,
        name: newClassName,
        year: newClassYear,
        students: 0,
        lastUpload: null,
        studentList: [],
      }
      setClasses([...classes, newClass])
      setNewClassName("")
      setShowAddForm(false)
    }
  }

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id))
    if (selectedClassId === id) {
      setSelectedClassId(null)
    }
  }

  const handleCSVUpload = (classId, event) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      console.log("[v0] CSV file selected for class", classId, ":", file.name)
      setUploadingClassId(classId)

      // Call l'aPI ici
      setTimeout(() => {
        const updatedClasses = classes.map((c) =>
          c.id === classId
            ? { ...c, lastUpload: new Date().toISOString().split("T")[0], students: Math.floor(Math.random() * 100) }
            : c,
        )
        setClasses(updatedClasses)
        setUploadingClassId(null)
        alert("CSV importé avec succès! Traitement en cours...")
      }, 1000)
    }
  }

  const selectedClass = classes.find((c) => c.id === selectedClassId)

  if (selectedClassId) {
    return (
      <>
        <main className="min-h-screen bg-beige-mosifra">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <button
              onClick={() => setSelectedClassId(null)}
              className="flex items-center gap-2 mb-8 text-vert-mosifra font-semibold hover:opacity-70 transition"
            >
              <ChevronLeft size={20} />
              Retour aux classes
            </button>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra mb-8">
              <h1 className="text-4xl font-bold text-vert-mosifra mb-2">{selectedClass.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedClass.year}</p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Nombre d'étudiants</p>
                  <p className="text-3xl font-bold text-vert-mosifra">{selectedClass.students}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Dernière mise à jour</p>
                  <p className="text-lg font-semibold text-vert-mosifra">{selectedClass.lastUpload || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra">
              <h2 className="text-2xl font-bold text-vert-mosifra mb-6">Liste des étudiants</h2>

              {selectedClass.studentList && selectedClass.studentList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Nom</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Matricule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.studentList.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-gray-800">{student.name}</td>
                          <td className="px-4 py-3 text-gray-600">{student.email}</td>
                          <td className="px-4 py-3 text-gray-600 font-mono">{student.matricule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-600 py-8">Aucun étudiant importé pour cette classe</p>
              )}
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold text-vert-mosifra mb-2">Gestion des Classes</h1>
              <p className="text-xl text-gray-700">Gérez vos classes et importez vos listes d'étudiants</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:text-vert-mosifra hover:bg-beige-mosifra hover:border-1 hover:border-vert-mosifra transition-colors duration-500 flex items-center gap-2"
            >
              <Plus size={20} />
              Nouvelle classe
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-l-4 border-vert-mosifra">
              <h2 className="text-2xl font-bold text-vert-mosifra mb-6">Ajouter une nouvelle classe</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la classe</label>
                  <input
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="ex: Informatique - L3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-vert-mosifra"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Année académique</label>
                  <input
                    type="text"
                    value={newClassYear}
                    onChange={(e) => setNewClassYear(e.target.value)}
                    placeholder="ex: 2024-2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-vert-mosifra"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddClass}
                  className="px-6 py-2 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Créer la classe
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                onClick={() => setSelectedClassId(classItem.id)}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-vert-mosifra hover:shadow-lg transition cursor-pointer hover:border-l-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-vert-mosifra mb-1">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">{classItem.year}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteClass(classItem.id)
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Nombre d'étudiants</p>
                  <p className="text-3xl font-bold text-vert-mosifra">{classItem.students}</p>
                  {classItem.lastUpload && (
                    <p className="text-xs text-gray-500 mt-2">Dernière mise à jour: {classItem.lastUpload}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      e.stopPropagation()
                      handleCSVUpload(classItem.id, e)
                    }}
                    disabled={uploadingClassId === classItem.id}
                    className="hidden"
                    id={`csv-upload-${classItem.id}`}
                  />
                  <label
                    htmlFor={`csv-upload-${classItem.id}`}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-vert-mosifra rounded-lg font-semibold cursor-pointer transition ${uploadingClassId === classItem.id
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "text-vert-mosifra hover:bg-beige-mosifra"
                      }`}
                  >
                    <Upload size={18} />
                    {uploadingClassId === classItem.id ? "Traitement..." : "Importer CSV"}
                  </label>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">Format: nom, email, matricule</p>
              </div>
            ))}
          </div>

          {classes.length === 0 && !showAddForm && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Aucune classe créée. Commencez par ajouter une nouvelle classe.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
