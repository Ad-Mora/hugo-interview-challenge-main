import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Application from '../Application/Application';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/applications/:id" element={<Application />} />
            </Routes>
        </Router>
    );
}

export default App;
