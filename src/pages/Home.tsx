import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Award, Clock, ArrowRight, MessageCircle } from 'lucide-react';
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

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

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
    if (data) setServices(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .limit(3);
    if (data) setTestimonials(data);
  };

  const fetchGalleryImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
      .limit(4);
    if (data) setGalleryImages(data);
  };

  return (
    <div className="bg-white">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Premium Beauty Salon in Bowbazar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Experience luxury beauty treatments with expert care, premium products, and exceptional hygiene
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
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="text-sm text-gray-600">Star Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Users className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5000+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Award className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-3">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Clock className="text-rose-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">Hygiene Standards</div>
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
            Book your appointment today and experience the best beauty services in Bowbazar
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
