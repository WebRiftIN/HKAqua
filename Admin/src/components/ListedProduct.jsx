import React, { useState, useRef } from "react";

const initialProducts = [
  {
    id: 1,
    name: "hK aquafresh RO Premium 7-Stage",
    category: "ro-premium",
    categoryText: "RO Premium Series",
    discountedPrice: 15999,
    originalPrice: 18999,
    description: "Advanced 7-stage purification with RO+UV+UF technology for pure and safe drinking water.",
    specifications: ["7-Stage RO+UV+UF", "8 Liters Storage", "24W Power", "2 Years Warranty"],
    status: { new: true, limited: false, out: false, inactive: false },
    image: null
  },
  {
                id: 2,
                name: "hK aquafresh UV Filter Pro",
                category: "uv-filter",
                categoryText: "UV Water Filter",
                discountedPrice: 8999,
                originalPrice: 11999,
                description: "UV sterilization technology that kills 99.9% of bacteria and viruses.",
                specifications: ["UV Sterilization", "6 Liters Storage", "18W Power", "1 Year Warranty"],
                status: { new: false, limited: false, out: false, inactive: false },
                image: null
            },
            {
                id: 3,
                name: "hK aquafresh UF Standard",
                category: "uf-purifier",
                categoryText: "UF Water Purifier",
                discountedPrice: 6999,
                originalPrice: 8999,
                description: "Ultra-filtration technology for removing bacteria and suspended particles.",
                specifications: ["UF Technology", "5 Liters Storage", "No Power Required", "1 Year Warranty"],
                status: { new: false, limited: true, out: false, inactive: false },
                image: null
            },
            {
                id: 4,
                name: "hK aquafresh Alkaline Plus",
                category: "alkaline",
                categoryText: "Alkaline Water Purifier",
                discountedPrice: 22999,
                originalPrice: 25999,
                description: "Alkaline water purifier that maintains optimal pH levels for better health.",
                specifications: ["Alkaline Technology", "10 Liters Storage", "30W Power", "3 Years Warranty"],
                status: { new: true, limited: false, out: false, inactive: false },
                image: null
            },
            {
                id: 5,
                name: "hK aquafresh Gravity Filter",
                category: "gravity-based",
                categoryText: "Gravity Based Filter",
                discountedPrice: 3999,
                originalPrice: 4999,
                description: "Non-electric gravity-based water filter for areas with power issues.",
                specifications: ["Gravity Based", "20 Liters Storage", "No Power Required", "6 Months Warranty"],
                status: { new: false, limited: false, out: false, inactive: false },
                image: null
            },
            {
                id: 6,
                name: "hK aquafresh Commercial RO",
                category: "commercial",
                categoryText: "Commercial RO System",
                discountedPrice: 45999,
                originalPrice: 52999,
                description: "High-capacity commercial RO system for offices and restaurants.",
                specifications: ["Commercial Grade", "50 Liters/Hour", "100W Power", "5 Years Warranty"],
                status: { new: false, limited: true, out: false, inactive: false },
                image: null
            }
  // ...other products (copy from your JS array)
];

function getStatusBadge(status) {
  if (status.new) return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">New</span>;
  if (status.limited) return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Limited Stock</span>;
  if (status.out) return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Out of Stock</span>;
  if (status.inactive) return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>;
  return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
}

export default function ListedProduct() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    categoryText: "",
    discountedPrice: "",
    originalPrice: "",
    description: "",
    specifications: ["", "", "", ""],
    status: { new: false, limited: false, out: false, inactive: false },
    image: null
  });
  const [preview, setPreview] = useState(null);
  const imageInputRef = useRef();

  // Helper to reset form
  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      categoryText: "",
      discountedPrice: "",
      originalPrice: "",
      description: "",
      specifications: ["", "", "", ""],
      status: { new: false, limited: false, out: false, inactive: false },
      image: null
    });
    setPreview(null);
    setEditId(null);
  };

  // Show add product form
  const handleShowAdd = () => {
    resetForm();
    setShowForm(true);
  };

  // Show product list
  const handleShowList = () => {
    setShowForm(false);
    resetForm();
  };

  // Edit product
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setEditId(id);
    setForm({
      ...product,
      specifications: product.specifications.slice(),
      status: { ...product.status }
    });
    setPreview(product.image || null);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    if (window.confirm(`⚠️ Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`)) {
      setProducts(products.filter((p) => p.id !== id));
      alert(`🗑️ Product "${product.name}" has been deleted successfully!`);
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("spec-")) {
      const idx = Number(name.split("-")[1]) - 1;
      setForm((prev) => {
        const specs = prev.specifications.slice();
        specs[idx] = value;
        return { ...prev, specifications: specs };
      });
    } else if (name.startsWith("status-")) {
      setForm((prev) => ({
        ...prev,
        status: { ...prev.status, [name.split("-")[1]]: checked }
      }));
    } else if (name === "category") {
      setForm((prev) => ({
        ...prev,
        category: value,
        categoryText: e.target.options[e.target.selectedIndex].text
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // Save product (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p))
      );
      alert("✅ Product updated successfully!");
    } else {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [...prev, { ...form, id: newId }]);
      alert("🎉 Product added successfully!");
    }
    handleShowList();
  };

  // Stats
  const totalProducts = products.length;
  const activeProducts = products.filter(
    (p) => !p.status.out && !p.status.inactive
  ).length;
  const lowStock = products.filter((p) => p.status.limited).length;
  const outOfStock = products.filter((p) => p.status.out).length;

  return (
    <div className="min-h-full">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {!showForm ? (
          <div id="product-list-section">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Product List</h1>
                  <p className="text-gray-600">Manage your water purifier products inventory</p>
                </div>
                <button
                  onClick={handleShowAdd}
                  className="mt-4 sm:mt-0 bg-water-blue hover:bg-deep-water text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  + Add New Product
                </button>
              </div>
            </div>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-5 h-5 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-green-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-100">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-xl font-bold text-gray-900">{activeProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-orange-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Low Stock</p>
                    <p className="text-xl font-bold text-gray-900">{lowStock}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-red-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-red-100">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                    <p className="text-xl font-bold text-gray-900">{outOfStock}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-sky-600 to-sky-400">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="table-row">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                            ) : (
                              <svg className="w-6 h-6 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{product.categoryText}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-bold text-water-blue">₹{product.discountedPrice.toLocaleString()}</div>
                          <div className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(product.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product.id)}
                              className="bg-water-blue hover:bg-deep-water text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div id="add-product-section">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{editId ? "Edit Product" : "Add New Product"}</h1>
                  <p className="text-gray-600">{editId ? "Edit product details" : "Add a new water purifier product to your inventory"}</p>
                </div>
                <button
                  onClick={handleShowList}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  ← Back to List
                </button>
              </div>
            </div>
            {/* Product Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Product Image</label>
                  <div
                    className="upload-area rounded-xl p-6 text-center cursor-pointer"
                    onClick={() => imageInputRef.current.click()}
                  >
                    {!preview ? (
                      <div id="uploadContent">
                        <svg className="mx-auto h-12 w-12 text-water-blue mb-3" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm font-medium text-gray-700 mb-1">Click to upload product image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    ) : (
                      <div id="imagePreview">
                        <img src={preview} className="mx-auto max-h-32 rounded-lg shadow-md" alt="Preview" />
                        <p className="mt-2 text-water-blue font-medium text-sm">Click to change image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                  />
                </div>
                {/* Product Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
                        placeholder="e.g., hK aquafresh RO Premium 7-Stage"
                      />
                    </div>
                    {/* Product Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Product Category</label>
                      <select
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                        className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
                      >
                        <option value="">Select Category</option>
                        <option value="ro-premium">RO Premium Series</option>
                        <option value="ro-standard">RO Standard Series</option>
                        <option value="uv-filter">UV Water Filter</option>
                        <option value="uf-purifier">UF Water Purifier</option>
                        <option value="gravity-based">Gravity Based Filter</option>
                        <option value="alkaline">Alkaline Water Purifier</option>
                        <option value="commercial">Commercial RO System</option>
                      </select>
                    </div>
                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Discounted Price (₹)</label>
                        <input
                          type="number"
                          name="discountedPrice"
                          required
                          value={form.discountedPrice}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
                          placeholder="12999"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Original Price (₹)</label>
                        <input
                          type="number"
                          name="originalPrice"
                          required
                          value={form.originalPrice}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
                          placeholder="15999"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Product Description</label>
                      <textarea
                        rows="4"
                        name="description"
                        required
                        value={form.description}
                        onChange={handleChange}
                        className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200 resize-none"
                        placeholder="Describe your water purifier features, benefits, and specifications..."
                      />
                    </div>
                    {/* Status Checkboxes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Product Status</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:border-water-blue transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            name="status-new"
                            checked={form.status.new}
                            onChange={handleChange}
                            className="checkbox-custom"
                          />
                          <span className="text-sm font-medium text-gray-700">New Product</span>
                        </label>
                        <label className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:border-orange-400 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            name="status-limited"
                            checked={form.status.limited}
                            onChange={handleChange}
                            className="checkbox-custom"
                            style={{ borderColor: "#fb923c" }}
                          />
                          <span className="text-sm font-medium text-gray-700">Limited Stock</span>
                        </label>
                        <label className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:border-red-400 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            name="status-out"
                            checked={form.status.out}
                            onChange={handleChange}
                            className="checkbox-custom"
                            style={{ borderColor: "#f87171" }}
                          />
                          <span className="text-sm font-medium text-gray-700">Out of Stock</span>
                        </label>
                        <label className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            name="status-inactive"
                            checked={form.status.inactive}
                            onChange={handleChange}
                            className="checkbox-custom"
                            style={{ borderColor: "#9ca3af" }}
                          />
                          <span className="text-sm font-medium text-gray-700">Status Inactive</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Specifications Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Product Specifications</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i}>
                        <input
                          type="text"
                          name={`spec-${i + 1}`}
                          value={form.specifications[i]}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
                          placeholder={
                            [
                              "e.g., Purification Technology: 7-Stage RO+UV+UF",
                              "e.g., Storage Capacity: 8 Liters",
                              "e.g., Power Consumption: 24W",
                              "e.g., Warranty: 2 Years Comprehensive"
                            ][i]
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-water-blue to-water-gradient hover:from-deep-water hover:to-water-blue text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>{editId ? "Update Product" : "Add Product to Inventory"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}