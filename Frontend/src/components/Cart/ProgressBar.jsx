import React from 'react'

function ProgressBar({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: 'Shopping Cart' },
    { id: 2, label: 'Checkout' },
    { id: 3, label: 'Confirmation' }
  ]

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* On small screens: vertical stack; on md+: horizontal row */}
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-center">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const connectorActive = currentStep > step.id // connector after this step should be green when next step is reached
            return (
              <div key={step.id} className="flex md:items-center md:flex-row flex-col md:flex-nowrap items-start md:space-x-4">
                <div className="flex items-start md:items-center">
                  <div
                    className={`progress-step flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isActive ? 'bg-green-600 text-white' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`mt-2 md:mt-0 md:ml-3 text-sm ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>{step.label}</span>
                </div>

                {/* connector: vertical on small screens, horizontal on md+ */}
                {index < steps.length - 1 && (
                  <div className="flex md:block md:mx-6">
                    <div className={`hidden md:block w-16 h-0.5 self-center ${connectorActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`md:hidden w-0.5 h-6 mx-auto my-2 ${connectorActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar




