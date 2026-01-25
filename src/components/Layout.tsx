import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">{children}</main>

      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">
                Attitude Beauty Hub
              </h3>
              <p className="text-sm mb-4">
                Premier beauty salon in Bowbazar, Kolkata. Expert makeup, hair care, and spa services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-rose-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-rose-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/919876543210" className="hover:text-rose-400 transition-colors">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-rose-400 transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-rose-400 transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-rose-400 transition-colors">Gallery</Link></li>
                <li><Link to="/reviews" className="hover:text-rose-400 transition-colors">Reviews</Link></li>
                <li><Link to="/book" className="hover:text-rose-400 transition-colors">Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span>Bowbazar, Kolkata, West Bengal, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={18} />
                  <a href="tel:+919876543210" className="hover:text-rose-400">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} />
                  <a href="mailto:info@attitudebeautyhub.com" className="hover:text-rose-400">info@attitudebeautyhub.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>Mon - Sat</span>
                </li>
                <li className="ml-6">10:00 AM - 8:00 PM</li>
                <li className="ml-6 text-rose-400">Sunday Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Attitude Beauty Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919876543210"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-40 md:hidden"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
