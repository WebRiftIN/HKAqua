import React from 'react'

function PersonalInfo({ form, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
        </svg>
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input type="text" id="firstName" name="firstName" required
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="Enter your first name" value={form.firstName} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input type="text" id="lastName" name="lastName" required
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="Enter your last name" value={form.lastName} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" id="email" name="email" required
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="your.email@example.com" value={form.email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" required maxLength={10}
                 className="form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                 placeholder="+91 98765 43210" value={form.phone} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo


