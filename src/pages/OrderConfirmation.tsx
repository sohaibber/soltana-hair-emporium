
import React from "react";
import { Link } from "react-router-dom";
import { Check, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const OrderConfirmation: React.FC = () => {
  // In a real app, this would be fetched from your API
  const orderNumber = `SH${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const orderDate = new Date().toLocaleDateString();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              Order Successfully Placed!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Date:</span>
                  <span>{orderDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to your email address. 
              We'll notify you when your order ships.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/shop">
                  <ShoppingBag size={16} className="mr-2" /> Continue Shopping
                </Link>
              </Button>
              <Button asChild>
                <Link to="/account">
                  <User size={16} className="mr-2" /> View Your Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
