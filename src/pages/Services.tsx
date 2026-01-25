import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Heart, Hand, Flower } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price_start: number;
  is_featured: boolean;
}

const categoryIcons: { [key: string]: any } = {
  Hair: Scissors,
  Skin: Sparkles,
  Bridal: Heart,
  Nails: Hand,
  Spa: Flower,
  Makeup: Sparkles,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('category');
    if (data) setServices(data);
  };

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as { [key: string]: Service[] });

  return (
    <div className="bg-white">
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-200">
            Premium beauty treatments for every occasion
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const Icon = categoryIcons[category] || Sparkles;
            return (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-100 p-3 rounded-full">
                    <Icon className="text-rose-600" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-all overflow-hidden ${
                        service.is_featured ? 'border-rose-300' : 'border-gray-200'
                      }`}
                    >
                      {service.is_featured && (
                        <div className="bg-rose-600 text-white text-center py-1 text-xs font-semibold">
                          MOST POPULAR
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-500 text-sm">Starting from</span>
                            <div className="text-2xl font-bold text-rose-600">
                              ₹{service.price_start.toLocaleString()}
                            </div>
                          </div>
                          <Link
                            to="/book"
                            className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-colors font-medium text-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Special Bridal Packages
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Looking for a complete bridal transformation? We offer customized packages
            including pre-bridal treatments, bridal makeup, hairstyling, and more.
            Contact us for personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors font-semibold"
            >
              Book Consultation
            </Link>
            <a
              href="https://wa.me/919876543210"
              className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
