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

const ServiceTable = ({ services, onView, onUpdate, onDelete }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-water-blue to-water-gradient">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Service ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Service Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Installation Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map(service => {
            const priorityClass = service.priority === 'urgent' ? 'urgent-badge' : '';
            return (
              <tr key={service.id} className={`table-row ${priorityClass}`}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-water-blue">{service.id}</div>
                  <div className="text-xs text-gray-500">{formatDate(service.bookingDate)}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-water-blue font-semibold text-sm">{service.customerName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.customerName}</div>
                      <div className="text-xs text-gray-500">{service.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{getServiceTypeBadge(service.serviceType)}</td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{formatDate(service.installationDate)}</div>
                  <div className="text-xs text-gray-500">{service.installationTime}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{service.city}</div>
                  <div className="text-xs text-gray-500">{service.pincode}</div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(service.status)}
                  {service.priority === 'urgent' && <div className="text-xs text-red-600 font-medium mt-1">URGENT</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button onClick={() => onView(service.id)} className="bg-water-blue hover:bg-deep-water text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200">View</button>
                    <button onClick={() => onUpdate(service.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200">Update</button>
                    <button onClick={() => onDelete(service.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default ServiceTable;
