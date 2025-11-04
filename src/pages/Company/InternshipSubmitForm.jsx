import { useState } from "preact/hooks"

export default function SubmitInternship() {
  const [formData, setFormData] = useState({
    trainingType: "",
    internshipName: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return 0
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const weeks = Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
    return weeks
  }

  const handleChange = (e) => {
    const target = e.target
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Internship submitted:", {
      ...formData,
      duration: calculateDuration(),
    })
    alert("Stage proposé avec succès!")
    setFormData({
      trainingType: "",
      internshipName: "",
      description: "",
      startDate: "",
      endDate: "",
    })
  }

  const duration = calculateDuration()

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <h1 className="text-4xl font-bold text-vert-mosifra mb-8">Proposer un stage</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Type de formation recherché *</label>
                <select
                  name="trainingType"
                  value={formData.trainingType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="butinfo">BUT Informatique</option>
                  <option value="buttc">BUT TC</option>
                  <option value="butgea">BUT GEA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nom du stage *</label>
                <input
                  type="text"
                  name="internshipName"
                  value={formData.internshipName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Clown qui picole sur les heures de travail"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décrivez les responsabilités, compétences requises, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Date de début *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Date de fin *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
              </div>

              {duration > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                  <p className="text-sm text-gray-700">
                    Durée du stage:{" "}
                    <span className="font-bold text-vert-mosifra">
                      {duration} semaine{duration > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-vert-mosifra text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                Proposer le stage
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
