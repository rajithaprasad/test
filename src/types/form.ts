export interface FormData {
  // Loan Introduction

  // Deal Introduction
  propertyAddress: string;
  loanProduct: string;
  loanPurpose: string;
  propertyType: string;
  unitCount?: number;
  warrantable: boolean;
  propertyUse: string;

  // Guarantor Information
  firstName?: string;
  lastName?: string;
  email?: string;
  creditScore?: number;
  phoneNumber?: string;
  liquidity?: number;
  day30Lates?: number;
  day60Lates?: number;
  day90Lates?: number;
  investmentPropertiesOwned?: number;
  citizenship?: string;

  // Loan Details
  rentIncome?: number;
  taxExpense?: number;
  insuranceExpense?: number;
  HOAFees?: number;
  propertyValue?: number;
  loanAmount?: number;
  NOI?: number;
  requestedLTV?: number;
  maxLTV?: number;

  // Broker Information
  brokerFirstName?: string;
  brokerLastName?: string;
  brokerEmail?: string;
  brokerPhoneNumber?: string;
  brokerCompany?: string;
  brokerLicense?: string;
  targetComp?: number;
  brokerPoints?: string;

  // Borrower Information
  borrowerFirstName?: string;
  borrowerLastName?: string;
  borrowerEmail?: string;
  borrowerPhoneNumber?: string;

  // Additional fields loan data field
  monthsOfRentalHistory: any;
  rehabAmountCompleted: string;
  constructionAmountCompleted: string;
  reasonForBridge: string;
  planToRepay: string;
  tearDown: boolean;
  scopeOfWork: string;
  planOnCompletion: string;
  vacant: boolean;
  underContract?: boolean;
  currentUse?: string;
  closingDate?: string;
  additionalDetail?: string;
  originalPurchasePrice?: string;
  originalPurchaseDate?: string;
  rehabAmount?: string;
  mortgagePayoff?: string;
  mortgagePayoffDate?: string;
  currentlyVacant?: boolean;
  totalSTRs?: number;
  sameMarketSTRs?: number;
  projectsCompleted?: number;
  licensesHeld?: string;
  rehabCost?: number;
  borrowerARV?: number;
  totalCostBasis?: number;
  marginOnImprovement?: number;
  requestedLTC?: number;
  requestedLTAIV?: number;
  maxLTAIV?: number;
  constructionBudget?: number;
  requestedLTARV?: number;
  maxLTARV?: number;
  netWorth?: number;
  comparable1?: string;
  comparable2?: string;
  comparable3?: string;
}

export type Step =
  | "deal-intro"
  | "guarantor-info"
  | "loan-details"
  | "additional-loan-details"
  | "broker-info"
  | "borrower-info";

export const determineSectionId = (
  loanProduct: string,
  loanPurpose: string,
  propertyUse: string
): number => {
  console.log("Determining section for:", {
    loanProduct,
    loanPurpose,
    propertyUse,
  });

  if (loanProduct === "DSCR") {
    if (loanPurpose === "Acquisition") {
      if (propertyUse === "LTR") {
        console.log("Selected section: 0 (DSCR - Acquisition - LTR)");
        return 0;
      } else if (propertyUse === "STR") {
        console.log("Selected section: 2 (DSCR - Acquisition - STR)");
        return 2;
      }
    } else if (loanPurpose === "Refinance") {
      if (propertyUse === "LTR") {
        console.log("Selected section: 1 (DSCR - Refinance - LTR)");
        return 1;
      } else if (propertyUse === "STR") {
        console.log("Selected section: 3 (DSCR - Refinance - STR)");
        return 3;
      }
    }
  } else if (loanProduct === "Renovation") {
    if (loanPurpose === "Acquisition") {
      console.log("Selected section: 4 (Renovation - Acquisition)");
      return 4;
    } else if (loanPurpose === "Refinance") {
      console.log("Selected section: 5 (Renovation - Refinance)");
      return 5;
    }
  } else if (loanProduct === "Construction") {
    if (loanPurpose === "Acquisition") {
      console.log("Selected section: 6 (Construction - Acquisition)");
      return 6;
    } else if (loanPurpose === "Refinance") {
      console.log("Selected section: 7 (Construction - Refinance)");
      return 7;
    }
  } else if (loanProduct === "Bridge") {
    if (loanPurpose === "Acquisition") {
      console.log("Selected section: 8 (Bridge - Acquisition)");
      return 8;
    } else if (loanPurpose === "Refinance") {
      console.log("Selected section: 9 (Bridge - Refinance)");
      return 9;
    }
  }

  console.log("Defaulting to section: 0");
  return 0;
};
