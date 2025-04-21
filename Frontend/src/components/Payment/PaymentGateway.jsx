import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

const PaymentGateway = () => {
  const location = useLocation();
  
  // Safely extract the total amount from location state with a fallback
  const initialTotal = location.state?.total || "10"; // Default to "10" if no total provided

  const [formData, setFormData] = useState({
    amount: initialTotal,
    tax_amount: "0",
    total_amount: initialTotal,
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/success",
    failure_url: "http://localhost:5173/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
  });

  // Generate signature function
  const generateSignature = (data) => {
    const secret = "8gBm/:&EnhH.1/q"; // Consider moving this to environment variables
    const hashString = `total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  // Update signature whenever relevant fields change
  useEffect(() => {
    const signature = generateSignature(formData);
    setFormData(prev => ({ ...prev, signature }));
  }, [formData.total_amount, formData.transaction_uuid, formData.product_code]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      amount: value,
      total_amount: value
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="space-y-4"
      >
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">First name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Last name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="w-full p-2 border rounded"
            autoComplete="off"
            value={formData.amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="tax_amount" value={formData.tax_amount} />
        <input type="hidden" name="total_amount" value={formData.total_amount} />
        <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
        <input type="hidden" name="product_code" value={formData.product_code} />
        <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
        <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
        <input type="hidden" name="success_url" value={formData.success_url} />
        <input type="hidden" name="failure_url" value={formData.failure_url} />
        <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
        <input type="hidden" name="signature" value={formData.signature} />

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Pay via E-Sewa
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;






