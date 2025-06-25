import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import { useState } from 'react';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface ScenarioSpecificInfo2Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ScenarioSpecificInfo2 = ({ formData, updateFormData, onNext, onPrevious }: ScenarioSpecificInfo2Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentUse) {
      newErrors.currentUse = 'Current Use is required.';
    }

    if (formData.underContract && !formData.closingDate) {
      newErrors.closingDate = 'Closing Date is required when under contract.';
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
        <p className="text-lg text-gray-600">Section 2</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Section 2</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <select
              id="currentUse"
              value={formData.currentUse || ''}
              onChange={(e) => updateFormData({ currentUse: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.currentUse ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              <option value="">Select Current Use</option>
              <option value="LTR">Long-Term Rental</option>
              <option value="STR">Short-Term Rental</option>
              <option value="Primary">Primary Residence</option>
              <option value="Vacant">Vacant</option>
            </select>
            <label htmlFor="currentUse" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Current Use
            </label>
            {errors.currentUse && <p className="text-red-500 text-xs mt-1">{errors.currentUse}</p>}
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

          <div className="md:col-span-2 floating-input relative">
            <textarea
              id="additionalDetail"
              value={formData.additionalDetail || ''}
              onChange={(e) => updateFormData({ additionalDetail: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              rows={4}
            />
            <label htmlFor="additionalDetail" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Additional Details
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

export default ScenarioSpecificInfo2;
