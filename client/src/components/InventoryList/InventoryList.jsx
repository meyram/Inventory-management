import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import UpdateProduct from "../UpdateProduct/UpdateProduct";

const InventoryList = () => {
	const [inventory, setInventory] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [updatingProduct, setUpdatingProduct] = useState(null);

	const refreshInventory = () => {
		setRefreshing(true);
		axios.get("http://127.0.0.1:5000/api/product").then((response) => {
			setInventory(response.data);
			setRefreshing(false);
		});
	};

	useEffect(() => {
		refreshInventory();
	}, []);

	const handleUpdateProduct = (updatedProduct) => {
		setUpdatingProduct(null);
		const updatedInventory = inventory.map((item) =>
			item._id === updatedProduct._id ? updatedProduct : item
		);
		setInventory(updatedInventory);
	};

	const handleDeleteProduct = (productId) => {
		axios
			.delete(`http://127.0.0.1:5000/api/product/${productId}`)
			.then((response) => {
				console.log("Product deleted successfully:", response.data);
				// Refresh the inventory list
				refreshInventory();
			})
			.catch((error) => {
				console.error("Error deleting product:", error);
			});
	};

	return (
		<div className="inventory-list">
			<h3>Inventory List</h3>
			<button
				className="primary-button"
				onClick={refreshInventory}
				disabled={refreshing}
			>
				Refresh
			</button>
			{refreshing && <span>Refreshing...</span>}
			<ul>
				{inventory.map((item) => (
					<li key={item._id}>
						<strong>Name:</strong> {item.name}
						<br />
						<strong>Manufacturer:</strong> {item.manufacturer}
						<br />
						<strong>Stock:</strong> {item.stock}
						<br />
						<strong>Description:</strong> {item.description}
						<br />
						<button
							className="danger-button"
							onClick={() => handleDeleteProduct(item._id)}
						>
							Delete
						</button>
						<button
							className="secondary-button"
							onClick={() => setUpdatingProduct(item)}
						>
							Update
						</button>
					</li>
				))}
			</ul>
			{updatingProduct && (
				<UpdateProduct
					product={updatingProduct}
					onUpdateProduct={handleUpdateProduct}
				/>
			)}
		</div>
	);
};

export default InventoryList;
