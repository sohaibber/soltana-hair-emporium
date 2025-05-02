
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Temporary mock data - this would come from your backend/database
const featuredProducts = [
  {
    id: 1,
    name: "Premium Clip-in Hair Extensions",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Seamless Tape-in Extensions",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=500&auto=format&fit=crop",
    category: "Tape-ins",
    colors: ["Light Brown", "Dark Brown", "Black"],
    rating: 4.9,
  },
  {
    id: 3,
    name: "Luxury Ponytail Extension",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595515538772-5d9f4ea38e8d?q=80&w=500&auto=format&fit=crop",
    category: "Ponytails",
    colors: ["Blonde", "Brown", "Black", "Auburn"],
    rating: 4.7,
    badge: "New",
  },
  {
    id: 4,
    name: "Full Volume Halo Extensions",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1626954079673-dc3d04c7f938?q=80&w=500&auto=format&fit=crop",
    category: "Halo",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.9,
  },
];

interface ProductCardProps {
  product: typeof featuredProducts[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover-lift">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="flex justify-between items-center">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
            <div className="text-xs text-amber-500">★ {product.rating}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-soltana-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Featured Products</h2>
          <Link 
            to="/shop" 
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
