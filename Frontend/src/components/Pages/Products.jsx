import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Products() {
	const [products, setProducts] = useState([]);

	const product = () => {};
	useEffect(() => {
		fetch("http://localhost:8000/products/")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// setProducts(data);
			});
	}, []);
	return <button onClick={product}>Products</button>;
}

export default Products;
