//  import React from 'react'
 
//  function Success() {
//    return (
//      <div>Sucess</div>
//    )
//  }
 
//  export default 
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// const Success = () => {
//   const [search] = useSearchParams();
//   const dataQuery = search.get("data");
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const resData = atob(dataQuery);
//     const resObject = JSON.parse(resData);
//     console.log(resObject);

//     setData(resObject);
//   }, [search]);

//   return (
//     <div className="payment-container">
//       <img src="src/check.png" alt="" />
//       <p className="price">Rs. {data.total_amount}</p>
//       <p className="status">Payment Successful</p>
//     </div>
//   );
// };

// export default Success;
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Correct import

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
    <div className="payment-container">
      <img src="src/check.png" alt="" />
      <p className="price">Rs. {data.total_amount || "0"}</p>
      <p className="status">Payment Successful</p>
    </div>
  );
};

export default Success;