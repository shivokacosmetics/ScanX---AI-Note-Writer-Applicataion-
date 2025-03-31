import React from 'react';

const PricingPanel = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Plans</h1>
      <p className="text-lg mb-8">Update your plan to upload multiple pdf to take notes</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700">Free</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold">$0</span>
              <span className="ml-2 text-gray-500">/per month</span>
            </div>
          </div>
          
          <button className="w-full bg-black text-white py-3 rounded-md font-medium mb-6">
            Get Started
          </button>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>5 PDF Upload</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited Notes Tacking</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Email Support</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Help Center access</span>
            </div>
          </div>
        </div>
        
        {/* Unlimited Plan */}
        <div className="border rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700">Unlimited</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold">$257</span>
              <span className="ml-2 text-gray-500">/one time</span>
            </div>
          </div>
          
          <button className="w-full bg-black text-white py-3 rounded-md font-medium mb-6">
            Get Started
          </button>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited PDF Upload</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Unlimited Notes Taking</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Email Support</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Help center access</span>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Priority Security</span>
            </div>
          </div>
          
          <button className="w-full bg-blue-200 text-black py-3 rounded-md font-medium mt-6">
            Goggle pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPanel;