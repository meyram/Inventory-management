import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const SearchProduct = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = () => {
		axios
			.get(`http://127.0.0.1:5000/api/product/search?searchTerm=${searchTerm}`)
			.then((response) => {
				setSearchResults(response.data);
			})
			.catch((error) => {
				console.error("Error searching for products:", error);
			});
	};

	return (
		<div className="search-product">
			<h3>Search Product</h3>
			<div>
				<input
					type="text"
					placeholder="Search by name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="button" onClick={handleSearch}>
					Search
				</button>
			</div>
			<div>
				<h4>Search Results:</h4>
				<ul>
					{searchResults.map((item) => (
						<li key={item._id}>
							<strong>Name:</strong> {item.name}
							<br />
							<strong>Manufacturer:</strong> {item.manufacturer}
							<br />
							<strong>Stock:</strong> {item.stock}
							<br />
							<strong>Description:</strong> {item.description}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SearchProduct;
