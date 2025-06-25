
import { Home } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  onHomeClick?: () => void;
}

const ProgressIndicator = ({ currentStep, totalSteps, progress, onHomeClick }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              title="Change user type"
            >
              <Home className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Step {currentStep}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{totalSteps}</span>
          </div>
        </div>
        <div className="text-sm font-medium text-emerald-600">
          {Math.round(progress)}% Complete
        </div>
      </div>
      <div className="relative">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index < currentStep
                  ? 'bg-emerald-500'
                  : index === currentStep - 1
                  ? 'bg-emerald-400 scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
