import React from 'react';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getStatusBadge = status => {
  const statusConfig = {
    'scheduled': { color: 'blue', text: 'Scheduled' },
    'in-progress': { color: 'yellow', text: 'In Progress' },
    'completed': { color: 'green', text: 'Completed' },
    'cancelled': { color: 'red', text: 'Cancelled' }
  };
  const config = statusConfig[status] || statusConfig['scheduled'];
  return <span className={`px-2 py-1 text-xs font-medium bg-${config.color}-100 text-${config.color}-800 rounded-full`}>{config.text}</span>;
};

const getServiceTypeBadge = type => {
  const typeConfig = {
    'installation': { color: 'blue', text: 'Installation', icon: '🔧' },
    'repair': { color: 'red', text: 'Repair', icon: '⚡' },
    'maintenance': { color: 'green', text: 'Maintenance', icon: '🛠️' },
    'commercial': { color: 'purple', text: 'Commercial', icon: '🏢' }
  };
  const config = typeConfig[type] || typeConfig['installation'];
  return <span className={`px-2 py-1 text-xs font-medium bg-${config.color}-100 text-${config.color}-800 rounded-full`}>{config.icon} {config.text}</span>;
};

const ServiceDetails = ({ service, onBack, onUpdateStatus, onUpdateSchedule, onAssignTechnician, onDelete }) => {
  if (!service) return null;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Details</h1>
            <p className="text-gray-600">View and manage service booking information</p>
          </div>
          <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
            ← Back to Services
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 service-card">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{service.id}</h2>
                <div className="flex items-center space-x-2">
                  {getServiceTypeBadge(service.serviceType)}
                  {getStatusBadge(service.status)}
                  {service.priority === 'urgent' && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full urgent-badge">URGENT</span>
                  )}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Booked on {formatDate(service.bookingDate)} • Scheduled for {formatDate(service.installationDate)} at {service.installationTime}
              </div>
            </div>
            {/* Customer Information */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-900">{service.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-semibold text-gray-900">{service.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-gray-900">{service.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Assigned Technician</p>
                    <p className="font-semibold text-gray-900">{service.technician}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Address Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Street Address</p>
                  <p className="font-semibold text-gray-900">{service.street}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-gray-900">{service.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pincode</p>
                  <p className="font-semibold text-gray-900">{service.pincode}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">Complete Address</p>
                <p className="font-medium text-gray-900">{service.street}, {service.city} - {service.pincode}</p>
              </div>
            </div>
            {/* Service Notes */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Notes</h3>
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <p className="text-gray-700">{service.notes}</p>
              </div>
            </div>
          </div>
          {/* Right Column - Actions & Management */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Status</label>
                  <select value={service.status} onChange={e => onUpdateStatus(service.id, e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200">
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Date & Time Management */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Management</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                  <input type="date" value={service.installationDate} onChange={e => onUpdateSchedule(service.id, e.target.value, service.installationTime)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Installation Time</label>
                  <input type="text" value={service.installationTime} onChange={e => onUpdateSchedule(service.id, service.installationDate, e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" />
                </div>
              </div>
            </div>
            {/* Technician Assignment */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technician Assignment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Technician</label>
                  <select value={service.technician} onChange={e => onAssignTechnician(service.id, e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200">
                    <option value="Ravi Sharma">Ravi Sharma</option>
                    <option value="Amit Patel">Amit Patel</option>
                    <option value="Suresh Kumar">Suresh Kumar</option>
                    <option value="Vikram Singh">Vikram Singh</option>
                    <option value="Rajesh Gupta">Rajesh Gupta</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={() => alert(`📞 Initiating call to ${service.phone}...`)} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">Call Customer</button>
                <button onClick={() => alert(`📱 Sending SMS to ${service.phone}...`)} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">Send SMS</button>
                <button onClick={() => alert(`📧 Opening email client to send message to ${service.email}...`)} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">Send Email</button>
                <button onClick={() => alert(`📊 Generating service report for ${service.id}...`)} className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">Generate Report</button>
              </div>
            </div>
            {/* Delete Service */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Danger Zone</h3>
              <button onClick={() => onDelete(service.id)} className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">Delete Service</button>
              <p className="text-xs text-red-600 mt-2">This action cannot be undone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
