import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import ApplicationPage from '../ApplicationPage/ApplicationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/applications/:id" element={<ApplicationPage />} />
                </Routes>
            </Router>
            <ToastContainer hideProgressBar={true} />
        </>
    );
}

export default App;
