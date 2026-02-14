import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TrackingInput from './pages/TrackingInput';
import BookParcel from './pages/BookParcel';
// import Track from './pages/Track';
// import Identify from './pages/Identify';
// import About from './pages/About';
// import Contact from './pages/Contact';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/track" element={<TrackingInput />} />
                        <Route path="/identify" element={<BookParcel />} />
                       
                        
                        
                        
                        {/* <Route path="/about" element={<About />} /> */}
                        {/* <Route path="/contact" element={<Contact />} /> */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;