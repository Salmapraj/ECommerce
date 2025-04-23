// export default Success;
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Correct import
import check from "./check.png"
const Success = () => {
  const [searchParams] = useSearchParams();
  const dataQuery = searchParams.get("data");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (dataQuery) {
        const resData = atob(dataQuery);
        const resObject = JSON.parse(resData);
        console.log(resObject);
        setData(resObject);
      } else {
        setError("No data parameter found in URL");
      }
    } catch (err) {
      console.error("Error parsing data:", err);
      setError("Failed to parse payment data");
    }
  }, [dataQuery]);

  if (error) {
    return (
      <div className="payment-container error">
        <p className="status">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-5">
    <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white shadow-lg max-w-md mx-auto">
  <img src={check} alt="Success" className="w-20 h-20 text-green-500" />
  <p className="text-4xl font-bold text-gray-800">Rs. {data.total_amount || "0"}</p>
  <p className="text-2xl font-semibold text-green-600">Payment Successful</p>
</div>
    </div>
  );
};

export default Success;