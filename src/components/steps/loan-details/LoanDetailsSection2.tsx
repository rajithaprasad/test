import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface LoanDetailsSection2Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LoanDetailsSection2 = ({ formData, updateFormData, onNext, onPrevious }: LoanDetailsSection2Props) => {
  // Calculate NOI based on Section 2 inputs
  const calculateNOI = () => {
    const { rentIncome, taxExpense, insuranceExpense, HOAFees } = formData;
    return (rentIncome || 0) - (taxExpense || 0) - (insuranceExpense || 0) - (HOAFees || 0);
  };

  // Calculate LTV based on Section 0 values (assuming they're passed in formData)
  const calculateLTV = () => {
    const { loanAmount, propertyValue } = formData;
    if (!propertyValue || propertyValue === 0) return 0;
    return Math.round(((loanAmount || 0) / propertyValue) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noi = calculateNOI();
    updateFormData({
      NOI: noi,
      requestedLTV: calculateLTV()
    });
    onNext();
  };
  const handleHomeClick = () => {
    localStorage.removeItem("userType");
    // Assuming you have a navigation function to go to the home page
    // navigate("/");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
       <ProgressIndicator
        currentStep={3} // Set this to the appropriate step number
        totalSteps={5} // Set this to the total number of steps in your process
        progress={60} // Set this to the appropriate progress percentage
        onHomeClick={handleHomeClick}
      />
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Loan Details
        </h2>
        <p className="text-lg text-gray-600">Section 2: DSCR - Acquisition - STR</p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Income and Expenses */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-800 mb-6">Annual NOI</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="floating-input relative">
              <input
                type="number"
                id="rentIncome"
                value={formData.rentIncome || ''}
                onChange={(e) => updateFormData({ rentIncome: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="rentIncome" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Rent Income ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="taxExpense"
                value={formData.taxExpense || ''}
                onChange={(e) => updateFormData({ taxExpense: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="taxExpense" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Tax Expense ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="insuranceExpense"
                value={formData.insuranceExpense || ''}
                onChange={(e) => updateFormData({ insuranceExpense: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="insuranceExpense" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Insurance Expense ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="HOAFees"
                value={formData.HOAFees || ''}
                onChange={(e) => updateFormData({ HOAFees: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="HOAFees" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                HOA Fees ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="NOI"
                value={calculateNOI()}
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="NOI" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                NOI ($)
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: LTV Calculation */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-6">LTV </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="floating-input relative">
              <input
                type="number"
                id="propertyValue"
                value={formData.propertyValue || ''}
                onChange={(e) => updateFormData({ propertyValue: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="propertyValue" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Property Value ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="loanAmount"
                value={formData.loanAmount || ''}
                onChange={(e) => updateFormData({ loanAmount: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="loanAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Loan Amount ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="text"
                id="requestedLTV"
                value={`${calculateLTV()}%`}
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="requestedLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                LTV Requested
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="text"
                id="maxLTV"
                value="80%"
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="maxLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Maximum LTV
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="flex items-center px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous
        </button>
        <button
          type="submit"
          className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default LoanDetailsSection2;
