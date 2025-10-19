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
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`progress-step w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isActive ? 'active' : isCompleted ? 'completed' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`ml-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>{step.label}</span>
                </div>
                {index < steps.length - 1 && <div className="w-16 h-0.5 bg-gray-300"></div>}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar




