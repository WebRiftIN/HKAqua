import React, { useState, useRef } from 'react';
import './all.css';

const AddProduct = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target.result);
                    setImageFile(file);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(event.target);
        const productData = {
            name: formData.get('productName'),
            category: formData.get('category'),
            discountedPrice: formData.get('discountedPrice'),
            originalPrice: formData.get('originalPrice'),
            description: formData.get('description'),
            specifications: [
                formData.get('spec1'),
                formData.get('spec2'),
                formData.get('spec3'),
                formData.get('spec4')
            ],
            status: {
                isNew: formData.get('isNew') === 'on',
                limitedStock: formData.get('limitedStock') === 'on',
                outOfStock: formData.get('outOfStock') === 'on',
                inactive: formData.get('inactive') === 'on'
            },
            image: imageFile
        };

        // Simulate successful product addition
        alert(`🎉 Product added successfully to your inventory!\n\nProduct: ${productData.name}\nCategory: ${productData.category}\nPrice: ₹${productData.discountedPrice}`);
        
        // Reset form
        event.target.reset();
        setImagePreview(null);
        setImageFile(null);
    };

    return (
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Product</h1>
                <p className="text-gray-600 text-lg">Add a new water purifier product to your inventory</p>
            </div>

            {/* Product Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-4">Product Image</label>
                        <div 
                            className={`upload-area rounded-2xl p-8 text-center cursor-pointer ${isDragOver ? 'dragover' : ''}`}
                            onClick={handleUploadClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {!imagePreview ? (
                                <div id="uploadContent">
                                    <svg className="mx-auto h-16 w-16 text-water-blue mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-xl font-medium text-gray-700 mb-2">Click to upload product image</p>
                                    <p className="text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            ) : (
                                <div id="imagePreview">
                                    <img src={imagePreview} alt="Preview" className="mx-auto max-h-64 rounded-xl shadow-lg" />
                                    <p className="mt-4 text-water-blue font-medium">Click to change image</p>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Product Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-3">Product Name</label>
                                <input 
                                    type="text" 
                                    name="productName"
                                    required 
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                    placeholder="e.g., AquaPure RO Premium 7-Stage"
                                />
                            </div>

                            {/* Product Category */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-3">Product Category</label>
                                <select 
                                    name="category"
                                    required 
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-lg font-semibold text-gray-900 mb-3">Discounted Price (₹)</label>
                                    <input 
                                        type="number" 
                                        name="discountedPrice"
                                        required 
                                        className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                        placeholder="12999"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold text-gray-900 mb-3">Original Price (₹)</label>
                                    <input 
                                        type="number" 
                                        name="originalPrice"
                                        required 
                                        className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                        placeholder="15999"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-3">Product Description</label>
                                <textarea 
                                    name="description"
                                    rows="6" 
                                    required 
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 resize-none" 
                                    placeholder="Describe your water purifier features, benefits, and specifications..."
                                ></textarea>
                            </div>

                            {/* Status Checkboxes */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-4">Product Status</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-water-blue transition-all duration-200 cursor-pointer">
                                        <input type="checkbox" name="isNew" className="checkbox-custom" />
                                        <span className="font-medium text-gray-700">New Product</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-orange-400 transition-all duration-200 cursor-pointer">
                                        <input type="checkbox" name="limitedStock" className="checkbox-custom checkbox-orange" />
                                        <span className="font-medium text-gray-700">Limited Stock</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-red-400 transition-all duration-200 cursor-pointer">
                                        <input type="checkbox" name="outOfStock" className="checkbox-custom checkbox-red" />
                                        <span className="font-medium text-gray-700">Out of Stock</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                                        <input type="checkbox" name="inactive" className="checkbox-custom checkbox-gray" />
                                        <span className="font-medium text-gray-700">Status Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-4">Product Specifications</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 1</label>
                                <input 
                                    type="text" 
                                    name="spec1"
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                    placeholder="e.g., Purification Technology: 7-Stage RO+UV+UF"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 2</label>
                                <input 
                                    type="text" 
                                    name="spec2"
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                    placeholder="e.g., Storage Capacity: 8 Liters"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 3</label>
                                <input 
                                    type="text" 
                                    name="spec3"
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                    placeholder="e.g., Power Consumption: 24W"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 4</label>
                                <input 
                                    type="text" 
                                    name="spec4"
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200" 
                                    placeholder="e.g., Warranty: 2 Years Comprehensive"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-deep-water hover:to-water-blue text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Add Product to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddProduct;
