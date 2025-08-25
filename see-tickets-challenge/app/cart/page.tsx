"use client";

import Nav from "@/ui/components/nav";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const title = searchParams.get("title");
	const price = searchParams.get("price");
	const image = searchParams.get("image");
	const category = searchParams.get("category");

	if (!id) {
		return <p>Your basket is empty.</p>;
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
      <Nav />
			<h1 className="text-2xl font-bold mb-6">Your Basket</h1>
			<div className="flex gap-6 border rounded-lg p-4 shadow">
				<Image src={image ?? ""} alt={title ?? ""} width={120} height={120} className="object-contain" />
				<div>
					<h2 className="font-semibold text-lg">{title}</h2>
					<p className="text-gray-600 capitalize">{category}</p>
					<p className="font-bold mt-2">£{price}</p>
				</div>
			</div>
		</div>
	);
}