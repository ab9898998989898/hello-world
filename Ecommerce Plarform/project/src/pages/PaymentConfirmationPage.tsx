import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

const PaymentConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    const transactionId = new URLSearchParams(location.search).get('transactionId');
    
    if (transactionId) {
      // Poll for payment status
      const checkStatus = async () => {
        try {
          const response = await axios.get(`/api/payments/status/${transactionId}`);
          setTransaction(response.data);
          setStatus(response.data.status);
          
          if (response.data.status === 'pending') {
            setTimeout(checkStatus, 3000); // Poll every 3 seconds
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          setStatus('failed');
        }
      };
      
      checkStatus();
    }
  }, [location]);

  const StatusIcon = {
    success: CheckCircle,
    failed: XCircle,
    pending: Clock
  }[status];

  const statusMessages = {
    success: 'Payment Successful!',
    failed: 'Payment Failed',
    pending: 'Processing Payment...'
  };

  const statusDescriptions = {
    success: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
    failed: 'There was an error processing your payment. Please try again or contact support.',
    pending: 'Please wait while we process your payment. This may take a few moments.'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <StatusIcon
              className={`mx-auto h-12 w-12 ${
                status === 'success'
                  ? 'text-green-500'
                  : status === 'failed'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`}
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {statusMessages[status]}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {statusDescriptions[status]}
            </p>

            {transaction && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.transactionId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.currency === 'PKR' ? 'PKR ' : '$'}
                      {transaction.amount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.paymentMethod}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {status === 'success' && (
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  View Order
                </button>
              )}
              
              {status === 'failed' && (
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </button>
              )}
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;