import { useState, useEffect } from "preact/hooks"
import { FileText, User, Mail, Phone } from "lucide-preact"
import { getBaseUrl, getCookie } from "../../utils"
import { t } from "../../i18n"

export default function StudentAccount() {
  const [studentData, setStudentData] = useState({
    success: null,
    first_name: null,
    last_name: null,
    email: null,
    university: null,
    class_name: null,
  })

  useEffect(() => {
    const fetchStudentData = async () => {
      const headers = new Headers();
      const jwt = getCookie("jwt");
      headers.append("Authorization", `Bearer ${jwt}`);
      const options = {
        method: "GET",
        headers: headers,
        redirect: "follow"
      };

      try {
        const response = await fetch(`${getBaseUrl()}/user/student_info`, options);
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, [])

  return (
    <main className="min-h-screen bg-beige-mosifra py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-vert-mosifra mb-2">{t("student.account.title", null, "Mon compte étudiant")}</h1>
          <p className="text-gray-700">{t("student.account.subtitle", null, "Informations de votre profil")}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-vert-mosifra p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User size={40} className="text-vert-mosifra" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {studentData.first_name || "—"} {studentData.last_name || "—"}
                </h2>
                <p className="text-green-100">{studentData.university || "—"}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-vert-mosifra mb-4 flex items-center gap-2">
                <User size={20} />
                {t("student.account.personalInfo", null, "Informations personnelles")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("student.account.email", null, "Email")}</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 flex items-center gap-2">
                    <Mail size={16} />
                    {studentData.email || "—"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("student.account.university", null, "Université")}</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                    {studentData.university || "—"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("student.account.cursus", null, "Cursus")}</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                    {studentData.class_name || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">3</p>
            <p className="text-gray-600">{t("student.account.applicationsInProgress", null, "Candidatures en cours")}</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">2</p>
            <p className="text-gray-600">{t("student.account.acceptedInternships", null, "Stages acceptés")}</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-vert-mosifra mb-1">1</p>
            <p className="text-gray-600">{t("student.account.inProgress", null, "En cours")}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
