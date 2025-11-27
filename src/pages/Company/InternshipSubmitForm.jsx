import { useState } from "preact/hooks"
import { getCookie } from "../../utils"

export default function SubmitInternship() {
  const [formData, setFormData] = useState({
    courseType: "",
    startDate: "",
    endDate: "",
    minDuration: "",
    maxDuration: "",
    title: "",
    description: "",
    location: "",
  })

  const handleChange = (e) => {
    const target = e.target
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const jwt = getCookie("jwt");
    
    const submissionData = {
      course_type: formData.courseType,
      date_start: formData.startDate,
      date_end: formData.endDate,
      min_internship_length: formData.minDuration,
      max_internship_length: formData.maxDuration,
      title: formData.title,
      description: formData.description,
      place: formData.location,
    }

    try {
      const response = await fetch("http://localhost:8000/create/internship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        console.log("Internship submitted successfully:", submissionData)
        alert("Stage proposé avec succès!")
        
        setFormData({
          courseType: "",
          startDate: "",
          endDate: "",
          minDuration: "",
          maxDuration: "",
          title: "",
          description: "",
          location: "",
        })
      } else {
        throw new Error("Erreur lors de la soumission")
      }
    } catch (error) {
      console.error("Error submitting internship:", error)
      alert("Erreur lors de la proposition du stage")
    }
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <h1 className="text-4xl font-bold text-vert-mosifra mb-8">Proposer un stage</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Type de formation *</label>
                <select
                  name="courseType"
                  value={formData.courseType}
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">Titre du stage *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Développeur web full-stack"
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
                  placeholder="Décrivez les missions, responsabilités, compétences requises, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Lieu *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Paris, France"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Durée minimum (semaines)</label>
                  <input
                    type="number"
                    name="minDuration"
                    value={formData.minDuration}
                    onChange={handleChange}
                    placeholder="Ex: 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Durée maximum (semaines)</label>
                  <input
                    type="number"
                    name="maxDuration"
                    value={formData.maxDuration}
                    onChange={handleChange}
                    placeholder="Ex: 16"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {duration > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                  <p className="text-sm text-gray-700">
                    Durée calculée:{" "}
                    <span className="font-bold text-vert-mosifra">
                      {duration} semaine{duration > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium transition-all transform duration-300 bg-beige-mosifra border-1 border-vert-mosifra text-vert-mosifra hover:text-beige-mosifra hover:bg-vert-mosifra"
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