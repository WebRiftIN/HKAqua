import React from 'react';

const StatsSummary = ({ services }) => {
  const scheduled = services.filter(s => s.status === 'scheduled').length;
  const inProgress = services.filter(s => s.status === 'in-progress').length;
  const completed = services.filter(s => s.status === 'completed').length;
  const urgent = services.filter(s => s.priority === 'urgent').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-100">
            <svg className="w-5 h-5 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Services</p>
            <p className="text-xl font-bold text-gray-900">{services.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-orange-100">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-orange-100">
            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Scheduled</p>
            <p className="text-xl font-bold text-gray-900">{scheduled}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-purple-100">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-xl font-bold text-gray-900">{inProgress}</p>
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
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-xl font-bold text-gray-900">{completed}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-red-100">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-red-100">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Urgent</p>
            <p className="text-xl font-bold text-gray-900">{urgent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
