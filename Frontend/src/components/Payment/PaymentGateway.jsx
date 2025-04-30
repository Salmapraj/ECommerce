



import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

const PaymentGateway = () => {
  const location = useLocation();
  const initialTotal = location.state?.total || "10";

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

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    paymentMethod: "esewa",
  });

  const generateSignature = (data) => {
    const secret = "8gBm/:&EnhH.1/q";
    const hashString = `total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const signature = generateSignature(formData);
    setFormData((prev) => ({ ...prev, signature }));
  }, [formData.total_amount, formData.transaction_uuid, formData.product_code]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      amount: value,
      total_amount: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 gap-8 ">
      {/* Checkout Form */}
      <form
        action={userDetails.paymentMethod === "esewa"
          ? "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          : "#"}
        method="POST"
        className="flex-1 space-y-4 border border-gray-300 p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-8 text-gray-700 text-center">Checkout</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded "
              value={userDetails.firstName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded border-gray-300"
              value={userDetails.lastName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mobile No</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userDetails.mobile}
            onChange={(e) =>
              setUserDetails({ ...userDetails, mobile: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <select
            className="w-full p-2 border rounded"
            value={userDetails.paymentMethod}
            onChange={(e) =>
              setUserDetails({ ...userDetails, paymentMethod: e.target.value })
            }
          >
            <option value="esewa">eSewa</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="w-full p-2 border rounded"
            value={formData.amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        {/* Hidden Fields for eSewa */}
        {userDetails.paymentMethod === "esewa" && (
          <>
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
          </>
        )}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-600 transition"
        >
          {userDetails.paymentMethod === "esewa"
            ? "Pay via eSewa"
            : "Place Order (COD)"}
        </button>
      </form>

      
<div className="mt-10" >
  <h2 className="text-xl font-bold mb-4">Your Products</h2>
  <div className="space-y-4 flex flex-col gap-6  justify-between align-center">
    {location.state?.cartItems?.map((item, idx) => (
      <div key={idx} className="border p-4 rounded shadow-sm flex gap-4 items-center">
        <img
          src={item.product.img}
          alt={item.product.name}
          className="w-20 h-20 object-contain bg-gray-100"
        />
        <div>
          <h3 className="font-semibold text-lg">{item.product.name}</h3>
          <p className="text-sm text-gray-500">Category: {item.product.category || 'N/A'}</p>
          <p>Qty: {item.quantity}</p>
          <p className="text-sm font-medium">{location.state.currency} {item.product.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default PaymentGateway;
