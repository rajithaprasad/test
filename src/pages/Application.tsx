import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData, Step, determineSectionId } from '../types/form';
import Sidebar from '../components/Sidebar';
import DealIntroStep from '../components/steps/DealIntroStep';
import { guarantorComponents } from '../components/steps/guarantor-info';
import { loanDetailsComponents } from '../components/steps/loan-details';
import { additionalLoanDetailsComponents } from '../components/steps/additional-loan-details';
import { brokerInfoComponents } from '../components/steps/broker-info';
import { borrowerInfoComponents } from '../components/steps/borrower-info';

const Application = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: '',
    loanProduct: '',
    loanPurpose: '',
    propertyType: '',
    warrantable: false,
    propertyUse: '',
    monthsOfRentalHistory: '',
    rehabAmountCompleted: '',
    constructionAmountCompleted: '',
    reasonForBridge: '',
    mortgagePayoff: '',
    mortgagePayoffDate: '',
    scopeOfWork: '',
    additionalDetail: '',
    planOnCompletion: '',
    closingDate: '',
    tearDown: false,
    underContract: false,
    planToRepay: '', // Add this property
    vacant: false, // Add this property
    // Include any other properties required by FormData
  });

  const userType = localStorage.getItem('userType') as 'broker' | 'borrower';
  const [currentSectionId, setCurrentSectionId] = useState<number>(0);

  const getSteps = (): Step[] => {
    const baseSteps: Step[] = ['deal-intro', 'guarantor-info', 'loan-details', 'additional-loan-details'];
    return [...baseSteps, userType === 'broker' ? 'broker-info' : 'borrower-info'];
  };

  const [steps] = useState<Step[]>(getSteps());
  const [currentStep, setCurrentStep] = useState<Step>('deal-intro');

  useEffect(() => {
    if (!userType) {
      navigate('/');
    }
  }, [userType, navigate]);

  useEffect(() => {
   
    if (formData.loanProduct && formData.loanPurpose) {
      if (formData.loanProduct === 'DSCR') {
        if (formData.propertyUse) {
          const sectionId = determineSectionId(formData.loanProduct, formData.loanPurpose, formData.propertyUse);
          console.log('Setting section ID to:', sectionId);
          setCurrentSectionId(sectionId);
        }
      } else {
        const sectionId = determineSectionId(formData.loanProduct, formData.loanPurpose, '');
        console.log('Setting section ID to:', sectionId);
        setCurrentSectionId(sectionId);
      }
    }
  }, [formData.loanProduct, formData.loanPurpose, formData.propertyUse]);

  const updateFormData = (updates: Partial<FormData>) => {
  
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
  
    alert('Application submitted successfully!');
    navigate('/');
  };

  const renderCurrentStep = () => {
   
    switch (currentStep) {
      case 'deal-intro':
        return (
          <DealIntroStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 'guarantor-info':
        const GuarantorComponent = guarantorComponents[currentSectionId as keyof typeof guarantorComponents];
        if (!GuarantorComponent) {
          console.error('No guarantor component found for section:', currentSectionId);
          return <div>Loading...</div>;
        }
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <GuarantorComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
            />
          </Suspense>
        );
      case 'loan-details':
        const LoanDetailsComponent = loanDetailsComponents[currentSectionId as keyof typeof loanDetailsComponents];
        if (!LoanDetailsComponent) {
          console.error('No loan details component found for section:', currentSectionId);
          return <div>Loading...</div>;
        }
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LoanDetailsComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
            />
          </Suspense>
        );
      case 'additional-loan-details':
        const AdditionalLoanDetailsComponent = additionalLoanDetailsComponents[currentSectionId as keyof typeof additionalLoanDetailsComponents];
        if (!AdditionalLoanDetailsComponent) {
          console.error('No additional loan details component found for section:', currentSectionId);
          return <div>Loading...</div>;
        }
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <AdditionalLoanDetailsComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
            />
          </Suspense>
        );
      case 'broker-info':
        const BrokerComponent = brokerInfoComponents[currentSectionId as keyof typeof brokerInfoComponents];
        if (!BrokerComponent) {
          console.error('No broker component found for section:', currentSectionId);
          return <div>Loading...</div>;
        }
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <BrokerComponent
              formData={formData}
              updateFormData={updateFormData}
              onPrevious={goToPreviousStep}
              onSubmit={handleSubmit}
            />
          </Suspense>
        );
      case 'borrower-info':
        const BorrowerComponent = borrowerInfoComponents[currentSectionId as keyof typeof borrowerInfoComponents];
        if (!BorrowerComponent) {
          console.error('No borrower component found for section:', currentSectionId);
          return <div>Loading...</div>;
        }
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <BorrowerComponent
              formData={formData}
              updateFormData={updateFormData}
              onPrevious={goToPreviousStep}
              onSubmit={handleSubmit}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  if (!userType) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Sidebar
              steps={steps}
              currentStep={currentStep}
              onStepClick={goToStep}
              userType={userType}
              currentSectionId={currentSectionId}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-blue-500/10 p-8">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
