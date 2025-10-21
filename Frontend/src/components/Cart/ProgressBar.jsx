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
        <div className="flex flex-col sm:flex-row items-center sm:justify-center sm:space-x-8 space-y-3 sm:space-y-0">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const dotClass = isCompleted || isActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
            const labelClass = isActive || isCompleted ? 'text-green-700 font-semibold' : 'text-gray-600'

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    aria-current={isActive ? 'step' : undefined}
                    className={`progress-step w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${dotClass}`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10l2 2 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`ml-2 ${labelClass}`}>{step.label}</span>
                </div>

                {index < steps.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}

                {index < steps.length - 1 && (
                  // small connector for narrow screens: render a vertical line between stacked items
                  <div className={`sm:hidden flex items-center w-full`}> 
                    <div className={`mx-auto w-0.5 h-6 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar




