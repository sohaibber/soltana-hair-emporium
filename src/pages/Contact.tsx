
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Have questions about our products? Need advice on choosing the right extensions? 
              Our team is here to help! Fill out the form, and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600 text-sm">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">info@soltanahair.com</p>
                  <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Address</h3>
                  <p className="text-gray-600">123 Beauty Lane</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Business Hours</h3>
                  <p className="text-gray-600">Monday-Friday: 9am-5pm EST</p>
                  <p className="text-gray-600">Saturday: 10am-2pm EST</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-soltana-dark hover:bg-black" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">How long do hair extensions last?</h3>
                <p className="text-gray-600">
                  With proper care, our premium Remy hair extensions can last 6-12 months with regular wear.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Can I color the extensions?</h3>
                <p className="text-gray-600">
                  Yes, our human hair extensions can be dyed. We recommend professional coloring for best results.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">What is your return policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day satisfaction guarantee. Unopened products can be returned for a full refund.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">How do I care for my extensions?</h3>
                <p className="text-gray-600">
                  Use sulfate-free shampoo and conditioner, avoid excessive heat, and store properly when not in use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
