import { Routes, Route } from 'react-router';
import Navbar from './app/components/Navbar.jsx';
import Home from './app/features/Home/Home.jsx';
import Calculator from './app/features/Calculator/Calculator.jsx';
import Dashboard from './app/features/Dashboard/Dashboard.jsx';
import About from './app/features/About/About.jsx';
import Contact from './app/features/Contact/Contact.jsx';

function App() {
  return (
    <div className="min-h-screen text-emerald-950 relative z-0">
      {/* Global Background Image with Light Overlay */}
      <div className="fixed inset-0 z-[-1]">
        <img src="/forest-bg.png" alt="Nature Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-50/70 backdrop-blur-[3px]"></div>
      </div>
      
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
