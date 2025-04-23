<div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white shadow-lg max-w-md mx-auto">
  <img src={check} alt="Success" className="w-20 h-20 text-green-500" />
  <p className="text-4xl font-bold text-gray-800">Rs. {data.total_amount || "0"}</p>
  <p className="text-2xl font-semibold text-green-600">Payment Successful</p>
</div>