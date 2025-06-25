
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Briefcase, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);

  
  const selectUserType = (type: 'broker' | 'borrower') => {
    localStorage.setItem('userType', type);
    setUserType(type);
    navigate('/application');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">BRRRR Insights</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Start Your Quote</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select whether you're a broker or borrower to begin the quote process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Broker Card */}
          <div 
            className="bg-white rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-green-100 shadow-md hover:scale-105"
            onClick={() => selectUserType('broker')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Broker</h3>
              <p className="text-gray-600 text-center">
                Get quotes for your clients and manage multiple deals in one place.
              </p>
            </div>
          </div>

          {/* Borrower Card */}
          <div 
            className="bg-white rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-green-100 shadow-md hover:scale-105"
            onClick={() => selectUserType('borrower')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Borrower</h3>
              <p className="text-gray-600 text-center">
                Get personalized loan options for your investment property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
