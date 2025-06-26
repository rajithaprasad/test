
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { FormData } from '../../types/form';

interface LoanDetailsSection0Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LoanDetailsSection0 = ({ formData, updateFormData, onNext, onPrevious }: LoanDetailsSection0Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Loan Details
        </h2>
        <p className="text-lg text-gray-600">Section 0: DSCR - Acquisition - LTR</p>
      </div>

      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
        <h3 className="text-xl font-semibold text-green-800 mb-6">Loan Details - Section 0</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <input
              type="number"
              id="rentIncome"
              value={formData.rentIncome || ''}
              onChange={(e) => updateFormData({ rentIncome: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
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
              onChange={(e) => updateFormData({ taxExpense: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
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
              onChange={(e) => updateFormData({ insuranceExpense: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="insuranceExpense" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Insurance Expense ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="hoaFees"
              value={formData.HOAFees || ''}
              onChange={(e) => updateFormData({ HOAFees: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="hoaFees" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              HOA Fees ($)
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="propertyValue"
              value={formData.propertyValue || ''}
              onChange={(e) => updateFormData({ propertyValue: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
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
              onChange={(e) => updateFormData({ loanAmount: parseInt(e.target.value) || 0 })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="loanAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Loan Amount ($)
            </label>
          </div>

          <div className="flex items-center p-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-emerald-200 focus-within:border-emerald-500 transition-all duration-300">
            <input
              type="checkbox"
              id="underContract"
              checked={formData.underContract || false}
              onChange={(e) => updateFormData({ underContract: e.target.checked })}
              className="w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <label htmlFor="underContract" className="ml-3 text-lg text-gray-700 cursor-pointer">
              Under Contract
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="date"
              id="closingDate"
              value={formData.closingDate || ''}
              onChange={(e) => updateFormData({ closingDate: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="closingDate" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Closing Date
            </label>
          </div>
        </div>

        <div className="mt-6">
          <div className="floating-input relative">
            <textarea
              id="additionalDetail"
              value={formData.additionalDetail || ''}
              onChange={(e) => updateFormData({ additionalDetail: e.target.value })}
              placeholder=" "
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg resize-none"
            />
            <label htmlFor="additionalDetail" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Additional Details
            </label>
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

export default LoanDetailsSection0;
