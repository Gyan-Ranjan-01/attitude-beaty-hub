import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Sparkles, Car, Train, Coffee } from 'lucide-react';

const travelTips = [
  {
    title: 'Metro & Bus',
    detail: 'Closest stops: Central Metro Gate 3 + Bowbazar Bus Stand.',
    icon: Train,
  },
  {
    title: 'Parking',
    detail: 'Valet-style drop zone with secure parking (limited slots).',
    icon: Car,
  },
  {
    title: 'Refreshments',
    detail: 'Herbal teas, rose latte, and citrus water on arrival.',
    icon: Coffee,
  },
];

const studioHighlights = [
  'Private bridal suite with vanity lighting',
  'Photo-ready mirrors and content corners',
  'Aroma diffusers + calming playlists',
  'Hygiene-certified tools for every station',
];

export default function Contact() {
  return (
    <div className="bg-white">
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            Visit us or get in touch today
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full flex-shrink-0">
                    <MapPin className="text-rose-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      18A Bowbazar Street<br />
                      Kolkata, West Bengal<br />
                      India - 700012
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full flex-shrink-0">
                    <Phone className="text-rose-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href="tel:+919876543210"
                      className="text-gray-600 hover:text-rose-600"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full flex-shrink-0">
                    <Mail className="text-rose-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:hello@attitudebeautyhub.com"
                      className="text-gray-600 hover:text-rose-600"
                    >
                      hello@attitudebeautyhub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full flex-shrink-0">
                    <Clock className="text-rose-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Saturday: 9:30 AM - 9:00 PM</p>
                      <p className="text-rose-600 font-medium">Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/book"
                    className="flex items-center gap-3 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    <Calendar size={20} />
                    Book Appointment
                  </Link>
                  <a
                    href="https://wa.me/919876543210"
                    className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={20} />
                    WhatsApp Now
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-rose-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Studio Highlights</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {studioHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-rose-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Us</h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-[420px] mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0977891820805!2d88.36313931495726!3d22.572645785180894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a6b6f0e899%3A0x5c6f7f7f7f7f7f7f!2sBowbazar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Attitude Beauty Hub Location"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {travelTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <div key={tip.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                        <Icon className="text-rose-600" size={18} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our friendly team is here to help. Contact us via phone, email, or WhatsApp,
            and we'll get back to you as soon as possible.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-1">Chat with Us</h3>
              <p className="text-sm text-gray-600">Quick response on WhatsApp</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
              <p className="text-sm text-gray-600">Speak with our team directly</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
              <p className="text-sm text-gray-600">Walk-ins welcome during hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
