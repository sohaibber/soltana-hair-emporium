
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface TestimonialProps {
  quote: string;
  author: string;
  image: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "These hair extensions completely transformed my look! They blend so naturally with my hair, and the quality is exceptional. I've never received so many compliments.",
    author: "Sophia Martinez",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "I've tried many hair extension brands, but SoltanaHair is by far the best. The clip-ins are so easy to apply and feel incredibly secure. They've become an essential part of my beauty routine.",
    author: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "The customer service at SoltanaHair is outstanding. They helped me find the perfect color match, and the extensions arrived beautifully packaged. The quality is worth every penny!",
    author: "Jessica Williams",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop",
    rating: 4,
  },
  {
    quote: "As a professional stylist, I recommend SoltanaHair to all my clients. The hair is ethically sourced, high-quality, and lasts much longer than other brands I've worked with.",
    author: "Olivia Taylor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, image, rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
        </div>
        <div>
          <div className="font-medium">{author}</div>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "currentColor" : "none"} 
                stroke={i < rating ? "none" : "currentColor"}
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <blockquote className="italic text-gray-700">{quote}</blockquote>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-soltana-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read genuine reviews from our happy customers
          </p>
        </div>

        <div className="relative">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
