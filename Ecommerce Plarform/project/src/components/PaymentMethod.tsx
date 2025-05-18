import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Phone, Shield } from 'lucide-react';
import axios from 'axios';

interface PaymentMethodProps {
  amount: number;
  orderId: string;
  onSuccess: (transactionId: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ amount, orderId, onSuccess }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await axios.get('/api/payments/country');
        setCountry(response.data.country);
      } catch (error) {
        console.error('Error detecting country:', error);
      } finally {
        setLoading(false);
      }
    };

    detectCountry();
  }, []);

  const handlePayment = async () => {
    try {
      setError(null);
      let response;

      switch (selectedMethod) {
        case '2checkout':
          // Initialize 2Checkout payment
          response = await axios.post('/api/payments/2checkout/init', {
            amount,
            orderId,
            // Add other required fields
          });
          break;

        case 'easypaisa':
          response = await axios.post('/api/payments/easypaisa/init', {
            amount,
            orderId,
            phoneNumber
          });
          break;

        case 'jazzcash':
          response = await axios.post('/api/payments/jazzcash/init', {
            amount,
            orderId,
            phoneNumber
          });
          break;

        default:
          throw new Error('Please select a payment method');
      }

      if (response?.data.success) {
        onSuccess(response.data.transactionId);
        navigate('/payment/confirmation');
      }
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {country !== 'PK' && (
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedMethod === '2checkout'
                ? 'border-indigo-500 bg-indigo-50'
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('2checkout')}
          >
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium">Credit/Debit Card or PayPal</h3>
                <p className="text-sm text-gray-500">International payments via 2Checkout</p>
              </div>
            </div>
          </div>
        )}

        {country === 'PK' && (
          <>
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'easypaisa'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('easypaisa')}
            >
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-medium">Easypaisa</h3>
                  <p className="text-sm text-gray-500">Pay using your Easypaisa account</p>
                </div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'jazzcash'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('jazzcash')}
            >
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="font-medium">JazzCash</h3>
                  <p className="text-sm text-gray-500">Pay using your JazzCash account</p>
                </div>
              </div>
            </div>
          </>
        )}

        {(selectedMethod === 'easypaisa' || selectedMethod === 'jazzcash') && (
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="03XX-XXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Pay {country === 'PK' ? `PKR ${amount}` : `$${amount}`}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <Shield className="h-4 w-4 mr-2" />
          Secure payment powered by {selectedMethod === '2checkout' ? '2Checkout' : selectedMethod}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;