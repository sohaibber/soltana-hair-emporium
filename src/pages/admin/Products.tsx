
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import AdminLayout from "@/components/admin/AdminLayout";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { ProductType } from "@/components/shop/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ProductForm from "@/components/admin/ProductForm";

interface ProductWithStock extends ProductType {
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductWithStock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load products from database
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        return;
      }
      
      // Transform the data to match our frontend model
      const transformedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
        category: product.category || "Uncategorized",
        colors: product.tags as string[] || [],
        rating: 4.5, // Default rating since we don't have this in DB yet
        stock: product.stock || 0,
        badge: product.is_active ? undefined : "Inactive"
      }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Exception loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle checkbox selection
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => String(product.id)));
    }
  };
  
  const toggleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  // Handle adding/editing product
  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsFormDialogOpen(true);
  };
  
  const handleEditProduct = (id: string) => {
    setProductToEdit(id);
    setIsFormDialogOpen(true);
  };
  
  // Handle product save
  const handleProductSaved = () => {
    setIsFormDialogOpen(false);
    fetchProducts();
  };
  
  // Handle deleting product
  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const deleteProduct = async () => {
    if (productToDelete === null) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete);
      
      if (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
        return;
      }
      
      // Update local state
      setProducts(products.filter((product) => product.id !== productToDelete));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Exception deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Helper function to get image source
  const getImageSrc = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${imagePath}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          
          <Button onClick={handleAddProduct}>
            <Plus className="mr-1" size={16} /> Add Product
          </Button>
        </div>
        
        {/* Search and filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" disabled={selectedProducts.length === 0}>
            Bulk Edit
          </Button>
          
          <Button 
            variant="destructive" 
            disabled={selectedProducts.length === 0}
          >
            Delete Selected
          </Button>
        </div>
        
        {/* Products table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0} 
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                    <p className="mt-2 text-gray-500">Loading products...</p>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)} 
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img 
                          src={getImageSrc(product.image)} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                      {product.badge && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                          {product.badge}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => confirmDelete(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Product Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{productToEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {productToEdit ? 'Update the product details below.' : 'Enter the details of the new product below.'}
            </DialogDescription>
          </DialogHeader>
          
          <ProductForm 
            productId={productToEdit || undefined}
            onCancel={() => setIsFormDialogOpen(false)}
            onSave={handleProductSaved}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Products;
