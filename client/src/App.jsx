import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryList from "./components/InventoryList/InventoryList"; // Import your sub-components
import AddProduct from "./components/AddProduct/AddProduct";
import SearchProduct from "./components/SearchProduct/SearchProduct";

function App() {
	const [inventory, setInventory] = useState([]);
	const [selectedAction, setSelectedAction] = useState("list");

	useEffect(() => {
		// Fetch inventory data from your Express.js backend
		axios.get("http://127.0.0.1:5000/api/product").then((response) => {
			setInventory(response.data);
		});
	}, []);

	return (
		<div>
			<h2>Inventory Management System</h2>
			<div>
				<button onClick={() => setSelectedAction("list")}>
					List Inventory
				</button>
				<button onClick={() => setSelectedAction("add")}>Add Product</button>
				<button onClick={() => setSelectedAction("search")}>
					Search Product
				</button>
			</div>
			{selectedAction === "list" && <InventoryList inventory={inventory} />}{" "}
			{/* Conditionally render InventoryList */}
			{selectedAction === "add" && <AddProduct />}{" "}
			{/* Conditionally render AddProduct */}
			{selectedAction === "search" && <SearchProduct />}{" "}
			{/* Conditionally render SearchProduct */}
		</div>
	);
}

export default App;
