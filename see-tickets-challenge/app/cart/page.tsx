"use client";

import Nav from "@/ui/components/nav";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart } = useCart();
	const router = useRouter();

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

	const handleCheckout = () => {
		sessionStorage.setItem("purchasedItems", JSON.stringify(cart));
		router.push("/success");
	};

	return (
		<div className="w-full mx-auto bg-gray-100 h-screen items-baseline">
			<Nav />
			<div className="flex flex-col gap-4 p-6">
				<h1 className="text-2xl font-bold">Your Basket</h1>
				<Link href="/" className="inline-flex gap-1 text-blue-500">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
						<path
							fill="#139DF4"
							d="m6.921 12.5 5.792 5.792L12 19l-7-7 7-7 .713.708L6.921 11.5H19v1H6.921Z"
						/>
					</svg>
					Back
				</Link>
				{cart.map((item) => (
					<div
						key={item.id}
						className="flex gap-6 border border-gray-300 rounded-lg p-4 items-center bg-white w-full"
					>
						<div className="image-container small flex align-center justify-center">
							<Image
								src={item.image}
								alt={item.title}
								width={120}
								height={120}
								className="object-contain"
							/>
						</div>
						<div className="flex-1">
							<h2 className="font-semibold text-lg">{item.title}</h2>
							<p className="text-gray-600 capitalize">{item.category}</p>
							<p className="font-bold mt-2">£{item.price}</p>
							<div className="flex items-center gap-2 mt-2">
								<button
									onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
									className="border border-gray-300 rounded cursor-pointer cart-button flex items-center justify-center"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M6 12.5V11.5H18V12.5H6Z" fill="#1F1F1F" />
									</svg>
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									className="border border-gray-300 rounded cursor-pointer cart-button flex items-center justify-center"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.5 12.5H6V11.5H11.5V6H12.5V11.5H18V12.5H12.5V18H11.5V12.5Z"
											fill="#1F1F1F"
										/>
									</svg>
								</button>
								<button
									onClick={() => removeFromCart(item.id)}
									className="ms-3 border border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 rounded cursor-pointer flex items-center justify-center cart-button"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7.6155 20C7.15517 20 6.77083 19.8459 6.4625 19.5375C6.15417 19.2292 6 18.8449 6 18.3845V6.00002H5V5.00002H9V4.23077H15V5.00002H19V6.00002H18V18.3845C18 18.8449 17.8458 19.2292 17.5375 19.5375C17.2292 19.8459 16.8448 20 16.3845 20H7.6155ZM9.80775 17H10.8078V8.00002H9.80775V17ZM13.1923 17H14.1923V8.00002H13.1923V17Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
				<div className="text-right font-bold text-2xl">Total: £{total.toFixed(2)}</div>
				<button
					onClick={handleCheckout}
					className="mt-4 w-full w-lg-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow"
				>
					Checkout
				</button>
			</div>
		</div>
	);
}
