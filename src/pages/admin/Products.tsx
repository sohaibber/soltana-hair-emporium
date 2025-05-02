
import React, { useState } from "react";
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

// Mock data for products
const mockProducts: (ProductType & { stock: number })[] = [
  {
    id: 1,
    name: "Premium Clip-in Hair Extensions",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.8,
    stock: 15,
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
    stock: 8,
  },
  {
    id: 3,
    name: "Luxury Ponytail Extension",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595515538772-5d9f4ea38e8d?q=80&w=500&auto=format&fit=crop",
    category: "Ponytails",
    colors: ["Blonde", "Brown", "Black", "Auburn"],
    rating: 4.7,
    stock: 22,
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
    stock: 5,
  },
  {
    id: 5,
    name: "Brazilian Wavy Clip-ins",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Dark Brown", "Black"],
    rating: 4.6,
    stock: 10,
  },
  {
    id: 6,
    name: "Keratin Bond Extensions",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=500&auto=format&fit=crop",
    category: "Keratin",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.8,
    stock: 12,
  },
  {
    id: 7,
    name: "Balayage Ombre Clip-ins",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Balayage"],
    rating: 4.7,
    stock: 7,
    badge: "Popular",
  },
  {
    id: 8,
    name: "Human Hair Full Lace Wig",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1629747490241-8bce1298d221?q=80&w=500&auto=format&fit=crop",
    category: "Wigs",
    colors: ["Black", "Dark Brown"],
    rating: 4.9,
    stock: 3,
  },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  
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
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };
  
  const toggleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  // Handle adding new product
  const addProduct = () => {
    setIsAddDialogOpen(false);
    // In a real app, we would add the product to the database
    // For now, let's just show a success message
    alert("Product added successfully!");
  };
  
  // Handle deleting product
  const confirmDelete = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const deleteProduct = () => {
    if (productToDelete === null) return;
    
    setProducts(products.filter((product) => product.id !== productToDelete));
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
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
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Category" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description"
                    className="min-h-24 rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                <div className="grid gap-2">
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Black", "Brown", "Blonde", "Auburn", "Red"].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="https://..." />
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
              {filteredProducts.length === 0 ? (
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
