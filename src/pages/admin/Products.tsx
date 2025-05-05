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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AdminLayout from "@/components/admin/AdminLayout";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { ProductType } from "@/components/shop/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProductWithStock extends ProductType {
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductWithStock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    imageUrl: "",
    colors: [] as string[],
  });

  // Load products from database
  useEffect(() => {
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
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle checkbox changes for colors
  const handleColorChange = (color: string) => {
    setFormData(prev => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      
      return {
        ...prev,
        colors: newColors
      };
    });
  };
  
  // Handle adding new product
  const addProduct = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.price || !formData.category) {
        toast.error("Please fill all required fields");
        return;
      }
      
      // Prepare the data for Supabase
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        stock: parseInt(formData.stock) || 0,
        image_urls: formData.imageUrl ? [formData.imageUrl] : [],
        tags: formData.colors,
        is_active: true
      };
      
      // Insert into database
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select();
      
      if (error) {
        console.error("Error adding product:", error);
        toast.error("Failed to add product");
        return;
      }
      
      // Transform the returned data to match our frontend model
      const newProduct = {
        id: String(data[0].id),
        name: data[0].name,
        price: Number(data[0].price),
        image: data[0].image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
        category: data[0].category,
        colors: data[0].tags,
        rating: 4.5,
        stock: data[0].stock
      };
      
      // Update the local state
      setProducts([...products, newProduct]);
      
      // Reset form and close dialog
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        imageUrl: "",
        colors: []
      });
      
      setIsAddDialogOpen(false);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Exception adding product:", error);
      toast.error("Failed to add product");
    }
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1" size={16} /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details of the new product below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name*</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter product name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price*</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category*</Label>
                    <Input 
                      id="category" 
                      placeholder="Category" 
                      value={formData.category} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description"
                    className="min-h-24 rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="grid gap-2">
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Black", "Brown", "Blonde", "Auburn", "Red"].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`color-${color}`} 
                          checked={formData.colors.includes(color)}
                          onCheckedChange={() => handleColorChange(color)}
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input 
                      id="stock" 
                      type="number" 
                      placeholder="0" 
                      value={formData.stock} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input 
                      id="imageUrl" 
                      placeholder="https://..." 
                      value={formData.imageUrl} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                          src={product.image} 
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
                        <Button variant="ghost" size="sm">
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
