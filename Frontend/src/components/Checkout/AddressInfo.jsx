import React from 'react'

function AddressInfo({ form, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
        </svg>
        Delivery Address
      </h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
          <input type="text" id="street" name="street" required
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="House/Flat No., Building Name, Street" value={form.street} onChange={onChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input type="text" id="city" name="city" required
                   className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                   placeholder="Enter city" value={form.city} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select id="state" name="state" required
                    className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" value={form.state} onChange={onChange}>
              <option value="">Select State</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
              <option value="gujarat">Gujarat</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="west-bengal">West Bengal</option>
              <option value="tamil-nadu">Tamil Nadu</option>
            </select>
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
            <input type="text" id="pincode" name="pincode" required maxLength={6}
                   className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                   placeholder="400001" value={form.pincode} onChange={onChange} />
          </div>
        </div>
        <div>
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
          <input type="text" id="landmark" name="landmark"
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="Near hospital, mall, etc." value={form.landmark} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default AddressInfo


