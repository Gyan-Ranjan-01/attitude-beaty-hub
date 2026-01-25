import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

function StickyBookingCTA() {
  const location = useLocation();

  if (location.pathname === '/book') {
    return null;
  }

  return (
    <Link
      to="/book"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-8 py-4 rounded-full shadow-2xl hover:bg-rose-700 transition-all hover:scale-105 z-40 md:hidden flex items-center gap-2 font-semibold"
    >
      <Calendar size={20} />
      Book Appointment
    </Link>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <StickyBookingCTA />
      </Layout>
    </Router>
  );
}

export default App;
