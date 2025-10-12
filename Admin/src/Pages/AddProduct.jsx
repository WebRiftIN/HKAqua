import React from 'react';
import Header from '../components/Header';
import AddProduct from '../components/AddProduct';

const AddProductPage = () => {
    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-white">
            <Header />
            <AddProduct />
        </div>
    );
};

export default AddProductPage;