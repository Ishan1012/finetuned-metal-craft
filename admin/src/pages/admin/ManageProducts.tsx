import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { productAPI, Product } from "../../lib/api-services";
import { toast } from "sonner";

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EMPTY_PRODUCT: Omit<Product, "_id"> = {
  name: "",
  description: "",
  price: 0,
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  category: "Name Plates",
  material: "Stainless Steel",
  status: "In Stock",
  isDigital: false,
  url: "",
};

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [digitalProducts, setDigitalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formProduct, setFormProduct] = useState<Product | Omit<Product, "_id"> | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchDigitalProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productAPI.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchDigitalProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productAPI.getDigitalProducts();
      setDigitalProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500 text-lg">Loading products...</span>
      </div>
    );
  }

  const openDigitalFileWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'auto', // Important: Allows raw files like zip, pdf, docx
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("File upload successful! URL: ", result.info.secure_url);
          if (formProduct) {
            setFormProduct({ ...formProduct, url: result.info.secure_url });
          }
        }
      }
    );

    widget.open();
  };

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'], // What options the user sees
        multiple: false, // Only one image per product for now
        maxFiles: 1,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Upload successful! URL: ", result.info.secure_url);
          // Update the form state with the secure Cloudinary URL
          if (formProduct) {
            setFormProduct({ ...formProduct, image: result.info.secure_url });
          }
        }
      }
    );

    widget.open();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct) return;
    if (saving) return;

    try {
      setSaving(true);

      if ("_id" in formProduct) {
        // Update existing product
        const updatedProduct = await productAPI.updateProduct(
          formProduct._id,
          formProduct as Product
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === formProduct._id ? updatedProduct : p))
        );
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const newProduct = await productAPI.createProduct(
          formProduct as Omit<Product, "_id">
        );
        setProducts((prev) => [newProduct, ...prev]);
        toast.success('Product created successfully');
      }

      setFormProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" onClick={() => setFormProduct(EMPTY_PRODUCT)}>
          Add New Product
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none p-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button className="bg-[#ffffff] hover:bg-[#E4A143] hover:text-white rounded-xl mr-3" variant="outline" size="sm" onClick={() => setFormProduct({ ...product })}>
                    Edit
                  </Button>
                  <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" variant="destructive" size="sm" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Digital Products */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Digital Products</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none p-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {digitalProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button className="bg-[#ffffff] hover:bg-[#E4A143] hover:text-white rounded-xl mr-3" variant="outline" size="sm" onClick={() => setFormProduct({ ...product })}>
                    Edit
                  </Button>
                  <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" variant="destructive" size="sm" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {formProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {"_id" in formProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formProduct.name}
                  onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  placeholder="e.g. Modern Brass Nameplate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formProduct.description}
                  onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formProduct.price}
                    onChange={(e) => setFormProduct({ ...formProduct, price: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formProduct.category}
                    onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="Name Plates">Name Plates</option>
                    <option value="Signage">Signage</option>
                    <option value="Room Dividers">Room Dividers</option>
                    <option value="Wall Art">Wall Art</option>
                    <option value="Grills">Grills</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={formProduct.material}
                    onChange={(e) => setFormProduct({ ...formProduct, material: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                  <select
                    value={formProduct.status}
                    onChange={(e) => setFormProduct({ ...formProduct, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                  <label className="flex items-center space-x-2 mt-3">
                    <input
                      type="checkbox"
                      checked={formProduct.isDigital || false}
                      onChange={(e) => setFormProduct({ ...formProduct, isDigital: e.target.checked })}
                      className="rounded border-gray-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-sm text-gray-700">This is a Digital Product</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product File/URL (If Digital)</label>
                  <div className="flex gap-2">
                    {formProduct.url !== "" ? (
                      <p>File uploaded</p>
                    ) : (
                      <Button
                        type="button"
                        className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl cursor-pointer"
                        onClick={openDigitalFileWidget}
                        disabled={!formProduct.isDigital}
                      >
                        Upload File
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  {/* Shows a preview of the existing or newly uploaded image */}
                  {formProduct.image && (
                    <img src={formProduct.image} alt="Preview" className="w-16 h-16 object-cover rounded border border-gray-200 shadow-sm" />
                  )}

                  <Button
                    type="button"
                    className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl"
                    variant="outline"
                    onClick={openCloudinaryWidget}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" className="border border-[#E4A143] hover:bg-[#D29D5B] hover:text-white rounded-xl" onClick={() => setFormProduct(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl">
                  {"_id" in formProduct ? "Update Product" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}