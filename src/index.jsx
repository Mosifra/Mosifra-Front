import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { LoginPage } from './pages/login.jsx';
import { Twofa } from './pages/twofa.jsx';
import { GG } from './pages/gg.jsx';
import SubmitInternship from './pages/Company/InternshipSubmitForm.jsx';
import ManageCandidates from './pages/Company/ManageCandidates.jsx';
import CompanyHome from './pages/Company/CompanyHome.jsx';
import Internships from './pages/internships.jsx';
import StudentAccount from './pages/Student/account.jsx';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/login" component={LoginPage}/>
					<Route path="/twofa" component={Twofa}/>
					<Route path="/gg" component={GG}/>
					<Route path="/internships" component={ Internships }/>
					<Route path="/student/account" component={ StudentAccount }/>
					<Route path="/company/managecandidates" component={ ManageCandidates }/>
					<Route path="/company/submitinternship" component={ SubmitInternship }/>
					<Route path="/company/home" component={ CompanyHome }/>
					<Route default component={NotFound} />
				</Router>
			</main> 
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
