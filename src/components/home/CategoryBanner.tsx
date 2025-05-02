
import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, link }) => {
  return (
    <Link to={link} className="relative overflow-hidden rounded-lg group">
      <div className="aspect-[3/4] md:aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
        <div className="p-4 md:p-6 w-full">
          <h3 className="text-white font-serif text-lg md:text-xl font-medium mb-1">{title}</h3>
          <span className="inline-block text-white/80 text-sm border-b border-white/50 group-hover:border-white transition-colors">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
};

const CategoryBanner: React.FC = () => {
  const categories = [
    {
      title: "Clip-in Extensions",
      image: "https://images.unsplash.com/photo-1595515538772-5d9f4ea38e8d?q=80&w=500&auto=format&fit=crop",
      link: "/shop?category=clip-ins",
    },
    {
      title: "Tape-in Extensions",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=500&auto=format&fit=crop",
      link: "/shop?category=tape-ins",
    },
    {
      title: "Ponytail Extensions",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=500&auto=format&fit=crop",
      link: "/shop?category=ponytails",
    },
    {
      title: "Luxury Wigs",
      image: "https://images.unsplash.com/photo-1629747490241-8bce1298d221?q=80&w=500&auto=format&fit=crop",
      link: "/shop?category=wigs",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect extensions for your hair type and style
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
