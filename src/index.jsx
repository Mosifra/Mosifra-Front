import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { LogoSelector } from './pages/Logo_selector.jsx';
import { LoginPage } from './pages/login.jsx';
import { Footer } from './components/footer.jsx';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
          <Route path="/login" component={LoginPage}/>
					<Route default component={NotFound} />
				</Router>
			</main> 
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
