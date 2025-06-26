import React from "react";
import { ArrowLeft, Check, User, UserCheck, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProgressIndicator from '../../ProgressIndicator';

const BrokerInfoSection5 = ({ formData, updateFormData, onPrevious }) => {
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
    // Assuming you have a navigation function to go to the home page
    // navigate("/");
  };

  useEffect(() => {
    const targetComp = parseFloat(formData.targetComp) || 0;
    const loanAmount = parseFloat(formData.loanAmount) || 0;

    if (!isNaN(targetComp) && !isNaN(loanAmount) && loanAmount > 0) {
      const brokerPoints = (targetComp / loanAmount) * 100;
      updateFormData({ brokerPoints: brokerPoints.toFixed(2) + ' %' });
    } else {
      updateFormData({ brokerPoints: '' });
    }
  }, [formData.targetComp, formData.loanAmount]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <ProgressIndicator
        currentStep={10}
        totalSteps={10}
        progress={100}
        onHomeClick={handleHomeClick}
      />
      <div id="brokerSection">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Broker Information
          </h2>
          <p className="text-lg text-gray-600">Tell us about your broker</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input">
              <input
                type="text"
                id="brokerFirstName"
                value={formData.brokerFirstName || ''}
                onChange={(e) => updateFormData({ brokerFirstName: e.target.value })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="brokerFirstName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                First Name
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input">
              <input
                type="text"
                id="brokerLastName"
                value={formData.brokerLastName || ''}
                onChange={(e) => updateFormData({ brokerLastName: e.target.value })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="brokerLastName" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Last Name
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input">
              <input
                type="email"
                id="brokerEmail"
                value={formData.brokerEmail || ''}
                onChange={(e) => updateFormData({ brokerEmail: e.target.value })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="brokerEmail" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Email
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div className="floating-input">
              <input
                type="tel"
                id="brokerPhoneNumber"
                value={formData.brokerPhoneNumber || ''}
                onChange={(e) => updateFormData({ brokerPhoneNumber: e.target.value })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="brokerPhoneNumber" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Phone Number
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="floating-input">
              <input
                type="text"
                id="loanAmount"
                value={formData.loanAmount || ''}
                placeholder=" "
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="loanAmount" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Loan Amount
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="floating-input">
              <input
                type="number"
                id="targetComp"
                value={formData.targetComp || ''}
                onChange={(e) => updateFormData({ targetComp: e.target.value })}
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="targetComp" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Target Compensation ($)
              </label>
            </div>
          </div>
          <div className="relative">
            <div className="floating-input">
              <input
                type="text"
                id="brokerPoints"
                value={formData.brokerPoints || ''}
                placeholder=" "
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-300 text-lg"
              />
              <label htmlFor="brokerPoints" className="absolute left-4 top-4 text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 -mt-2 text-sm">
                Broker Points (%)
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

export default BrokerInfoSection5;
