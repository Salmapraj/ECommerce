

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Pages/Title";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
	const navigate= useNavigate()
	const {
		products,
		currency,
		cartItems,
		getTotalCartAmount,
		addToCart,
		removeFromCart,delivery_fee
	} = useContext(ShopContext);
	const [cartData, setCartData] = useState([]);
	const shippingFee = 10;

	useEffect(() => {
		const tempData = [];
		Object.keys(cartItems).forEach((itemId) => {
			if (cartItems[itemId] > 0) {
				const product = products.find((p) => p.id.toString() === itemId);
				if (product) {
					tempData.push({
						id: itemId,
						quantity: cartItems[itemId],
						product: {
							...product,
							img: getImageUrl(product.img),
						},
					});
				}
			}
		});
		setCartData(tempData);
	}, [cartItems, products]);

	const getImageUrl = (imagePath) => {
		if (!imagePath) return "/default-product.jpg";
		if (imagePath.startsWith("http")) return imagePath;
		return `http://localhost:8000${imagePath}`;
	};

	return (
		<div className="border-t pt-14 max-w-6xl mx-auto px-4">
			<div className="text-2xl mb-8">
				<Title text1={"Your"} text2={"CART"} />
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="flex-1">
					{cartData.length > 0 ? (
						cartData.map((item) => (
							<div key={item.id} className="border-b py-6 flex flex-col sm:flex-row gap-6">
								<div className="w-32 h-32 flex-shrink-0 bg-gray-100">
									<img
										src={item.product.img}
										alt={item.product.name}
										className="w-full h-full object-contain"
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = "/default-product.jpg";
										}}
									/>
								</div>

								<div className="flex-1">
									<h3 className="text-lg font-medium uppercase">{item.product.name}</h3>
									<p className="text-gray-800 mt-2">
										{currency} {item.product.price} {item.product.size || ""}
									</p>
									<div className="flex items-center gap-4 mt-4">
										<span className="text-lg font-medium">Qty:</span>
										<div className="flex items-center gap-4">
											<button onClick={() => removeFromCart(item.id)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg">-</button>
											<span className="text-lg font-medium">{item.quantity}</span>
											<button onClick={() => addToCart(item.id)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg">+</button>
											<button onClick={() => removeFromCart(item.id, item.quantity)} className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-red-600">🗑️ Delete</button>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center">
							<p className="text-gray-500 text-[30px] font-bold">Your cart is empty</p>
							<Link to="/collection">
								<button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 mt-4">
									Continue Shopping
								</button>
							</Link>
						</div>
					)}
				</div>

				{cartData.length > 0 && (
					<div className="lg:w-80 bg-gray-50 p-6 h-fit">
						<h3 className="text-xl font-bold mb-4">CART TOTALS</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>{currency} {getTotalCartAmount().toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping Fee</span>
								<span>{currency} {delivery_fee.toFixed(2)}</span>
							</div>
							<div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
								<span>Total</span>
								<span>{currency} {(getTotalCartAmount() + delivery_fee).toFixed(2)}</span>
							</div>
						</div>

						<Link to="/paymentGateway" state={{
							cartItems: cartData,
							total: (getTotalCartAmount() + delivery_fee).toFixed(2),
							currency
						}}>
							<button onClick={()=>navigate("/paymentGateway",{state:{getTotalCartAmount:getTotalCartAmount}})} 
							className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors">
								PROCEED TO CHECKOUT
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
