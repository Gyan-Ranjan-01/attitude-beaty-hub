import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Scissors,
  Heart,
  Flower,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price_start: number;
  is_featured: boolean;
}

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_type: string;
}

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  alt_text: string;
}

const fallbackServices: Service[] = [
  {
    id: 'signature-rose-glow',
    name: 'Rose Quartz Radiance Facial',
    category: 'Skin',
    description:
      'Crystal-infused cleanse, oxygen boost mask, and sculpting massage for a lit-from-within glow.',
    price_start: 2400,
    is_featured: true,
  },
  {
    id: 'silk-press',
    name: 'Silk Press & Gloss Finish',
    category: 'Hair',
    description:
      'Deep steam hydration, smooth press, and reflective glossing ritual with heat protection.',
    price_start: 1800,
    is_featured: true,
  },
  {
    id: 'bridal-sculpt',
    name: 'Bridal Sculpt & Stay',
    category: 'Bridal',
    description:
      'Full bridal makeup with contour mapping, waterproof artistry, and final aura mist.',
    price_start: 8500,
    is_featured: true,
  },
  {
    id: 'zen-spa',
    name: 'Zenstone Body Polish',
    category: 'Spa',
    description:
      'Warm oil exfoliation and silk buffing for a velvet-smooth finish and relaxed body.',
    price_start: 3200,
    is_featured: true,
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: 't1',
    customer_name: 'Riya Chakraborty',
    rating: 5,
    review_text:
      'The bridal trial was cinematic. Every detail felt curated, and my skin looked flawless all day.',
    service_type: 'Bridal Sculpt & Stay',
  },
  {
    id: 't2',
    customer_name: 'Meera Basu',
    rating: 5,
    review_text:
      'I walked out glowing. The facial ritual and lighting were a whole experience, not just a service.',
    service_type: 'Rose Quartz Radiance Facial',
  },
  {
    id: 't3',
    customer_name: 'Ananya Roy',
    rating: 5,
    review_text:
      'The team styled my hair like a magazine shoot and explained every step. Super luxurious.',
    service_type: 'Silk Press & Gloss Finish',
  },
];

const fallbackGalleryImages: GalleryImage[] = [
  {
    id: 'g1',
    category: 'Bridal',
    image_url: 'https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Soft glam bridal finish with jeweled headpiece',
  },
  {
    id: 'g2',
    category: 'Hair',
    image_url: 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Silky smooth blowout with shine reflections',
  },
  {
    id: 'g3',
    category: 'Skin',
    image_url: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Facial treatment glow moment',
  },
  {
    id: 'g4',
    category: 'Nails',
    image_url: 'https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Lux manicure with modern neutral tones',
  },
];

const signatureRituals = [
  {
    title: 'Moonlit Glow Ritual',
    duration: '75 min',
    detail: 'Lavender cleanse, ice globe sculpting, and pearl veil mask finish.',
    icon: Sparkles,
  },
  {
    title: 'Velvet Silk Hair Spa',
    duration: '60 min',
    detail: 'Steam therapy, botanical scalp polish, and shine seal ritual.',
    icon: Scissors,
  },
  {
    title: 'Royal Bridal Preview',
    duration: '90 min',
    detail: 'Face mapping, look boards, and full accessory styling guidance.',
    icon: Heart,
  },
  {
    title: 'Rose Garden Mani-Pedi',
    duration: '70 min',
    detail: 'Soak, scrub, rose balm massage, and gel finish of choice.',
    icon: Flower,
  },
];

const experienceHighlights = [
  {
    title: 'Luxury Private Suites',
    detail: 'Sound-proof, aromatherapy-infused, and curated for calm.',
  },
  {
    title: 'Signature Beverage Bar',
    detail: 'Rose latte, citrus tonic, or herbal infusions while you unwind.',
  },
  {
    title: 'Skin-First Makeup Approach',
    detail: 'We prep for luminous, breathable coverage that lasts.',
  },
  {
    title: 'Aftercare Ritual Kits',
    detail: 'Take-home glow routine curated for your skin profile.',
  },
];

const artistSpotlights = [
  {
    name: 'Aanya Sen',
    role: 'Senior Makeup Artist',
    vibe: 'Soft glam + flawless skin',
  },
  {
    name: 'Ishika Dutta',
    role: 'Hair & Styling Lead',
    vibe: 'Silk press + airy volume',
  },
  {
    name: 'Pooja Mukherjee',
    role: 'Skin Ritualist',
    vibe: 'Glow therapy + sculpting',
  },
];

