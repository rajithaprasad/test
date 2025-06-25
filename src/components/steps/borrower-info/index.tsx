
import { lazy } from 'react';

// Dynamically import all borrower info sections
const BorrowerInfoSection0 = lazy(() => import('./BorrowerInfoSection0'));
const BorrowerInfoSection1 = lazy(() => import('./BorrowerInfoSection1'));
const BorrowerInfoSection2 = lazy(() => import('./BorrowerInfoSection2'));
const BorrowerInfoSection3 = lazy(() => import('./BorrowerInfoSection3'));
const BorrowerInfoSection4 = lazy(() => import('./BorrowerInfoSection4'));
const BorrowerInfoSection5 = lazy(() => import('./BorrowerInfoSection5'));
const BorrowerInfoSection6 = lazy(() => import('./BorrowerInfoSection6'));
const BorrowerInfoSection7 = lazy(() => import('./BorrowerInfoSection7'));
const BorrowerInfoSection8 = lazy(() => import('./BorrowerInfoSection8'));
const BorrowerInfoSection9 = lazy(() => import('./BorrowerInfoSection9'));

export const borrowerInfoComponents = {
  0: BorrowerInfoSection0,
  1: BorrowerInfoSection1,
  2: BorrowerInfoSection2,
  3: BorrowerInfoSection3,
  4: BorrowerInfoSection4,
  5: BorrowerInfoSection5,
  6: BorrowerInfoSection6,
  7: BorrowerInfoSection7,
  8: BorrowerInfoSection8,
  9: BorrowerInfoSection9,
};
