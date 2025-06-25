import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface LoanDetailsSection6Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LoanDetailsSection6 = ({ formData, updateFormData, onNext, onPrevious }: LoanDetailsSection6Props) => {

  const handlePropertyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propertyValue = parseInt(e.target.value) || 0;
    const totalCostBasis = propertyValue + (formData.constructionBudget || 0);
    const marginOnImprovement = formData.borrowerARV ? (formData.borrowerARV / totalCostBasis) * 100 : 0;
    const loanAmount = totalCostBasis * (formData.requestedLTC || 0) / 100;

    updateFormData({
      propertyValue,
      totalCostBasis,
      marginOnImprovement,
      loanAmount
    });
  };

  const handleConstructionBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const constructionBudget = parseInt(e.target.value) || 0;
    const totalCostBasis = (formData.propertyValue || 0) + constructionBudget;
    const marginOnImprovement = formData.borrowerARV ? (formData.borrowerARV / totalCostBasis) * 100 : 0;
    const loanAmount = totalCostBasis * (formData.requestedLTC || 0) / 100;

    updateFormData({
      constructionBudget,
      totalCostBasis,
      marginOnImprovement,
      loanAmount
    });
  };

  const handleBorrowerARVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const borrowerARV = parseInt(e.target.value) || 0;
    const totalCostBasis = (formData.propertyValue || 0) + (formData.constructionBudget || 0);
    const marginOnImprovement = totalCostBasis ? (borrowerARV / totalCostBasis) * 100 : 0;

    updateFormData({
      borrowerARV,
      marginOnImprovement
    });
  };

  const handleRequestedLTCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const requestedLTC = parseInt(e.target.value) || 0;
    const totalCostBasis = (formData.propertyValue || 0) + (formData.constructionBudget || 0);
    const loanAmount = totalCostBasis * requestedLTC / 100;

    updateFormData({
      requestedLTC,
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
        <p className="text-lg text-gray-600">Section 6: Construction - Acquisition</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Loan Details - Section 6</h3>

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
              Purchase Price ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="constructionBudget"
              value={formData.constructionBudget || ''}
              onChange={handleConstructionBudgetChange}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="constructionBudget" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Construction Budget ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="totalCostBasis"
              value={formData.totalCostBasis || ''}
              readOnly
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="totalCostBasis" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Total Cost Basis ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="borrowerARV"
              value={formData.borrowerARV || ''}
              onChange={handleBorrowerARVChange}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="borrowerARV" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Projected ARV ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="marginOnImprovement"
              value={formData.marginOnImprovement?.toFixed(2) || ''}
              readOnly
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="marginOnImprovement" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Improvement Margin (%)
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
              id="requestedLTC"
              value={formData.requestedLTC || ''}
              onChange={handleRequestedLTCChange}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="requestedLTC" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              LTC Requested (%)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="maxLTC"
              value={85}
              readOnly
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="maxLTC" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Maximum LTC (%)
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

export default LoanDetailsSection6;