export default function Home() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(fallbackGalleryImages);

  useEffect(() => {
    fetchServices();
    fetchTestimonials();
    fetchGalleryImages();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_featured', true)
      .limit(4);
    if (data && data.length > 0) setServices(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .limit(3);
    if (data && data.length > 0) setTestimonials(data);
  };

  const fetchGalleryImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
      .limit(4);
    if (data && data.length > 0) setGalleryImages(data);
  };

  return (
    <div className="bg-white">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10, 10, 10, 0.55), rgba(10, 10, 10, 0.65)), url(https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/30 via-transparent to-pink-500/40" />
        <div className="relative text-center text-white px-4 max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm uppercase tracking-[0.2em]">
              Luxury Beauty Studio
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm uppercase tracking-[0.2em]">
              Bowbazar, Kolkata
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            The Most Radiant Beauty Experience in Bowbazar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Candlelit rituals, signature artistry, and glow-first techniques for every celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-rose-600 text-white px-8 py-4 rounded-full hover:bg-rose-700 transition-all transform hover:scale-105 font-semibold text-lg inline-flex items-center justify-center"
            >
              Book Appointment
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <a
              href="https://wa.me/919876543210"
              className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 font-semibold text-lg inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2" size={20} />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Star className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.98</div>
              <div className="text-sm text-gray-600">Star Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Users className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12,400+</div>
              <div className="text-sm text-gray-600">Glowing Clients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Award className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
              <div className="text-sm text-gray-600">Signature Rituals</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Clock className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">14 hrs</div>
              <div className="text-sm text-gray-600">Daily Glow Window</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert beauty treatments tailored to enhance your natural beauty
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <Award size={48} className="text-rose-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {service.description.slice(0, 60)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-600 font-semibold">
                      ₹{service.price_start.toLocaleString()}+
                    </span>
                    <Link
                      to="/book"
                      className="text-rose-600 font-medium hover:text-rose-700 text-sm"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700"
            >
              View All Services
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Signature Rituals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed like a couture experience, each ritual blends artistry, aroma, and glow-tech.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureRituals.map((ritual) => {
              const Icon = ritual.icon;
              return (
                <div key={ritual.title} className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-rose-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{ritual.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{ritual.detail}</p>
                  <span className="text-sm font-semibold text-rose-600">{ritual.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Attitude Experience
              </h2>
              <p className="text-gray-600 mb-6">
                Every appointment includes a custom consultation, skin-fit product mapping, and a calm ritual
                that feels like a mini-retreat. Our team curates everything from playlists to lighting for the
                most extraordinary feel-good visit.
              </p>
              <div className="space-y-4">
                {experienceHighlights.map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="text-rose-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-100 via-white to-pink-100 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Glow Journey Timeline</h3>
              <div className="space-y-5">
                {[
                  ['01', 'Welcome Ritual', 'Aroma towel, tone mapping, and beverage bar.'],
                  ['02', 'Personalization', 'Skin + style quiz to match your mood.'],
                  ['03', 'Artistry', 'Precision techniques with premium formulas.'],
                  ['04', 'Afterglow', 'Take-home notes and product ritual tips.'],
                ].map(([step, title, detail]) => (
                  <div key={step} className="flex gap-4 items-start">
                    <div className="text-rose-600 font-bold text-lg">{step}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{title}</h4>
                      <p className="text-sm text-gray-600">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Before & After Transformations
            </h2>
            <p className="text-gray-600">See the stunning results our clients achieve</p>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="w-80 h-96 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700"
            >
              View Full Gallery
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Artists
            </h2>
            <p className="text-gray-600">Your glam squad, curated for every milestone moment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artistSpotlights.map((artist) => (
              <div key={artist.name} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl mb-4">
                  {artist.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{artist.name}</h3>
                <p className="text-sm text-rose-600 font-medium mb-3">{artist.role}</p>
                <p className="text-sm text-gray-600">Signature vibe: {artist.vibe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600">Trusted by thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.review_text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.customer_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.service_type}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700"
            >
              Read All Reviews
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Book your appointment today and experience the most cinematic beauty services in Bowbazar.
          </p>
          <Link
            to="/book"
            className="inline-block bg-white text-rose-600 px-10 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
