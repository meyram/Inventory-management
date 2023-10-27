import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const AddProduct = () => {
	const [product, setProduct] = useState({
		name: "",
		manufacturer: "",
		stock: 0,
		description: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleAddProduct = () => {
		axios
			.post("http://127.0.0.1:5000/api/product", product)
			.then((response) => {
				console.log("Product added successfully:", response.data);
				// Reset form or perform other actions as needed
			})
			.catch((error) => {
				console.error("Error adding product:", error);
			});
	};

	return (
		<div className="add-product">
			<h3>Add Product</h3>
			<form>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={product.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Manufacturer:</label>
					<input
						type="text"
						name="manufacturer"
						value={product.manufacturer}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Stock:</label>
					<input
						type="number"
						name="stock"
						value={product.stock}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Description:</label>
					<input
						type="text"
						name="description"
						value={product.description}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<button type="button" onClick={handleAddProduct}>
						Add Product
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
