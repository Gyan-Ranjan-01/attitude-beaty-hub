import { useEffect, useState } from 'react';
import { X, Sparkles, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

const fallbackImages: GalleryImage[] = [
  {
    id: 'fg-1',
    category: 'Bridal',
    image_url: 'https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Bridal glam close-up with jeweled accents',
    display_order: 1,
  },
  {
    id: 'fg-2',
    category: 'Hair',
    image_url: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Smooth blowout with soft curls',
    display_order: 2,
  },
  {
    id: 'fg-3',
    category: 'Skin',
    image_url: 'https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Radiant facial treatment moment',
    display_order: 3,
  },
  {
    id: 'fg-4',
    category: 'Makeup',
    image_url: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Luminous soft glam makeup',
    display_order: 4,
  },
  {
    id: 'fg-5',
    category: 'Nails',
    image_url: 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Minimal manicure with glossy finish',
    display_order: 5,
  },
  {
    id: 'fg-6',
    category: 'Spa',
    image_url: 'https://images.pexels.com/photos/6621461/pexels-photo-6621461.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Relaxing spa ambience and aromatherapy',
    display_order: 6,
  },
];

const moodboard = [
  {
    title: 'Soft Glam Stories',
    detail: 'Neutral palettes, pearl glow, and airy lash mapping.',
  },
  {
    title: 'Modern Bridal Luxe',
    detail: 'Veil-ready finish with crystal highlight zones.',
  },
  {
    title: 'Hair Gloss Era',
    detail: 'Mirror shine and volume-focused styling.',
  },
  {
    title: 'Skin First Rituals',
    detail: 'Hydration layering with sculpting massage.',
  },
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order');
    if (data && data.length > 0) setImages(data);
  };

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="bg-white">
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-200">
            Witness the transformations we create
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {moodboard.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <Sparkles className="text-rose-600" size={18} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-semibold">{image.category}</p>
                    <p className="text-sm text-gray-200">{image.alt_text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Camera size={18} />
            Studio Moments & Editorial Frames
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Every look is a story
          </h2>
          <p className="text-gray-600 mb-8">
            Our gallery celebrates custom artistry, from pre-bridal glow journeys to polished everyday glam. Snap your look, tag us, and join our spotlight wall.
          </p>
          <a
            href="https://instagram.com"
            className="inline-flex items-center justify-center bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors font-semibold"
          >
            Follow the Lookbook
          </a>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage.image_url}
            alt={selectedImage.alt_text}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
