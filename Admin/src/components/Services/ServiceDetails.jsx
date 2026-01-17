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

const ServiceDetails = ({ service, onBack, onUpdateStatus, onUpdateSchedule, onAssignTechnician, onDelete, onUpdateNotes, onSave }) => {
  const [status, setStatus] = React.useState(service.status || "scheduled");
  const [installationDate, setInstallationDate] = React.useState(service.installationDate || "");
  const [installationTime, setInstallationTime] = React.useState(service.installationTime || "");
  const [notes, setNotes] = React.useState(service.notes || "");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setStatus(service.status || "scheduled");
    setInstallationDate(service.installationDate || "");
    setInstallationTime(service.installationTime || "");
    setNotes(service.notes || "");
  }, [service]);

  if (!service) return null;

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      id: service.id || service._id,
      status,
      installationDate,
      installationTime,
      notes
    });
    setSaving(false);
  };

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
                  {getStatusBadge(status)}
                  {service.priority === 'urgent' && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full urgent-badge">URGENT</span>
                  )}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Booked on {formatDate(service.bookingDate  || service.createdAt)} • Scheduled for {formatDate(installationDate)} at {installationTime}
              </div>
            </div>
            {/* Customer Information */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">{service.customerName || service.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-semibold text-gray-900">{service.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-900">{service.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Street Address</p>
                  <p className="font-semibold text-gray-900">{service.street || service.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-gray-900">{service.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pincode</p>
                  <p className="font-semibold text-gray-900">{service.pincode || service.pinCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(service.bookingDate || service.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Installation Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(installationDate)}</p>
                </div>
              </div>
            </div>
            {/* Service Notes */}
              <ServiceNotesEditor notes={notes} setNotes={setNotes} />
          </div>
          {/* Right Column - Actions & Management */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Status</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200">
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
                  <input type="date" value={installationDate} onChange={e => setInstallationDate(e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" />
                </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Installation Time</label>
                     <input type="time" value={installationTime} onChange={e => setInstallationTime(e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" />
                   </div>
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-end">
              <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Editable Service Notes component (now controlled by parent)
function ServiceNotesEditor({ notes, setNotes }) {
  const [editing, setEditing] = React.useState(false);
  const [localNotes, setLocalNotes] = React.useState(notes || "");

  React.useEffect(() => {
    setLocalNotes(notes || "");
    setEditing(false);
  }, [notes]);

  const handleDone = () => {
    setNotes(localNotes);
    setEditing(false);
  };
  const handleCancel = () => {
    setLocalNotes(notes || "");
    setEditing(false);
  };

  return (
    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Notes</h3>
      <div className="bg-white rounded-lg p-4 border border-yellow-200">
        {editing ? (
          <>
            <textarea
              className="w-full border border-yellow-300 rounded-lg p-2 text-gray-700 mb-2"
              rows={4}
              value={localNotes}
              onChange={e => setLocalNotes(e.target.value)}
            />
            <div className="flex space-x-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded font-medium text-sm"
                onClick={handleDone}
              >
                Done
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded font-medium text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 whitespace-pre-line min-h-[2em]">{notes || <span className="italic text-gray-400">No notes yet.</span>}</p>
            <button
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded font-medium text-sm"
              onClick={() => setEditing(true)}
            >
              Edit Notes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
  
export default ServiceDetails;

          