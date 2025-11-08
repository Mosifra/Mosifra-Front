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
						<Route path="/internships" component={Internships} />
						<Route path="/student/account" component={StudentAccount} />
						<Route path="/student/applications" component={Applications} />
						<Route path="/company/managecandidates" component={ManageCandidates} />
						<Route path="/company/submitinternship" component={SubmitInternship} />
						<Route path="/university/students" component={ManageStudents} />
						<Route default component={NotFound} />
					</Router>
				</main> 
			</LocationProvider>
		</SessionChecker>
	);
}

render(<App />, document.getElementById('app'));
