"use client";

import Nav from "@/ui/components/nav";
import Image from "next/image";
import { useEffect, useState } from "react";

type PurchasedItem = {
	id: number;
	title: string;
	price: number;
	image: string;
	category: string;
	quantity: number;
};

export default function SuccessPage() {
	const [items, setItems] = useState<PurchasedItem[]>([]);

	useEffect(() => {
		const stored = sessionStorage.getItem("purchasedItems");
		if (stored) setItems(JSON.parse(stored));
	}, []);

	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="w-full mx-auto bg-gray-100 h-screen ">
			<Nav />
            <div className="p-4">
                <h1 className="text-2xl font-bold text-green-600">Thank you for your purchase!</h1>
                <p className="mt-2">Summary of your order:</p>
            </div>
			<div className="px-4">
				{items.map((item) => (
					<div key={item.id} className="flex gap-6 border border-gray-300 rounded-lg p-4 mb-4 items-center bg-white">
						<div className="image-container small flex align-center justify-center">
                            <Image src={item.image} alt={item.title} width={120} height={120} className="object-contain" />
						</div>
                        <div>
							<h2 className="font-semibold text-lg">{item.title}</h2>
							<p className="text-gray-600 capitalize">{item.category}</p>
							<p className="font-bold mt-2">
								£{item.price} × {item.quantity}
							</p>
						</div>
					</div>
				))}
				<div className="text-right font-bold text-xl mt-4">Total Paid: £{total.toFixed(2)}</div>
			</div>
		</div>
	);
}
