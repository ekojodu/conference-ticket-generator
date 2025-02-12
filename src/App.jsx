import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketSelection from './components/TicketSelection';
import NextPage from './components/NextPage';
import Ticket from './components/TicketConfirmation'; // Create this component

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<TicketSelection />} />
				<Route path='/second-page' element={<NextPage />} />
				<Route path='/last-page' element={<Ticket />} />
			</Routes>
		</Router>
	);
};

export default App;
