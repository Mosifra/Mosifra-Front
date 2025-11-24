import { ChevronLeft, Plus, Trash2, Upload } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { getCookie } from "../../utils";

export default function UniversityClasses() {
  const [classes, setClasses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCourseType, setNewCourseType] = useState("");
  const [newInternshipStart, setNewInternshipStart] = useState("");
  const [newInternshipEnd, setNewInternshipEnd] = useState("");
  const [newMaxLength, setNewMaxLength] = useState("");
  const [newMinLength, setNewMinLength] = useState("");
  const [uploadingClassId, setUploadingClassId] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const COURSE_TYPE_LABELS = {
    info: "Informatique",
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const headers = new Headers();
      const jwt = getCookie("jwt");
      headers.append("Authorization", `Bearer ${jwt}`);
      const options = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8000/courses/classes",
          options
        );
        const data = await response.json();
        setClasses(data.classes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClassId) return;

    const fetchStudents = async (classId) => {
      const headers = new Headers();
      const jwt = getCookie("jwt");
      headers.append("Authorization", `Bearer ${jwt}`);
      headers.append("Content-Type", "application/json");

      const payload = { class_id: String(classId) };

      try {
        const response = await fetch(
          "http://localhost:8000/courses/class/students",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (!data.success) {
          console.error("Échec de récupération des étudiants");
          return;
        }

        setClasses((prev) =>
          prev.map((c) =>
            c.id === classId ? { ...c, studentList: data.students || [] } : c
          )
        );
      } catch (error) {
        console.error("Erreur lors du fetch des étudiants :", error);
      }
    };

    fetchStudents(selectedClassId);
  }, [selectedClassId]);

  const handleAddClass = async () => {
    if (newName.trim()) {
      const payload = {
        name: newName,
        course_type: newCourseType,
        date_internship_start: newInternshipStart,
        date_internship_end: newInternshipEnd,
        maximum_internship_length: Number(newMaxLength),
        minimum_internship_length: Number(newMinLength),
      };

      try {
        const jwt = getCookie("jwt");
        const response = await fetch("http://localhost:8000/create/class", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!result.success) {
          console.error("Échec de la création de la classe");
          return;
        }

        const classesResponse = await fetch("http://localhost:8000/courses/classes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const classesData = await classesResponse.json();
        setClasses(classesData.classes);

        setNewName("");
        setNewCourseType("");
        setNewInternshipStart("");
        setNewInternshipEnd("");
        setNewMaxLength("");
        setNewMinLength("");
        setShowAddForm(false);
      } catch (error) {
        console.error("Erreur lors de l'appel backend :", error);
      }
    }
  };

  const handleDeleteClass = async (id) => {
    const confirmed = window.confirm("Avez-vous la certitude de vouloir supprimer cette classe ? Cette action est irréversible.")
    if (!confirmed) return;
    
    const headers = new Headers();
    const jwt = getCookie("jwt");
    headers.append("Authorization", `Bearer ${jwt}`);
    headers.append("Content-Type", "application/json");
    const payload = {
      class_id: `${id}`
    };
    try {
      const response = await fetch("http://localhost:8000/courses/class", {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error("Erreur lors de la suppression");
      }

      window.location.reload();

    } catch (e) {
      console.log(e);
    }
  };

  const handleCSVUpload = async (classId, event) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "text/csv") return;

    try {
      setUploadingClassId(classId);

      const formData = new FormData();
      formData.append("csv", file);
      formData.append("class", String(classId));
      const jwt = getCookie("jwt");

      const response = await fetch("http://localhost:8000/create/students", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        setUploadingClassId(null);
        return;
      }

      if (selectedClassId === classId) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${jwt}`);
        headers.append("Content-Type", "application/json");

        const studentResponse = await fetch(
          "http://localhost:8000/courses/class/students",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ class_id: String(classId) }),
          }
        );

        const studentData = await studentResponse.json();
        if (studentData.success) {
          setClasses((prev) =>
            prev.map((c) =>
              c.id === classId ? { ...c, studentList: studentData.students || [] } : c
            )
          );
        }
      }

      setUploadingClassId(null);
    } catch (err) {
      console.error("Erreur lors de l'envoi du fichier CSV :", err);
      setUploadingClassId(null);
    }
  };

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  if (selectedClassId) {
    return (
      <main className="min-h-screen bg-beige-mosifra">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <button
            onClick={() => setSelectedClassId(null)}
            className="flex items-center gap-2 mb-8 text-vert-mosifra font-semibold hover:opacity-70 transition-colors duration-300"
          >
            <ChevronLeft size={20} />
            Retour aux classes
          </button>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra mb-8">
            <h1 className="text-4xl font-bold text-vert-mosifra mb-2">
              {selectedClass?.name || "Classe non trouvée"}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Cursus</p>
                <p className="text-lg font-semibold text-vert-mosifra">
                  {COURSE_TYPE_LABELS[selectedClass?.course_type] ||
                    selectedClass?.course_type}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Début du stage</p>
                <p className="text-lg font-semibold text-vert-mosifra">
                  {selectedClass?.date_internship_start}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Fin du stage</p>
                <p className="text-lg font-semibold text-vert-mosifra">
                  {selectedClass?.date_internship_end}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  Durée minimale (semaines)
                </p>
                <p className="text-lg font-semibold text-vert-mosifra">
                  {selectedClass?.minimum_internship_length}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  Durée maximale (semaines)
                </p>
                <p className="text-lg font-semibold text-vert-mosifra">
                  {selectedClass?.maximum_internship_length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra">
            <h2 className="text-2xl font-bold text-vert-mosifra mb-6">
              Liste des étudiants
            </h2>

            {selectedClass?.studentList?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Prénom
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Courriel
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.studentList.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {student.last_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {student.first_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-mono">
                          {student.mail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">
                Aucun étudiant importé pour cette classe
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-vert-mosifra mb-2">
              Gestion des classes
            </h1>
            <p className="text-xl text-gray-700">
              Gérez vos classes et importez vos listes d'étudiants
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:text-vert-mosifra hover:border-vert-mosifra hover:border-1 hover:bg-beige-mosifra transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            Nouvelle classe
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-l-4 border-vert-mosifra">
            <h2 className="text-2xl font-bold text-vert-mosifra mb-6">
              Ajouter une nouvelle classe
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la classe
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ex : BUT3"
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cursus
                </label>

                <select
                  value={newCourseType}
                  onChange={(e) => setNewCourseType(e.target.value)}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:border-vert-mosifra placeholder:text-gray-500"
                >
                  <option value="">— Choisir un type —</option>
                  <option value="info">Informatique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Début du stage
                </label>
                <input
                  type="date"
                  value={newInternshipStart}
                  onChange={(e) => setNewInternshipStart(e.target.value)}
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fin du stage
                </label>
                <input
                  type="date"
                  value={newInternshipEnd}
                  onChange={(e) => setNewInternshipEnd(e.target.value)}
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Durée minimale (semaines)
                </label>
                <input
                  type="number"
                  value={newMinLength}
                  onChange={(e) => setNewMinLength(e.target.value)}
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Durée maximale (semaines)
                </label>
                <input
                  type="number"
                  value={newMaxLength}
                  onChange={(e) => setNewMaxLength(e.target.value)}
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:border-vert-mosifra"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddClass}
                className="px-6 py-2 bg-vert-mosifra text-white rounded-lg font-semibold"
              >
                Créer la classe
              </button>

              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold"
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
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-vert-mosifra hover:shadow-lg"
            >
              <div 
                onClick={() => setSelectedClassId(classItem.id)}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-vert-mosifra mb-1">
                      {classItem.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {COURSE_TYPE_LABELS[classItem.course_type] ||
                        classItem.course_type}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(classItem.id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleCSVUpload(classItem.id, e)}
                  disabled={uploadingClassId === classItem.id}
                  className="hidden"
                  id={`csv-upload-${classItem.id}`}
                />

                <label
                  htmlFor={`csv-upload-${classItem.id}`}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-vert-mosifra rounded-lg font-semibold cursor-pointer transition-colors duration-300 ${
                    uploadingClassId === classItem.id
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "text-vert-mosifra hover:bg-beige-mosifra"
                  }`}
                >
                  <Upload size={18} />
                  {uploadingClassId === classItem.id
                    ? "Traitement..."
                    : "Importer CSV"}
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Format : Prénom, Nom, Courriel
              </p>
            </div>
          ))}
        </div>

        {classes.length === 0 && !showAddForm && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Aucune classe créée. Commencez par ajouter une nouvelle classe.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}