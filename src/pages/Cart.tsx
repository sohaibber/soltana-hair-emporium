
import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import ProductRecommendations from "@/components/shop/ProductRecommendations";

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(id, newQuantity);
    }
  };

  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const finalTotal = totalPrice + shippingPrice;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="font-serif text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <h2 className="font-medium">
                        Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
                      </h2>
                    </div>
                  </div>
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.color}-${item.length}`} className="p-4 flex">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <div className="text-sm text-gray-600 mt-1">
                                {item.color} {item.length && `/ ${item.length}`}
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="px-2 py-1"
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                              <button
                                className="px-2 py-1"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                disabled={item.quantity >= 10}
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-soltana-light">
                    <Link
                      to="/shop"
                      className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      <ArrowRight size={14} className="mr-1 rotate-180" /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-medium">Order Summary</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shippingPrice === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shippingPrice.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {/* Discount would go here if applicable */}
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {shippingPrice === 0 ? (
                        <span>✓ Free shipping applied</span>
                      ) : (
                        <span>Free shipping on orders over $100</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <Button asChild className="w-full bg-soltana-dark text-white hover:bg-black">
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Frequently Bought Together */}
            {items.length > 0 && (
              <div className="mt-12">
                <ProductRecommendations 
                  currentProductId={items[0].id.toString()} 
                  title="Frequently Bought Together"
                />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
