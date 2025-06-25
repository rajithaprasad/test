import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FormData } from "../../types/form";
import ProgressIndicator from "../ProgressIndicator";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

// Define the libraries as a const array of valid library names
const libraries: ("places")[] = ["places"];

interface DealIntroStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

const DealIntroStep = ({ formData, updateFormData, onNext }: DealIntroStepProps) => {
  const navigate = useNavigate();
  const [showUnitCount, setShowUnitCount] = useState(false);
  const [showWarrantable, setShowWarrantable] = useState(false);
  const [showPropertyUse, setShowPropertyUse] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      updateFormData({ propertyAddress: place.formatted_address || "" });
    }
  };

  useEffect(() => {
    if (formData.propertyType === "mfr5to10") {
      setShowUnitCount(true);
    } else {
      setShowUnitCount(false);
      updateFormData({ unitCount: undefined });
    }

    if (formData.propertyType === "condo") {
      setShowWarrantable(true);
    } else {
      setShowWarrantable(false);
      updateFormData({ warrantable: false });
    }
  }, [formData.propertyType]);

  useEffect(() => {
    if (formData.loanProduct === "DSCR") {
      setShowPropertyUse(true);
    } else {
      setShowPropertyUse(false);
      updateFormData({ propertyUse: "" });
    }
  }, [formData.loanProduct]);

  const handleHomeClick = () => {
    localStorage.removeItem("userType");
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.propertyAddress ||
      !formData.loanProduct ||
      !formData.loanPurpose ||
      !formData.propertyType
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.loanProduct === "DSCR" && !formData.propertyUse) {
      alert("Please select property use for DSCR loans");
      return;
    }

    if (formData.propertyType === "mfr5to10" && !formData.unitCount) {
      alert("Please enter unit count for 5-10 unit properties");
      return;
    }

    onNext();
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD5VkyVQcIKgLTfk7IwvPFnvVnQThKDMtY"
      libraries={libraries}
    >
      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        <ProgressIndicator
          currentStep={1}
          totalSteps={5}
          progress={20}
          onHomeClick={handleHomeClick}
        />

        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Deal Introduction
          </h2>
          <p className="text-lg text-gray-600">
            Let's start with the basics of your loan application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => updateFormData({ propertyAddress: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                placeholder=" "
                required
              />
            </Autocomplete>
            <label
              htmlFor="propertyAddress"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Property Address *
            </label>
          </div>

          <div className="floating-input relative">
            <select
              id="loanProduct"
              value={formData.loanProduct}
              onChange={(e) => updateFormData({ loanProduct: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
              required
            >
              <option value="">Select a loan product</option>
              <option value="DSCR">DSCR</option>
              <option value="Renovation">Renovation</option>
              <option value="Construction">Construction</option>
              <option value="Bridge">Bridge</option>
            </select>
            <label
              htmlFor="loanProduct"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Loan Product *
            </label>
            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="floating-input relative">
            <select
              id="loanPurpose"
              value={formData.loanPurpose}
              onChange={(e) => updateFormData({ loanPurpose: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
              required
            >
              <option value="">Select a loan purpose</option>
              <option value="Acquisition">Acquisition</option>
              <option value="Refinance">Refinance</option>
            </select>
            <label
              htmlFor="loanPurpose"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Loan Purpose *
            </label>
            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="floating-input relative">
            <select
              id="propertyType"
              value={formData.propertyType}
              onChange={(e) => updateFormData({ propertyType: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
              required
            >
              <option value="">Select a property type</option>
              <option value="SFR">Single-Family (SFR)</option>
              <option value="condo">Condo</option>
              <option value="mfr2to4">2-4 unit</option>
              <option value="mfr5to10">5-10 unit</option>
              <option value="mixedUse">Mixed Use</option>
            </select>
            <label
              htmlFor="propertyType"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Property Type *
            </label>
            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {showUnitCount && (
          <div className="floating-input relative">
            <input
              type="number"
              id="unitCount"
              value={formData.unitCount || ""}
              onChange={(e) =>
                updateFormData({ unitCount: parseInt(e.target.value) || 0 })
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              placeholder=" "
              min="5"
              max="10"
            />
            <label
              htmlFor="unitCount"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Unit Count *
            </label>
          </div>
        )}

        {showWarrantable && (
          <div className="flex items-center p-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-emerald-200 focus-within:border-emerald-500 transition-all duration-300">
            <input
              type="checkbox"
              id="warrantable"
              checked={formData.warrantable || false}
              onChange={(e) => updateFormData({ warrantable: e.target.checked })}
              className="w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <label
              htmlFor="warrantable"
              className="ml-3 text-lg text-gray-700 cursor-pointer"
            >
              Warrantable
            </label>
          </div>
        )}

        {showPropertyUse && (
          <div className="floating-input relative">
            <select
              id="propertyUse"
              value={formData.propertyUse}
              onChange={(e) => updateFormData({ propertyUse: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg appearance-none"
              required={formData.loanProduct === "DSCR"}
            >
              <option value="">Select property use</option>
              <option value="LTR">Long-Term Rental (LTR)</option>
              <option value="STR">Short-Term Rental (STR)</option>
            </select>
            <label
              htmlFor="propertyUse"
              className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm"
            >
              Property Use {formData.loanProduct === "DSCR" ? "*" : ""}
            </label>
            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        )}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Continue
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </form>
    </LoadScript>
  );
};

export default DealIntroStep;
