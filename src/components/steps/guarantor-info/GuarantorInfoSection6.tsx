import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../../../types/form';
import ProgressIndicator from '../../ProgressIndicator'; // Make sure the path is correct
interface GuarantorInfoSection6Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const GuarantorInfoSection6 = ({ formData, updateFormData, onNext, onPrevious }: GuarantorInfoSection6Props) => {
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
        currentStep={2} // Set this to the appropriate step number
        totalSteps={5} // Set this to the total number of steps in your process
        progress={40} // Set this to the appropriate progress percentage
        onHomeClick={handleHomeClick}
      />
    
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent mb-3">
          Guarantor Information
        </h2>
        <p className="text-lg text-teal-600">Section 6: Construction Loan - Acquisition</p>
      </div>

      <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
        <h3 className="text-xl font-semibold text-teal-800 mb-6">Guarantor Details - Section 6</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <input
              type="text"
              id="firstName"
              value={formData.firstName || ''}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              placeholder=" "
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="firstName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              First Name *
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="text"
              id="lastName"
              value={formData.lastName || ''}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              placeholder=" "
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="lastName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Last Name *
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="email"
              id="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="email" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Email
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              placeholder=" "
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="phoneNumber" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Phone Number
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="creditScore"
              value={formData.creditScore || ''}
              onChange={(e) => updateFormData({ creditScore: parseInt(e.target.value) || 0 })}
              placeholder=" "
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="creditScore" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Credit Score *
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="projectsCompleted"
              value={formData.projectsCompleted || ''}
              onChange={(e) => updateFormData({ projectsCompleted: parseInt(e.target.value) || 0 })}
              placeholder=" "
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="projectsCompleted" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Projects Completed
            </label>
          </div>

          <div className="floating-input relative">
            <input
              type="number"
              id="liquidity"
              value={formData.liquidity || ''}
              onChange={(e) => updateFormData({ liquidity: parseInt(e.target.value) || 0 })}
              placeholder=" "
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
            />
            <label htmlFor="liquidity" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Liquidity ($) *
            </label>
          </div>

          <div className="floating-input relative">
            <select
              id="licensesHeld"
              value={formData.licensesHeld || ''}
              onChange={(e) => updateFormData({ licensesHeld: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
            >
              <option value="General Contractor">General Contractor</option>
              <option value="Real Estate Agent">Real Estate Agent</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="licensesHeld" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Licenses Held
            </label>
          </div>

          <div className="floating-input relative">
            <select
              id="citizenship"
              value={formData.citizenship || ''}
              onChange={(e) => updateFormData({ citizenship: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
            >
              <option value="">Select Citizenship</option>
              <option value="US Citizen">US Citizen</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Non-Permanent Resident">Non-Permanent Resident</option>
              <option value="Foreign National">Foreign National</option>
            </select>
            <label htmlFor="citizenship" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
              Citizenship
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

export default GuarantorInfoSection6;
