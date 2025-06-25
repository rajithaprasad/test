import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import { useState } from 'react';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface ScenarioSpecificInfo3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ScenarioSpecificInfo3 = ({ formData, updateFormData, onNext, onPrevious }: ScenarioSpecificInfo3Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showMortgagePayoffDate, setShowMortgagePayoffDate] = useState(
    !!formData.mortgagePayoff && parseFloat(formData.mortgagePayoff) > 0
  );

  const handleMortgagePayoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ mortgagePayoff: value });
    setShowMortgagePayoffDate(!!value && parseFloat(value) > 0);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.originalPurchasePrice) {
      newErrors.originalPurchasePrice = 'Original Purchase Price is required.';
    }

    if (!formData.originalPurchaseDate) {
      newErrors.originalPurchaseDate = 'Original Purchase Date is required.';
    }

    if (!formData.mortgagePayoff) {
      newErrors.mortgagePayoff = 'Mortgage Payoff is required.';
    }

    if (showMortgagePayoffDate && !formData.mortgagePayoffDate) {
      newErrors.mortgagePayoffDate = 'Mortgage Payoff Date is required when mortgage payoff is greater than zero.';
    }

    if (!formData.monthsOfRentalHistory) {
      newErrors.monthsOfRentalHistory = 'Months of Rental History is required.';
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
        <p className="text-lg text-gray-600">Section 3</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Section 3</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <input
              type="number"
              id="originalPurchasePrice"
              value={formData.originalPurchasePrice || ''}
              onChange={(e) => updateFormData({ originalPurchasePrice: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.originalPurchasePrice ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <label htmlFor="originalPurchasePrice" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Original Purchase Price ($)
            </label>
            {errors.originalPurchasePrice && <p className="text-red-500 text-xs mt-1">{errors.originalPurchasePrice}</p>}
          </div>

          <div className="floating-input relative">
            <input
              type="date"
              id="originalPurchaseDate"
              value={formData.originalPurchaseDate || ''}
              onChange={(e) => updateFormData({ originalPurchaseDate: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.originalPurchaseDate ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <label htmlFor="originalPurchaseDate" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Original Purchase Date
            </label>
            {errors.originalPurchaseDate && <p className="text-red-500 text-xs mt-1">{errors.originalPurchaseDate}</p>}
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="rehabAmount"
              value={formData.rehabAmount || ''}
              onChange={(e) => updateFormData({ rehabAmount: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="rehabAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Rehab Amount ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="mortgagePayoff"
              value={formData.mortgagePayoff || ''}
              onChange={handleMortgagePayoffChange}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.mortgagePayoff ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <label htmlFor="mortgagePayoff" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Mortgage Payoff ($)
            </label>
            {errors.mortgagePayoff && <p className="text-red-500 text-xs mt-1">{errors.mortgagePayoff}</p>}
          </div>

          {showMortgagePayoffDate && (
            <div className="floating-input relative">
              <input
                type="date"
                id="mortgagePayoffDate"
                value={formData.mortgagePayoffDate || ''}
                onChange={(e) => updateFormData({ mortgagePayoffDate: e.target.value })}
                className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                  errors.mortgagePayoffDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <label htmlFor="mortgagePayoffDate" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Mortgage Payoff Date
              </label>
              {errors.mortgagePayoffDate && <p className="text-red-500 text-xs mt-1">{errors.mortgagePayoffDate}</p>}
            </div>
          )}

          <div className="floating-input relative">
            <input
              type="number"
              id="monthsOfRentalHistory"
              value={formData.monthsOfRentalHistory || ''}
              onChange={(e) => updateFormData({ monthsOfRentalHistory: e.target.value })}
              className={`w-full p-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg ${
                errors.monthsOfRentalHistory ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <label htmlFor="monthsOfRentalHistory" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Months of Rental History
            </label>
            {errors.monthsOfRentalHistory && <p className="text-red-500 text-xs mt-1">{errors.monthsOfRentalHistory}</p>}
          </div>

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

export default ScenarioSpecificInfo3;
