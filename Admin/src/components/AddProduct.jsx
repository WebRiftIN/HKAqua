import React, { useState, useRef } from 'react';
import './all.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { backend } from '../App';

const AddProduct = () => {

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('All');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [features, setFeatures] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [limitedStock, setLimitedStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [inactive, setInactive] = useState(false);

    // Specification fields (4 separate inputs)
    const [spec1, setSpec1] = useState('');
    const [spec2, setSpec2] = useState('');
    const [spec3, setSpec3] = useState('');
    const [spec4, setSpec4] = useState('');


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
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
                setImageFile(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const strSpecifications = [spec1, spec2, spec3, spec4].filter(Boolean)
        if(!imageFile){
            toast.error('Please select a product image');
            return;
        }
        const formData = new FormData();
        formData.append('name', name)
        formData.append('category', category)
        formData.append('description', features)
        formData.append('discountedPrice', price)
        formData.append('orignalPrice', originalPrice)
        formData.append('specifications', JSON.stringify(strSpecifications))
        formData.append('isNewProduct', isNew)
        formData.append('isLimited', limitedStock)
        formData.append('isOutOfStock', outOfStock)
        formData.append('isInactive', inactive)
        formData.append('image', imageFile)

        try {
            const response = await axios.post(backend+"/api/product/addProduct", formData)
            if (response.data.success) {
                toast.success(response.data.message)
                alert(`🎉 Product added successfully to your inventory!\n\nProduct: ${formData.name}\nCategory: ${formData.category}\nPrice: ₹${formData.price}`);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            // Reset form and state
            setName('');
            setCategory('under-sink');
            setPrice('');
            setOriginalPrice('');
            setFeatures('');
            setSpec1('');
            setSpec2('');
            setSpec3('');
            setSpec4('');
            setIsNew(false);
            setLimitedStock(false);
            setOutOfStock(false);
            setInactive(false);
            setImagePreview(null);
            setImageFile(null);
            setIsDragOver(false);
        }
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
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                    value={name}
                                    onChange={e => setName(e.target.value)}
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
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
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
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
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
                                        value={originalPrice}
                                        onChange={e => setOriginalPrice(e.target.value)}
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
                                    value={features}
                                    onChange={e => setFeatures(e.target.value)}
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 resize-none"
                                    placeholder="Describe your water purifier features, benefits, and specifications..."
                                ></textarea>
                            </div>

                            {/* Status Checkboxes */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-4">Product Status</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-water-blue transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isNew"
                                            className="checkbox-custom"
                                            checked={isNew}
                                            onChange={e => setIsNew(e.target.checked)}
                                        />
                                        <span className="font-medium text-gray-700">New Product</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-orange-400 transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="limitedStock"
                                            className="checkbox-custom checkbox-orange"
                                            checked={limitedStock}
                                            onChange={e => setLimitedStock(e.target.checked)}
                                        />
                                        <span className="font-medium text-gray-700">Limited Stock</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-red-400 transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="outOfStock"
                                            className="checkbox-custom checkbox-red"
                                            checked={outOfStock}
                                            onChange={e => setOutOfStock(e.target.checked)}
                                        />
                                        <span className="font-medium text-gray-700">Out of Stock</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="inactive"
                                            className="checkbox-custom checkbox-gray"
                                            checked={inactive}
                                            onChange={e => setInactive(e.target.checked)}
                                        />
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
                                    value={spec1}
                                    onChange={e => setSpec1(e.target.value)}
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                                    placeholder="e.g., Purification Technology: 7-Stage RO+UV+UF"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 2</label>
                                <input
                                    type="text"
                                    name="spec2"
                                    value={spec2}
                                    onChange={e => setSpec2(e.target.value)}
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                                    placeholder="e.g., Storage Capacity: 8 Liters"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 3</label>
                                <input
                                    type="text"
                                    name="spec3"
                                    value={spec3}
                                    onChange={e => setSpec3(e.target.value)}
                                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                                    placeholder="e.g., Power Consumption: 24W"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specification 4</label>
                                <input
                                    type="text"
                                    name="spec4"
                                    value={spec4}
                                    onChange={e => setSpec4(e.target.value)}
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
