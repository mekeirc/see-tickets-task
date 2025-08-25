"use client";

import { useRouter } from "next/navigation";

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

export default function AddToBasketButton({ product }: { product: Product }) {
	const router = useRouter();

	const handleAddToBasket = () => {
		// Pass product info to cart via query params
		const query = new URLSearchParams({
			id: product.id.toString(),
			title: product.title,
			price: product.price.toString(),
			image: product.image,
			category: product.category,
		}).toString();

		router.push(`/cart?${query}`);
	};

	return (
		<button
			onClick={handleAddToBasket}
			className="w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded cursor-pointer"
		>
			Add to Basket
		</button>
	);
}