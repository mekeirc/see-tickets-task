"use client";

import Nav from "@/ui/components/nav";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart } = useCart();

	if (cart.length === 0) {
		return (
			<div className="w-full mx-auto">
				<Nav />
				<div className="p-6">
					<h1 className="text-2xl font-bold mb-6">Your Basket</h1>
					<p>Your basket is empty.</p>
				</div>
			</div>
		);
	}

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="w-full mx-auto bg-gray-100 h-screen">
			<Nav />

			<div className="flex flex-col gap-4 p-6">
				<h1 className="text-2xl font-bold">Your Basket</h1>
				{cart.map((item) => (
					<div key={item.id} className="flex gap-6 border border-gray-300 rounded-lg p-4 items-center bg-white">
						<div className="image-container flex align-center justify-center">
							<Image src={item.image} alt={item.title} width={120} height={120} className="object-contain" />
						</div>
						<div className="flex-1">
							<h2 className="font-semibold text-lg">{item.title}</h2>
							<p className="text-gray-600 capitalize">{item.category}</p>
							<p className="font-bold mt-2">£{item.price}</p>
							<div className="flex items-center gap-2 mt-2">
								<button
									onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
									className="px-2 py-1 border rounded"
								>
									-
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									className="px-2 py-1 border rounded"
								>
									+
								</button>
							</div>

							<button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm mt-2">
								Remove
							</button>
						</div>
					</div>
				))}
				<div className="mt-6 text-right font-bold text-xl">Total: £{total.toFixed(2)}</div>
			</div>
		</div>
	);
}
