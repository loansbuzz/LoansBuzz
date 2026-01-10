import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Loans } from './pages/Loans';
import { DSA } from './pages/DSA';
import { Insurance } from './pages/Insurance';
import { CreditCards } from './pages/CreditCards';
import { MutualFunds } from './pages/MutualFunds';
import { BecomePartner } from './pages/BecomePartner';
import { CheckCIBIL } from './pages/CheckCIBIL';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Grievance } from './pages/Grievance';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/:type" element={<Loans />} />
            <Route path="/dsa" element={<DSA />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/mutual-funds" element={<MutualFunds />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route path="/check-cibil" element={<CheckCIBIL />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/grievance" element={<Grievance />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;