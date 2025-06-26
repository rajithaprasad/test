import React from "react";
import { ArrowLeft, Check, User, UserCheck, Mail, Phone } from "lucide-react";
import { FormData } from "../../../types/form";
import ProgressIndicator from "../../ProgressIndicator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface BorrowerInfoSection0Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onPrevious: () => void;
  onSubmit?: () => void;
}

const BorrowerInfoSection6 = ({
  formData,
  updateFormData,
  onPrevious,
  onSubmit,
}: BorrowerInfoSection0Props) => {
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Show loading alert
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we submit your application.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      try {
        const response = await fetch(
          "https://deeppink-giraffe-799003.hostingersite.com/backend/end_point.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.text();
        console.log(result);
  
        // Close loading alert and show success alert
        Swal.close();
        Swal.fire({
          title: "Success!",
          text: "Your application has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/"); // Navigate after clicking OK
          }
        });
      } catch (error) {
        console.error("Error:", error);
  
        // Close loading alert and show error alert
        Swal.close();
        Swal.fire({
          title: "Error!",
          text: "There was an error submitting your application.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

  const handleHomeClick = () => {
    localStorage.removeItem("userType");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <ProgressIndicator
        currentStep={5}
        totalSteps={5}
        progress={100}
        onHomeClick={handleHomeClick}
      />

      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Borrower Information
        </h2>
        <p className="text-lg text-gray-600">Tell us about yourself</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Borrower Details - Section 0</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input relative">
              <input
                type="text"
                id="borrowerFirstName"
                value={formData.borrowerFirstName || ''}
                onChange={(e) => updateFormData({ borrowerFirstName: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                placeholder=" "
                required
              />
              <label htmlFor="borrowerFirstName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                First Name *
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input relative">
              <input
                type="text"
                id="borrowerLastName"
                value={formData.borrowerLastName || ''}
                onChange={(e) => updateFormData({ borrowerLastName: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                placeholder=" "
                required
              />
              <label htmlFor="borrowerLastName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Last Name *
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input relative">
              <input
                type="email"
                id="borrowerEmail"
                value={formData.borrowerEmail || ''}
                onChange={(e) => updateFormData({ borrowerEmail: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                placeholder=" "
                required
              />
              <label htmlFor="borrowerEmail" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Email Address *
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input relative">
              <input
                type="tel"
                id="borrowerPhoneNumber"
                value={formData.borrowerPhoneNumber || ''}
                onChange={(e) => updateFormData({ borrowerPhoneNumber: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
                placeholder=" "
                required
              />
              <label htmlFor="borrowerPhoneNumber" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Phone Number *
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="flex items-center px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous
        </button>

        <button
          type="submit"
          className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Submit Application
          <Check className="ml-2 w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default BorrowerInfoSection6;
