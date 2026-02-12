import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { NotFound } from './pages/_404.jsx';
import SubmitInternship from './pages/Company/InternshipSubmitForm.jsx';
import ManageCandidates from './pages/Company/ManageCandidates.jsx';
import { HomeRouter } from './pages/index.jsx';
import Internships from './pages/internships.jsx';
import { LoginPage } from './pages/login.jsx';
import SessionChecker from './pages/SessionChecker.jsx';
import StudentAccount from './pages/Student/account.jsx';
import Applications from './pages/Student/Applications.jsx';
import { Twofa } from './pages/twofa.jsx';
import ManageStudents from './pages/University/ManageStudents.jsx';
import { ProtectedRouteByType } from './components/ProtectedRouteByType.jsx';
import { Footer } from './components/footer.jsx';
import { Unauthorized } from './pages/_403.jsx';
import { initI18n } from "./i18n";

initI18n();

export function App() {
  return (
    <SessionChecker>
      <LocationProvider>
        <Header />
        <main>
          <Router>
            <Route path="/" component={HomeRouter} />
            <Route path="/login" component={LoginPage} />
            <Route path="/twofa" component={Twofa} />
            <Route path='/403' component={Unauthorized} />
            <ProtectedRouteByType path="/internships" component={Internships} allowedTypes={['student', 'university']} />
            <ProtectedRouteByType path="/student/account" component={StudentAccount} allowedTypes={['student']} />
            <ProtectedRouteByType path="/student/applications" component={Applications} allowedTypes={['student']} />
            <ProtectedRouteByType path="/company/managecandidates" component={ManageCandidates} allowedTypes={['company']} />
            <ProtectedRouteByType path="/company/submitinternship" component={SubmitInternship} allowedTypes={['company']} />
            <ProtectedRouteByType path="/university/students" component={ManageStudents} allowedTypes={['university']} />
            <Route default component={NotFound} />
          </Router>
        </main>
        <Footer />
      </LocationProvider>
    </SessionChecker>
  );
}

render(<App />, document.getElementById('app'));
