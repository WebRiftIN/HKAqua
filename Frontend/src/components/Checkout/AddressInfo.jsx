import React, { useState, useEffect, useRef } from 'react'

function CitySelector({ id, name, value, onChange, error }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const listRef = useRef(null)

  // Nearby cities (~25km of Ambala Cantt)
  const cities = [
    'Ambala Cantt',
    'Ambala City',
    'Barara',
    'Mullana',
    'Naraingarh',
    'Saha',
    'Garnala',
    'Babyal',
    'Boh',
    'Kakkar Majra',
    'Panjokhara Sahib',
    'Mullana',
    'Shahzadpur',
    'Tundla',
    'Saha',
    'Lalru'
  ]

  const filtered = cities.filter(c => c.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function handleSelect(city) {
    // mimic input event shape
    onChange({ target: { name, value: city } })
    setOpen(false)
  }

  return (
    <div>
      <div className="relative">
        <button type="button" id={id} name={name} onClick={() => setOpen(true)}
          className={`w-full text-left px-4 py-3 rounded-lg border-2 ${error ? 'border-red-300' : 'border-blue-100'} focus:outline-none`}>
          {value ? value : <span className="text-gray-400">Select city</span>}
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black opacity-40" onClick={() => setOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full z-10">
            <div className="px-4 py-3 border-b">
              <div className="flex items-center space-x-2">
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city..." className="w-full px-3 py-2 border rounded focus:outline-none" />
                <button className="px-3 py-2 text-sm text-gray-600" onClick={() => setQuery('')}>Clear</button>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto" ref={listRef}>
              {filtered.length === 0 ? (
                <div className="p-4 text-gray-500">No cities found</div>
              ) : (
                <ul>
                  {filtered.map((c) => (
                    <li key={c}>
                      <button type="button" onClick={() => handleSelect(c)} className="w-full text-left px-4 py-3 hover:bg-gray-100">{c}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="px-4 py-3 text-right border-t">
              <button className="px-4 py-2 rounded bg-gray-100" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AddressInfo({ form, onChange, errors = {} }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        Delivery Address
      </h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
          <input type="text" id="street" name="street"
            className={`form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 ${errors.street ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-blue-100 focus:border-blue-500 focus:ring-blue-200'}`}
            placeholder="House/Flat No., Building Name, Street" value={form.street} onChange={onChange} />
          {errors.street && <p className="text-sm text-red-600 mt-1">{errors.street}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            {/* Readonly field that opens modal */}
            <CitySelector id="city" name="city" value={form.city} onChange={onChange} error={errors.city} />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select id="state" name="state"
              className={`form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 ${errors.state ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-blue-100 focus:border-blue-500 focus:ring-blue-200'}`} value={form.state} onChange={onChange}>
              <option value="">Select State</option>
              <option value="maharashtra">Haryana</option>
              <option value="delhi">Punjab</option>
            </select>
            {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state}</p>}
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
            <input type="text" id="pincode" name="pincode" maxLength={6}
              className={`form-input w-full px-4 py-3 rounded-lg focus:outline-none border-2 ${errors.pincode ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-blue-100 focus:border-blue-500 focus:ring-blue-200'}`}
              placeholder="400001" value={form.pincode} onChange={onChange} />
            {errors.pincode && <p className="text-sm text-red-600 mt-1">{errors.pincode}</p>}
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


