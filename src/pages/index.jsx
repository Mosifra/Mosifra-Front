import { useEffect, useState } from "preact/hooks";
import { getUserTypeFromCookie } from "../utils.js";
import CompanyHome from "./Company/CompanyHome.jsx";
import StudentHome from "./Student/StudentHome.jsx";
import UniversityHome from "./University/UniversityHome.jsx";
import Home from "./defaultindex.jsx";


export function HomeRouter() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const type = await getUserTypeFromCookie();
        setUserType(type);
      } catch (err) {
        console.warn('Failed to fetch user type:', err);
        setUserType(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();
  }, []);

  if (userType === "company") return <CompanyHome />;
  if (userType === "student") return <StudentHome />;
  if (userType === "university") return <UniversityHome />;

  return <Home />;
}