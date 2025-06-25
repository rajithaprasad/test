
import { lazy } from 'react';

// Dynamically import all additional loan details sections
const AdditionalLoanDetailsSection0 = lazy(() => import('./AdditionalLoanDetailsSection0'));
const AdditionalLoanDetailsSection1 = lazy(() => import('./AdditionalLoanDetailsSection1'));
const AdditionalLoanDetailsSection2 = lazy(() => import('./AdditionalLoanDetailsSection2'));
const AdditionalLoanDetailsSection3 = lazy(() => import('./AdditionalLoanDetailsSection3'));
const AdditionalLoanDetailsSection4 = lazy(() => import('./AdditionalLoanDetailsSection4'));
const AdditionalLoanDetailsSection5 = lazy(() => import('./AdditionalLoanDetailsSection5'));
const AdditionalLoanDetailsSection6 = lazy(() => import('./AdditionalLoanDetailsSection6'));
const AdditionalLoanDetailsSection7 = lazy(() => import('./AdditionalLoanDetailsSection7'));
const AdditionalLoanDetailsSection8 = lazy(() => import('./AdditionalLoanDetailsSection8'));
const AdditionalLoanDetailsSection9 = lazy(() => import('./AdditionalLoanDetailsSection9'));

export const additionalLoanDetailsComponents = {
  0: AdditionalLoanDetailsSection0,
  1: AdditionalLoanDetailsSection1,
  2: AdditionalLoanDetailsSection2,
  3: AdditionalLoanDetailsSection3,
  4: AdditionalLoanDetailsSection4,
  5: AdditionalLoanDetailsSection5,
  6: AdditionalLoanDetailsSection6,
  7: AdditionalLoanDetailsSection7,
  8: AdditionalLoanDetailsSection8,
  9: AdditionalLoanDetailsSection9,
};
