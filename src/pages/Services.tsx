import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Heart, Hand, Flower, Star } from 'lucide-react';
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

const fallbackServices: Service[] = [
  {
    id: 'hair-1',
    name: 'Silk Press & Gloss Finish',
    category: 'Hair',
    description: 'Steam hydration, precision press, and mirror-gloss finishing ritual.',
    price_start: 1800,
    is_featured: true,
  },
  {
    id: 'hair-2',
    name: 'Crown Volume Blowout',
    category: 'Hair',
    description: 'Weightless volume, soft curls, and humidity shield for lasting bounce.',
    price_start: 1600,
    is_featured: false,
  },
  {
    id: 'skin-1',
    name: 'Rose Quartz Radiance Facial',
    category: 'Skin',
    description: 'Crystal-infused cleanse, oxygen boost mask, and sculpting massage.',
    price_start: 2400,
    is_featured: true,
  },
  {
    id: 'skin-2',
    name: 'Glass Skin Hydro Infusion',
    category: 'Skin',
    description: 'Deep hydration layering with gel masks and cooling globe sculpt.',
    price_start: 2800,
    is_featured: false,
  },
  {
    id: 'bridal-1',
    name: 'Bridal Sculpt & Stay',
    category: 'Bridal',
    description: 'Full bridal glam with waterproof artistry and veil-ready finish.',
    price_start: 8500,
    is_featured: true,
  },
  {
    id: 'bridal-2',
    name: 'Pre-Bridal Glow Prep',
    category: 'Bridal',
    description: 'Four-session glow plan with skin polish, hair spa, and trial look.',
    price_start: 12000,
    is_featured: false,
  },
  {
    id: 'nails-1',
    name: 'Velvet Gel Manicure',
    category: 'Nails',
    description: 'Cuticle perfection, gel application, and glossy top coat.',
    price_start: 900,
    is_featured: false,
  },
  {
    id: 'nails-2',
    name: 'Rose Garden Mani-Pedi',
    category: 'Nails',
    description: 'Soak, scrub, rose balm massage, and color finish.',
    price_start: 1700,
    is_featured: true,
  },
  {
    id: 'spa-1',
    name: 'Zenstone Body Polish',
    category: 'Spa',
    description: 'Warm oil exfoliation and silk buffing for velvet skin.',
    price_start: 3200,
    is_featured: false,
  },
  {
    id: 'spa-2',
    name: 'Aroma Reset Massage',
    category: 'Spa',
    description: 'Signature aromatherapy massage for deep relaxation.',
    price_start: 2800,
    is_featured: false,
  },
  {
    id: 'makeup-1',
    name: 'Soft Glam Event Makeup',
    category: 'Makeup',
    description: 'Luminous base, feathered lashes, and customized lip tone.',
    price_start: 3500,
    is_featured: true,
  },
  {
    id: 'makeup-2',
    name: 'Editorial Glam Suite',
    category: 'Makeup',
    description: 'Statement eyes, contour mapping, and custom gloss layering.',
    price_start: 4200,
    is_featured: false,
  },
];

const packages = [
  {
    name: 'Glow Starter',
    price: '₹4,900',
    detail: 'Hydro facial + velvet mani + signature blowout',
  },
  {
    name: 'Weekend Deluxe',
    price: '₹7,800',
    detail: 'Glass skin facial + crown volume + gel mani-pedi',
  },
  {
    name: 'Bridal Halo',
    price: '₹24,000',
    detail: 'Pre-bridal plan + bridal glam + touch-up kit',
  },
];

const addOns = [
  'Collagen eye lift (15 min) — ₹600',
  'Scalp detox ritual — ₹750',
  'Brow sculpt & tint — ₹550',
  'Hydra lip mask — ₹400',
  'Luxury lash set — ₹950',
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('category');
    if (data && data.length > 0) setServices(data);
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

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Signature Packages</h2>
            <p className="text-gray-600">Curated bundles for glow-ups, events, and bridal milestones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pack) => (
              <div key={pack.name} className="border border-rose-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Star className="text-rose-600" size={18} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{pack.name}</h3>
                </div>
                <p className="text-gray-600 mb-6">{pack.detail}</p>
                <div className="text-2xl font-bold text-rose-600 mb-6">{pack.price}</div>
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-colors text-sm font-semibold"
                >
                  Reserve Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Luxury Add-Ons</h3>
              <p className="text-gray-600 mb-6">
                Elevate any service with these instant-upgrade rituals.
              </p>
              <ul className="space-y-3 text-gray-700">
                {addOns.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-rose-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Service Promise</h3>
              <p className="mb-6 text-rose-100">
                We create a premium experience by using clean tools, curated products, and personalized
                consultations every single visit.
              </p>
              <div className="space-y-4">
                {[
                  'Custom consultation + mood board',
                  'Premium sanitization for every station',
                  'Touch-up kit for bridal + event clients',
                  'Aftercare notes for long-lasting results',
                ].map((promise) => (
                  <div key={promise} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
