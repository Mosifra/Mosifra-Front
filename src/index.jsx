import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { HomeRouter } from './pages/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { LoginPage } from './pages/login.jsx';
import { Twofa } from './pages/twofa.jsx';
import { GG } from './pages/gg.jsx';
import SubmitInternship from './pages/Company/InternshipSubmitForm.jsx';
import ManageCandidates from './pages/Company/ManageCandidates.jsx';
import Internships from './pages/internships.jsx';
import StudentAccount from './pages/Student/account.jsx';
import Applications from './pages/Student/Applications.jsx';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={HomeRouter} />
					<Route path="/login" component={LoginPage}/>
					<Route path="/twofa" component={Twofa}/>
					<Route path="/gg" component={GG}/>
					<Route path="/internships" component={ Internships }/>
					<Route path="/student/account" component={ StudentAccount }/>
					<Route path="/student/applications" component={ Applications }/>
					<Route path="/company/managecandidates" component={ ManageCandidates }/>
					<Route path="/company/submitinternship" component={ SubmitInternship }/>
					<Route default component={NotFound} />
				</Router>
			</main> 
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
