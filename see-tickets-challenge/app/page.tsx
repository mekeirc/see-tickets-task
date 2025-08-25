"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/ui/components/productCard";
import Nav from "../ui/components/nav";

type Product = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: {
		rate: number;
		count: number;
	};
	title: string;
};

type SortOption = "default" | "priceLowHigh" | "priceHighLow" | "ratingHighLow" | "titleAZ";

export default function Page() {
	const [posts, setPosts] = useState<Product[]>([]);
	const [filtered, setFiltered] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortOption, setSortOption] = useState<SortOption>("default");

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("https://fakestoreapi.com/products");
			const data: Product[] = await res.json();
			setPosts(data);
			setFiltered(data);

			const uniqueCats = Array.from(new Set(data.map((p) => p.category)));
			setCategories(uniqueCats);
		};
		fetchData();
	}, []);

	useEffect(() => {
		let result = [...posts];

		if (selectedCategory !== "all") {
			result = result.filter((p) => p.category === selectedCategory);
		}

		if (searchTerm.trim() !== "") {
			result = result.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		switch (sortOption) {
			case "priceLowHigh":
				result.sort((a, b) => a.price - b.price);
				break;
			case "priceHighLow":
				result.sort((a, b) => b.price - a.price);
				break;
			case "ratingHighLow":
				result.sort((a, b) => b.rating.rate - a.rating.rate);
				break;
			case "titleAZ":
				result.sort((a, b) => a.title.localeCompare(b.title));
				break;
			default:
				break;
		}

		setFiltered(result);
	}, [posts, selectedCategory, searchTerm, sortOption]);

	return (
		<div className="font-sans min-h-screen gap-16">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
				<Nav />
				<div className="flex flex-wrap items-center gap-4 px-6 w-full justify-center">
					<label className="flex flex-col">
						<span className="pb-1 font-bold">Search</span>
						<input
							type="text"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
					<label className="flex flex-col">
						<span className="pb-1 font-bold">Filter Category</span>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="all">All Categories</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</label>
					<label className="flex flex-col">
						<span className="pb-1 font-bold">Sort</span>
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value as SortOption)}
							className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="default">Sort by</option>
							<option value="priceLowHigh">Price: Low → High</option>
							<option value="priceHighLow">Price: High → Low</option>
							<option value="ratingHighLow">Rating: High → Low</option>
							<option value="titleAZ">Title: A → Z</option>
						</select>
					</label>
				</div>
				<div className="flex px-6 py-4 w-full flex-wrap gap-4 justify-center">
					{filtered.map((post) => (
						<ProductCard
							key={post.id}
							category={post.category}
							description={post.description}
							id={post.id}
							image={post.image}
							price={post.price}
							rating={post.rating}
							title={post.title}
						/>
					))}
					{filtered.length === 0 && (
						<div className="flex flex-col items-center">
							<p className="text-xl text-gray-700">No products match your current filters.</p>
							<button
								className="bg-blue-500 text-white rounded px-6 py-2 mt-3 cursor-pointer"
								onClick={() => setSearchTerm("")}
							>
								Reset Filters
							</button>
						</div>
					)}
					{posts.length === 0 && (
						<div className="absolute top-0 left-0 bg-white w-full h-screen flex items-center justify-center loading-spinner">
							<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<g>
										<linearGradient x1="0%" y1="50%" x2="50%" y2="52.936%" id="a">
											<stop className="spinner-color" offset="99.99%" />
											<stop className="spinner-base" offset="100%" />
										</linearGradient>
									</g>
								</defs>
								<g fill="none" fillRule="evenodd">
									<circle
										className="spingrad"
										fill="url(#a)"
										cx="25"
										cy="25"
										r="25"
										x="0"
										y="0"
									></circle>
									<circle fill="url(#b)" cx="25" cy="25" r="22" />
									<circle fill="#fff" cx="25" cy="25" r="20" />
								</g>
							</svg>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
