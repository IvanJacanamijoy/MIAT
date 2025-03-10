import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header'
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Service } from './pages/Service';
import { Contact } from './pages/Contact';

function App() {
    return (
      <Router>
        <div>
          {/* Header */}
          <Header />
          {/* Navbar */}
          <Navbar />
  
          {/* Rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Service/>}/>
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App
