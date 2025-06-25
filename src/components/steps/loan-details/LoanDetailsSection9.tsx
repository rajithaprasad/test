import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface LoanDetailsSection9Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LoanDetailsSection9 = ({ formData, updateFormData, onNext, onPrevious }: LoanDetailsSection9Props) => {

  const handlePropertyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propertyValue = parseInt(e.target.value) || 0;
    const loanAmount = propertyValue * (formData.requestedLTV || 0) / 100;

    updateFormData({
      propertyValue,
      loanAmount
    });
  };

  const handleRequestedLTVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const requestedLTV = parseInt(e.target.value) || 0;
    const loanAmount = (formData.propertyValue || 0) * requestedLTV / 100;

    updateFormData({
      requestedLTV,
      loanAmount
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <p className="text-lg text-gray-600">Section 9: Bridge - Refinance</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Loan Details - Section 9</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <input
              type="number"
              id="propertyValue"
              value={formData.propertyValue || ''}
              onChange={handlePropertyValueChange}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="propertyValue" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Estimated Value ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="loanAmount"
              value={formData.loanAmount || ''}
              readOnly
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="loanAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Loan Amount ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="requestedLTV"
              value={formData.requestedLTV || ''}
              onChange={handleRequestedLTVChange}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="requestedLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              LTV Requested (%)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="maxLTV"
              value={65}
              readOnly
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="maxLTV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Maximum LTV (%)
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

export default LoanDetailsSection9;
