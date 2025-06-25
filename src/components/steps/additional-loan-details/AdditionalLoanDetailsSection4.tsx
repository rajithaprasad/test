import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import { useState } from 'react';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface ScenarioSpecificInfo4Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ScenarioSpecificInfo4 = ({ formData, updateFormData, onNext, onPrevious }: ScenarioSpecificInfo4Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.planOnCompletion) {
      newErrors.planOnCompletion = 'Plan on Completion is required.';
    }

    if (formData.underContract && !formData.closingDate) {
      newErrors.closingDate = 'Closing Date is required when under contract.';
    }

    if (!formData.scopeOfWork) {
      newErrors.scopeOfWork = 'Scope of Work is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };
  const handleHomeClick = () => {
    localStorage.removeItem("userType");
    // Assuming you have a navigation function to go to the home page
    // navigate("/");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
       <ProgressIndicator
        currentStep={4} // Set this to the appropriate step number
        totalSteps={5} // Set this to the total number of steps in your process
        progress={80} // Set this to the appropriate progress percentage
        onHomeClick={handleHomeClick}
      />
     
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Scenario Specific Info
        </h2>
        <p className="text-lg text-gray-600">Section 4</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Section 4</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center p-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-emerald-200 focus-within:border-emerald-500 transition-all duration-300">
            <input
              type="checkbox"
              id="vacant"
              checked={formData.vacant || false}
              onChange={(e) => updateFormData({ vacant: e.target.checked })}
              className="w-6 h-6 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="vacant" className="ml-2 text-lg text-gray-700">
              Vacant
            </label>
          </div>

          <div className="floating-input relative">
            <select
              id="planOnCompletion"
              value={formData.planOnCompletion || ''}
              onChange={(e) => updateFormData({ planOnCompletion: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.planOnCompletion ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              <option value="">Select Plan on Completion</option>
              <option value="Sell">Sell</option>
              <option value="Refinance">Refinance</option>
            </select>
            <label htmlFor="planOnCompletion" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Plan on Completion
            </label>
            {errors.planOnCompletion && <p className="text-red-500 text-xs mt-1">{errors.planOnCompletion}</p>}
          </div>

          <div className="flex items-center p-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-emerald-200 focus-within:border-emerald-500 transition-all duration-300">
            <input
              type="checkbox"
              id="underContract"
              checked={formData.underContract || false}
              onChange={(e) => updateFormData({ underContract: e.target.checked })}
              className="w-6 h-6 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="underContract" className="ml-2 text-lg text-gray-700">
              Under Contract
            </label>
          </div>

          {formData.underContract && (
            <div className="floating-input relative">
              <input
                type="date"
                id="closingDate"
                value={formData.closingDate || ''}
                onChange={(e) => updateFormData({ closingDate: e.target.value })}
                className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                  errors.closingDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <label htmlFor="closingDate" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Closing Date
              </label>
              {errors.closingDate && <p className="text-red-500 text-xs mt-1">{errors.closingDate}</p>}
            </div>
          )}

          <div className="floating-input relative md:col-span-2">
            <textarea
              id="scopeOfWork"
              value={formData.scopeOfWork || ''}
              onChange={(e) => updateFormData({ scopeOfWork: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.scopeOfWork ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <label htmlFor="scopeOfWork" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Scope of Work
            </label>
            {errors.scopeOfWork && <p className="text-red-500 text-xs mt-1">{errors.scopeOfWork}</p>}
          </div>

          {[...Array(3)].map((_, index) => (
            <div key={index} className="floating-input relative">
              <textarea
                id={`comparable${index}`}
                value={formData[`comparable${index}`] || ''}
                onChange={(e) => updateFormData({ [`comparable${index}`]: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor={`comparable${index}`} className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Comparable {index + 1}
              </label>
            </div>
          ))}

          <div className="floating-input relative md:col-span-2">
            <textarea
              id="additionalDetail"
              value={formData.additionalDetail || ''}
              onChange={(e) => updateFormData({ additionalDetail: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="additionalDetail" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Additional Detail
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onPrevious} className="flex items-center px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200">
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous
        </button>
        <button type="submit" className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ScenarioSpecificInfo4;
