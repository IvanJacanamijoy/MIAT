import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header'
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Service } from './pages/Service';
import { Estimates } from './pages/Estimates'
import { WhoWeAre } from './pages/who-we-are'
import { ServiceHistory } from './pages/service-history';
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
          <Route path="/servicios" element={<Service />} />
          <Route path="/cotizaciones" element={<Estimates />} />
          <Route path="/historial-servicios" element={<ServiceHistory />} />
          <Route path="/quienes-somos" element={<WhoWeAre />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
