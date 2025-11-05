import { useState, useEffect } from "preact/hooks"
import { useLocation } from "preact-iso"
import { Upload, Save, X, FileText, User, Mail, Phone } from "lucide-preact"
import { getUserTypeFromCookie } from "../../utils"

export default function StudentAccount() {
  const location = useLocation()
  const [userType, setUserType] = useState(null)
  const [studentData, setStudentData] = useState({
    firstName: "Victor",
    lastName: "Maguer",
    email: "victor.maguer@etsmaguer.com",
    phone: "+33 6 12 34 56 78",
    university: "Université de Limoges",
    major: "BUT3 Informatique",
    cv: null,
    cvName: "Cv_Maguer_Victor.pdf",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState(studentData)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    setUserType(getUserTypeFromCookie());

    if (userType !== "student") {
      alert("Accès réservé aux étudiants")
      location.route("/login")
    }

    // Remplacer par call api sur infos étudiant
    // const fetchStudentData = async () => {
    //   const response = await fetch("http://localhost:8000/student/profile");
    //   const data = await response.json();
    //   setStudentData(data);
    //   setEditData(data);
    // };
    // fetchStudentData();
  }, [])

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(studentData)
    }
    setIsEditing(!isEditing)
    setSuccessMessage("")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleCVUpload = (e) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      setEditData({
        ...editData,
        cv: file,
        cvName: file.name,
      })
    }
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append("firstName", editData.firstName)
      formData.append("lastName", editData.lastName)
      formData.append("email", editData.email)
      formData.append("phone", editData.phone)
      formData.append("university", editData.university)
      formData.append("major", editData.major)

      if (editData.cv) {
        formData.append("cv", editData.cv)
      }

      // Remplacer par call api
      // const response = await fetch("http://localhost:8000/student/profile/update", {
      //   method: "POST",
      //   body: formData,
      // });

      console.log("Profile updated:", editData)

      setStudentData(editData)
      setIsEditing(false)
      setSuccessMessage("Profil mis à jour avec succès!")

      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Erreur lors de la mise à jour du profil.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-beige-mosifra py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-vert-mosifra mb-2">Mon compte étudiant</h1>
          <p className="text-gray-700">Gérez votre profil et votre CV</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
            ✓ {successMessage}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-vert-mosifra p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User size={40} className="text-vert-mosifra" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        className="px-2 py-1 text-vert-mosifra rounded w-40"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        className="px-2 py-1 text-vert-mosifra rounded w-40"
                      />
                    </div>
                  ) : (
                    `${studentData.firstName} ${studentData.lastName}`
                  )}
                </h2>
                <p className="text-green-100">{studentData.university}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSaveChanges} className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-vert-mosifra mb-4 flex items-center gap-2">
                  <User size={20} />
                  Informations personnelles
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra focus:outline-none"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 flex items-center gap-2">
                        <Mail size={16} />
                        {studentData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra focus:outline-none"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 flex items-center gap-2">
                        <Phone size={16} />
                        {studentData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Université</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="university"
                        value={editData.university}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra focus:outline-none"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">{studentData.university}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cursus</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="major"
                        value={editData.major}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra focus:outline-none"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">{studentData.major}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-vert-mosifra mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Curriculum Vitae
                </h3>

                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="cv-upload"
                        onChange={handleCVUpload}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-vert-mosifra transition flex items-center justify-center gap-2 text-gray-600 hover:text-vert-mosifra"
                      >
                        <Upload size={20} />
                        {editData.cvName || "Cliquez pour télécharger votre CV"}
                      </label>
                      {editData.cv && (
                        <button
                          type="button"
                          onClick={() => setEditData({ ...editData, cv: null, cvName: "" })}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    {editData.cvName && (
                      <p className="text-sm text-gray-600">📄 Fichier sélectionné: {editData.cvName}</p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <span className="text-gray-700 flex items-center gap-2">
                      <FileText size={18} />
                      {studentData.cvName || "Aucun CV téléchargé"}
                    </span>
                    {studentData.cvName && (
                      <button type="button" className="text-sm text-vert-mosifra hover:underline">
                        Télécharger
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-4 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors duration-200 bg-beige-mosifra border-1 border-vert-mosifra text-vert-mosifra hover:text-beige-mosifra hover:bg-vert-mosifra"
                  >
                    Modifier mon profil
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">3</p>
            <p className="text-gray-600">Candidatures en cours</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">2</p>
            <p className="text-gray-600">Stages acceptés</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">1</p>
            <p className="text-gray-600">En cours</p>
          </div>
        </div>
      </div>
    </main>
  )
}
