import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onUpdateProduct }) => {
	const [updatedProduct, setUpdatedProduct] = useState({
		_id: product._id,
		name: "",
		manufacturer: "",
		stock: 0,
		description: "",
	});

	useEffect(() => {
		setUpdatedProduct({
			_id: product._id,
			name: product.name,
			manufacturer: product.manufacturer,
			stock: product.stock,
			description: product.description,
		});
	}, [product]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedProduct({ ...updatedProduct, [name]: value });
	};

	const handleUpdateProduct = () => {
		console.log(updatedProduct, "product here");
		axios
			.put(`http://127.0.0.1:5000/api/product`, {
				...updatedProduct,
				productID: updatedProduct._id,
			})
			.then((response) => {
				console.log("Product updated successfully:", response.data);
				onUpdateProduct(response.data); // Notify parent component of the update
			})
			.catch((error) => {
				console.error("Error updating product:", error);
			});
	};

	return (
		<div className="update-product">
			<h3>Update Product</h3>
			<form>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={updatedProduct.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Manufacturer:</label>
					<input
						type="text"
						name="manufacturer"
						value={updatedProduct.manufacturer}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Stock:</label>
					<input
						type="number"
						name="stock"
						value={updatedProduct.stock}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Description:</label>
					<input
						type="text"
						name="description"
						value={updatedProduct.description}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<button type="button" onClick={handleUpdateProduct}>
						Update Product
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateProduct;
