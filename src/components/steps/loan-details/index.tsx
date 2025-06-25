
import { lazy } from 'react';

// Dynamically import all loan details sections
const LoanDetailsSection0 = lazy(() => import('./LoanDetailsSection0'));
const LoanDetailsSection1 = lazy(() => import('./LoanDetailsSection1'));
const LoanDetailsSection2 = lazy(() => import('./LoanDetailsSection2'));
const LoanDetailsSection3 = lazy(() => import('./LoanDetailsSection3'));
const LoanDetailsSection4 = lazy(() => import('./LoanDetailsSection4'));
const LoanDetailsSection5 = lazy(() => import('./LoanDetailsSection5'));
const LoanDetailsSection6 = lazy(() => import('./LoanDetailsSection6'));
const LoanDetailsSection7 = lazy(() => import('./LoanDetailsSection7'));
const LoanDetailsSection8 = lazy(() => import('./LoanDetailsSection8'));
const LoanDetailsSection9 = lazy(() => import('./LoanDetailsSection9'));

export const loanDetailsComponents = {
  0: LoanDetailsSection0,
  1: LoanDetailsSection1,
  2: LoanDetailsSection2,
  3: LoanDetailsSection3,
  4: LoanDetailsSection4,
  5: LoanDetailsSection5,
  6: LoanDetailsSection6,
  7: LoanDetailsSection7,
  8: LoanDetailsSection8,
  9: LoanDetailsSection9,
};
