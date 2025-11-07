import { getUserTypeFromCookie } from "../utils.js";
import CompanyHome from "./Company/CompanyHome.jsx";
import StudentHome from "./Student/StudentHome.jsx";
import UniversityHome from "./University/UniversityHome.jsx";
import Home from "./defaultindex.jsx";


export async function HomeRouter() {
  const userType = await getUserTypeFromCookie();


  if (userType === "company") return <CompanyHome />;
  if (userType === "student") return <StudentHome />;
  if (userType === "university") return <UniversityHome />;


  return <Home />;
}