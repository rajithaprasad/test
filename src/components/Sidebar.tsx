
import { ChevronRight, CheckCircle, Circle, User, ClipboardList } from 'lucide-react';
import { Step } from '../types/form';

interface SidebarProps {
  steps: Step[];
  currentStep: Step;
  onStepClick: (step: Step) => void;
  userType: 'broker' | 'borrower';
  currentSectionId?: number;
}

const Sidebar = ({ steps, currentStep, onStepClick, userType, currentSectionId = 0 }: SidebarProps) => {
  const stepLabels: Record<Step, string> = {
    'deal-intro': 'Deal Introduction',
    'guarantor-info': 'Guarantor Information',
    'loan-details': 'Loan Details',
    'additional-loan-details': 'Additional Loan Details',
    'broker-info': 'Broker Information',
    'borrower-info': 'Borrower Information',
  };

  const getSectionTitle = (sectionId: number) => {
    const sectionTitles = [
      'DSCR - Acquisition - LTR',
      'DSCR - Refinance - LTR',
      'DSCR - Acquisition - STR',
      'DSCR - Refinance - STR',
      'Renovation - Acquisition',
      'Renovation - Refinance',
      'Construction - Acquisition',
      'Construction - Refinance',
      'Bridge - Acquisition',
      'Bridge - Refinance'
    ];
    return sectionTitles[sectionId] || 'Section ' + sectionId;
  };

  const currentStepIndex = steps.indexOf(currentStep);

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-blue-500/10 sticky top-24">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <ClipboardList className="w-5 h-5 text-emerald-500 mr-2" />
          Application Progress
        </h3>

        {currentSectionId !== undefined && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-blue-600 mb-1">Current Section:</div>
            <div className="text-sm font-semibold text-blue-800">
              Section {currentSectionId}: {getSectionTitle(currentSectionId)}
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isClickable = index <= currentStepIndex;

            return (
              <button
                key={step}
                onClick={() => isClickable && onStepClick(step)}
                disabled={!isClickable}
                className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 ${
                  status === 'current'
                    ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700'
                    : status === 'completed'
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100'
                    : 'bg-gray-50 border border-gray-200 text-gray-500'
                } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className="flex-shrink-0 mr-3">
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === 'current' ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {stepLabels[step]}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Step {index + 1} of {steps.length}
                  </div>
                </div>
                {isClickable && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            );
          })}
        </nav>

        {userType && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <div className="text-sm font-medium text-blue-800">
              User Type: {userType === 'broker' ? 'Broker' : 'Borrower'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
