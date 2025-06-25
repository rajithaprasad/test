
import { lazy } from 'react';

// Dynamically import all broker info sections
const BrokerInfoSection0 = lazy(() => import('./BrokerInfoSection0'));
const BrokerInfoSection1 = lazy(() => import('./BrokerInfoSection1'));
const BrokerInfoSection2 = lazy(() => import('./BrokerInfoSection2'));
const BrokerInfoSection3 = lazy(() => import('./BrokerInfoSection3'));
const BrokerInfoSection4 = lazy(() => import('./BrokerInfoSection4'));
const BrokerInfoSection5 = lazy(() => import('./BrokerInfoSection5'));
const BrokerInfoSection6 = lazy(() => import('./BrokerInfoSection6'));
const BrokerInfoSection7 = lazy(() => import('./BrokerInfoSection7'));
const BrokerInfoSection8 = lazy(() => import('./BrokerInfoSection8'));
const BrokerInfoSection9 = lazy(() => import('./BrokerInfoSection9'));

export const brokerInfoComponents = {
  0: BrokerInfoSection0,
  1: BrokerInfoSection1,
  2: BrokerInfoSection2,
  3: BrokerInfoSection3,
  4: BrokerInfoSection4,
  5: BrokerInfoSection5,
  6: BrokerInfoSection6,
  7: BrokerInfoSection7,
  8: BrokerInfoSection8,
  9: BrokerInfoSection9,
};
