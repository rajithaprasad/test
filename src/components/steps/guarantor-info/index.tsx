
import { lazy } from 'react';

// Dynamically import all guarantor info sections
const GuarantorInfoSection0 = lazy(() => import('./GuarantorInfoSection0'));
const GuarantorInfoSection1 = lazy(() => import('./GuarantorInfoSection1'));
const GuarantorInfoSection2 = lazy(() => import('./GuarantorInfoSection2'));
const GuarantorInfoSection3 = lazy(() => import('./GuarantorInfoSection3'));
const GuarantorInfoSection4 = lazy(() => import('./GuarantorInfoSection4'));
const GuarantorInfoSection5 = lazy(() => import('./GuarantorInfoSection5'));
const GuarantorInfoSection6 = lazy(() => import('./GuarantorInfoSection6'));
const GuarantorInfoSection7 = lazy(() => import('./GuarantorInfoSection7'));
const GuarantorInfoSection8 = lazy(() => import('./GuarantorInfoSection8'));
const GuarantorInfoSection9 = lazy(() => import('./GuarantorInfoSection9'));

export const guarantorComponents = {
  0: GuarantorInfoSection0,
  1: GuarantorInfoSection1,
  2: GuarantorInfoSection2,
  3: GuarantorInfoSection3,
  4: GuarantorInfoSection4,
  5: GuarantorInfoSection5,
  6: GuarantorInfoSection6,
  7: GuarantorInfoSection7,
  8: GuarantorInfoSection8,
  9: GuarantorInfoSection9,
};
