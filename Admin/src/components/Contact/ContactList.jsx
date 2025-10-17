import React, { useState, useMemo } from 'react';

const initialMessages = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    subject: "Water Purifier Installation Issue",
    message: "I purchased AquaPure RO Premium 7-Stage last week but facing installation issues. The technician hasn't arrived yet and I need urgent assistance. Please help me resolve this matter as soon as possible.",
    priority: "high",
    status: "new",
    date: "2024-01-20",
    time: "10:30 AM"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    subject: "Product Inquiry - UV Filter",
    message: "Hi, I'm interested in purchasing UV Filter Pro for my home. Can you please provide more details about the filtration capacity and maintenance requirements? Also, what's the warranty period?",
    priority: "medium",
    status: "replied",
    date: "2024-01-19",
    time: "2:15 PM"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    subject: "Filter Replacement Request",
    message: "My AquaPure UF Standard needs filter replacement. It's been 6 months since installation. Please schedule a service visit and let me know the cost for replacement filters.",
    priority: "medium",
    status: "new",
    date: "2024-01-19",
    time: "11:45 AM"
  },
  {
    id: 4,
    name: "Sunita Reddy",
    email: "sunita.reddy@email.com",
    phone: "+91 9876543213",
    subject: "Warranty Claim",
    message: "My Alkaline Plus purifier stopped working after 8 months. It's still under warranty. The display shows error code E03. Please arrange for repair or replacement under warranty terms.",
    priority: "high",
    status: "new",
    date: "2024-01-18",
    time: "4:20 PM"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9876543214",
    subject: "Commercial RO Quotation",
    message: "We need a commercial RO system for our office of 50 people. Please provide a detailed quotation including installation, maintenance, and annual service contract costs.",
    priority: "low",
    status: "resolved",
    date: "2024-01-18",
    time: "9:30 AM"
  },
  {
    id: 6,
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    phone: "+91 9876543215",
    subject: "Water Quality Complaint",
    message: "The water from my AquaPure RO has a strange taste and odor since yesterday. I'm concerned about the water quality. Please send a technician to check the system immediately.",
    priority: "high",
    status: "new",
    date: "2024-01-17",
    time: "6:45 PM"
  },
  {
    id: 7,
    name: "Ravi Gupta",
    email: "ravi.gupta@email.com",
    phone: "+91 9876543216",
    subject: "Service Feedback",
    message: "I want to appreciate the excellent service provided by your technician Mr. Sharma. He was professional, punctual, and explained everything clearly. Great job!",
    priority: "low",
    status: "resolved",
    date: "2024-01-17",
    time: "1:20 PM"
  },
  {
    id: 8,
    name: "Kavita Agarwal",
    email: "kavita.agarwal@email.com",
    phone: "+91 9876543217",
    subject: "Payment Issue",
    message: "I made the payment for my order #ORD-2024-001 but the status still shows pending. Please check and update the payment status. Transaction ID: TXN123456789",
    priority: "medium",
    status: "replied",
    date: "2024-01-16",
    time: "3:10 PM"
  }
];

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-orange-100 text-orange-800',
  low: 'bg-green-100 text-green-800'
};
const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  replied: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800'
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

const ContactList = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return messages.filter(
      m =>
        (!priorityFilter || m.priority === priorityFilter) &&
        (!statusFilter || m.status === statusFilter)
    );
  }, [messages, priorityFilter, statusFilter]);

  // Stats
  const total = messages.length;
  const newCount = messages.filter(m => m.status === 'new').length;
  const resolved = messages.filter(m => m.status === 'resolved').length;
  const highPriority = messages.filter(m => m.priority === 'high').length;

  // Actions
  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(msgs => msgs.filter(m => m.id !== id));
      setSelected(sel => (sel && sel.id === id ? null : sel));
    }
  };

  const handleReply = (id, response) => {
    setMessages(msgs =>
      msgs.map(m =>
        m.id === id ? { ...m, status: 'replied' } : m
      )
    );
    alert('Response sent!');
  };

  const handleResolve = id => {
    setMessages(msgs =>
      msgs.map(m =>
        m.id === id ? { ...m, status: 'resolved' } : m
      )
    );
  };

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
            <p className="text-gray-600">Manage customer inquiries and support requests</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <select
              className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-water-blue"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="">All Messages</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-water-blue"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-100">
              <svg className="w-5 h-5 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-xl font-bold text-gray-900">{total}</p>
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
              <p className="text-sm font-medium text-gray-600">New Messages</p>
              <p className="text-xl font-bold text-gray-900">{newCount}</p>
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
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-xl font-bold text-gray-900">{resolved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border border-red-100">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-red-100">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-xl font-bold text-gray-900">{highPriority}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table or Details */}
      {!selected ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-water-blue to-water-gradient">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map(message => (
                  <tr key={message.id} className="hover:bg-blue-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-water-blue font-semibold text-sm">{message.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{message.name}</div>
                          <div className="text-xs text-gray-500">{message.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                      <div className="text-xs text-gray-500">{message.message.substring(0, 50)}...</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[message.priority]}`}>{message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{formatDate(message.date)}</div>
                      <div className="text-xs text-gray-500">{message.time}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[message.status]}`}>{message.status.charAt(0).toUpperCase() + message.status.slice(1)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelected(message)}
                          className="bg-water-blue hover:bg-deep-water text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-8">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {/* Details View */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Details</h1>
              <p className="text-gray-600">View and respond to customer inquiry</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              ← Back to Messages
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{selected.subject}</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[selected.priority]}`}>{selected.priority.charAt(0).toUpperCase() + selected.priority.slice(1)} Priority</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selected.status]}`}>{selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Received on {formatDate(selected.date)} at {selected.time}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold text-gray-900">{selected.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-900">{selected.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold text-gray-900">{selected.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 3v1h6V3H9z"/>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Message ID</p>
                        <p className="font-semibold text-gray-900">#MSG-{String(selected.id).padStart(4, '0')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Message Content</h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{selected.message}</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Send Response</h3>
                  <form
                    className="space-y-4"
                    onSubmit={e => {
                      e.preventDefault();
                      handleReply(selected.id, e.target.response.value);
                    }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Response Message</label>
                      <textarea name="response" rows={4} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200 resize-none" placeholder="Type your response to the customer..." required></textarea>
                    </div>
                    <div className="flex space-x-3">
                      <button type="submit" className="bg-water-blue hover:bg-deep-water text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                        Send Response
                      </button>
                      <button type="button" onClick={() => handleResolve(selected.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                        Mark as Resolved
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* Right */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href={`tel:${selected.phone}`} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      Call Customer
                    </a>
                    <a href={`mailto:${selected.email}`} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Send Email
                    </a>
                  </div>
                </div>
                {/* Danger Zone */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Danger Zone</h3>
                  <button onClick={() => handleDelete(selected.id)} className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                    Delete Message
                  </button>
                  <p className="text-xs text-red-600 mt-2">This action cannot be undone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContactList;