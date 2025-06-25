import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface LoanDetailsSection3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LoanDetailsSection3 = ({ formData, updateFormData, onNext, onPrevious }: LoanDetailsSection3Props) => {
  // Calculate NOI based on Section 3 inputs
  const calculateNOI = () => {
    const { rentIncome: s3RentIncome, taxExpense: s3TaxExpense,
            insuranceExpense: s3InsuranceExpense, HOAFees: s3HOAFees } = formData;
    return (s3RentIncome || 0) - (s3TaxExpense || 0) - (s3InsuranceExpense || 0) - (s3HOAFees || 0);
  };

  // Calculate LTV based on Section 3 values
  const calculateLTV = () => {
    const { loanAmount: s3LoanAmount, propertyValue: s3PropertyValue } = formData;
    if (!s3PropertyValue || s3PropertyValue === 0) return 0;
    return Math.round(((s3LoanAmount || 0) / s3PropertyValue) * 100);
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
          DSCR/LTV
        </h2>
        <p className="text-lg text-gray-600">Section 3: Annual Financials</p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Annual NOI */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-800 mb-6">Annual NOI</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="floating-input relative">
              <input
                type="number"
                id="s3-rentIncome"
                value={formData.rentIncome || ''}
                onChange={(e) => updateFormData({ rentIncome: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="s3-rentIncome" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Rent Income ($) *
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="s3-taxExpense"
                value={formData.taxExpense || ''}
                onChange={(e) => updateFormData({ taxExpense: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="s3-taxExpense" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Tax Expense ($) *
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="s3-insuranceExpense"
                value={formData.insuranceExpense || ''}
                onChange={(e) => updateFormData({ insuranceExpense: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="s3-insuranceExpense" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Insurance Expense ($) *
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="s3-HOAFees"
                value={formData.HOAFees || ''}
                onChange={(e) => updateFormData({ HOAFees: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="s3-HOAFees" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                HOA Fees ($)
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="s3-NOI"
                value={calculateNOI()}
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="s3-NOI" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                NOI ($)
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: LTV Calculation */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-6">LTV</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="floating-input relative">
              <input
                type="number"
                id="s3-propertyValue"
                value={formData.propertyValue || ''}
                onChange={(e) => updateFormData({ propertyValue: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="s3-propertyValue" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Property Value ($) *
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="number"
                id="s3-loanAmount"
                value={formData.loanAmount || ''}
                onChange={(e) => updateFormData({ loanAmount: parseFloat(e.target.value) || 0 })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                required
              />
              <label htmlFor="s3-loanAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Loan Amount ($) *
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="text"
                id="s3-requestedLTV"
                value={`${calculateLTV()}%`}
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="s3-requestedLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                LTV Requested
              </label>
            </div>

            <div className="floating-input relative">
              <input
                type="text"
                id="s3-maxLTV"
                value="80%"
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-100/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="s3-maxLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
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

export default LoanDetailsSection3;
