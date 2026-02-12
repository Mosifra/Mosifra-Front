import { useState } from "preact/hooks"
import { getCookie } from "../../utils"
import { getBaseUrl } from "../../utils"
import { t } from "../../i18n"

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
      start_date: formData.startDate,
      end_date: formData.endDate,
      min_internship_length: parseInt(formData.minDuration),
      max_internship_length: parseInt(formData.maxDuration),
      title: formData.title,
      description: formData.description,
      place: formData.location,
    }

    try {
      const response = await fetch(`${getBaseUrl()}/create/internship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        console.log("Internship submitted successfully:", submissionData)
        alert(t("internship.submit.successMessage", null, "Stage proposé avec succès!"))

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
        throw new Error(t("internship.submit.errorSubmit", null, "Erreur lors de la soumission"))
      }
    } catch (error) {
      console.error("Error submitting internship:", error)
      alert(t("internship.submit.errorMessage", null, "Erreur lors de la proposition du stage"))
    }
  }

  return (
    <>
      <main className="min-h-screen bg-beige-mosifra p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <h1 className="text-4xl font-bold text-vert-mosifra mb-8">{t("internship.submit.title", null, "Proposer un stage")}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.courseType", null, "Type de formation *")}</label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                >
                  <option value="">{t("internship.submit.courseTypeSelect", null, "Sélectionner un type")}</option>
                  <option value="info">{t("internship.submit.courseTypeInfo", null, "BUT Informatique")}</option>
                  <option value="tc">{t("internship.submit.courseTypeTC", null, "BUT TC")}</option>
                  <option value="gea">{t("internship.submit.courseTypeGEA", null, "BUT GEA")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.titleLabel", null, "Titre du stage *")}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder={t("internship.submit.titlePlaceholder", null, "Ex: Développeur web full-stack")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.description", null, "Description *")}</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t("internship.submit.descriptionPlaceholder", null, "Décrivez les missions, responsabilités, compétences requises, etc.")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.location", null, "Lieu *")}</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder={t("internship.submit.locationPlaceholder", null, "Ex: Paris, France")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.startDate", null, "Date de début *")}</label>
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
                  <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.endDate", null, "Date de fin *")}</label>
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
                  <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.minDuration", null, "Durée minimum (semaines)")}</label>
                  <input
                    type="number"
                    name="minDuration"
                    value={formData.minDuration}
                    onChange={handleChange}
                    placeholder={t("internship.submit.minDurationPlaceholder", null, "Ex: 12")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">{t("internship.submit.maxDuration", null, "Durée maximum (semaines)")}</label>
                  <input
                    type="number"
                    name="maxDuration"
                    value={formData.maxDuration}
                    onChange={handleChange}
                    placeholder={t("internship.submit.maxDurationPlaceholder", null, "Ex: 16")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium transition-all transform duration-300 bg-beige-mosifra border-1 border-vert-mosifra text-vert-mosifra hover:text-beige-mosifra hover:bg-vert-mosifra"
              >
                {t("internship.submit.button", null, "Proposer le stage")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
