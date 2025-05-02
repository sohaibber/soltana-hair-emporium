
import React from "react";
import { Instagram } from "lucide-react";

const InstagramGallery: React.FC = () => {
  // Mock Instagram posts - would be fetched from Instagram API in a real app
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 245,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 187,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 312,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1629747490241-8bce1298d221?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 198,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1595515538772-5d9f4ea38e8d?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 276,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=300&auto=format&fit=crop",
      link: "https://instagram.com",
      likes: 211,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Follow Us on Instagram</h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            <Instagram size={16} className="mr-1" /> @soltanahair
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block aspect-square overflow-hidden relative group rounded-md"
            >
              <img 
                src={post.image} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white flex items-center">
                  <span className="text-sm font-medium">♥ {post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
