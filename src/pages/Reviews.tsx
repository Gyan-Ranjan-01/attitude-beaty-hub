import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_type: string;
  created_at: string;
}

export default function Reviews() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState({
    avgRating: 0,
    totalReviews: 0,
    fiveStarCount: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (data) {
      setTestimonials(data);

      const avgRating = data.reduce((acc, t) => acc + t.rating, 0) / data.length;
      const fiveStarCount = data.filter(t => t.rating === 5).length;

      setStats({
        avgRating: Number(avgRating.toFixed(1)),
        totalReviews: data.length,
        fiveStarCount,
      });
    }
  };

  return (
    <div className="bg-white">
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl text-gray-200">
            See what our clients say about us
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < Math.floor(stats.avgRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      size={28}
                    />
                  ))}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {stats.avgRating}
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-rose-600 mb-1">
                  {stats.totalReviews}+
                </div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-rose-600 mb-1">
                  {stats.fiveStarCount}
                </div>
                <div className="text-gray-600">5-Star Reviews</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={18}
                      />
                    ))}
                  </div>
                  <Quote className="text-rose-200" size={24} />
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {testimonial.review_text}
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.customer_name}
                  </div>
                  {testimonial.service_type && (
                    <div className="text-sm text-gray-600 mt-1">
                      {testimonial.service_type}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews available yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Experience the Difference
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of satisfied customers who trust Attitude Beauty Hub
            for their beauty needs
          </p>
          <a
            href="/book"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors font-semibold"
          >
            Book Your Appointment
          </a>
        </div>
      </section>
    </div>
  );
}
