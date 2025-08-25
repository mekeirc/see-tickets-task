"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartButton() {
	const { cart } = useCart();
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<div className="flex px-6 py-3 relative">
			<Link
				className="cart flex rounded-full items-center justify-center bg-white relative"
				href="/cart"
				title="Cart"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none">
					<path
						fill="currentColor"
						d="M8.167 25.667a2.247 2.247 0 0 1-1.648-.686 2.247 2.247 0 0 1-.686-1.648c0-.641.229-1.19.686-1.648A2.247 2.247 0 0 1 8.167 21c.641 0 1.19.229 1.648.685.457.457.685 1.007.685 1.648 0 .642-.229 1.191-.685 1.648a2.247 2.247 0 0 1-1.648.686Zm11.666 0c-.641 0-1.19-.229-1.648-.686a2.247 2.247 0 0 1-.685-1.648c0-.641.229-1.19.685-1.648A2.247 2.247 0 0 1 19.833 21c.642 0 1.191.229 1.648.685.457.457.686 1.007.686 1.648 0 .642-.229 1.191-.686 1.648a2.247 2.247 0 0 1-1.648.686Zm-13.766-21h17.208c.447 0 .788.199 1.02.598.234.398.244.802.03 1.21l-4.142 7.467c-.214.389-.5.69-.86.904-.36.214-.754.32-1.181.32H9.45L8.167 17.5h14v2.333h-14c-.875 0-1.536-.384-1.984-1.152-.447-.768-.466-1.531-.058-2.29L7.7 13.534 3.5 4.667H1.167V2.333h3.791l1.109 2.334Z"
					/>
				</svg>

				{totalItems > 0 && (
					<span className="absolute -top-1 -right-1 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
						{totalItems}
					</span>
				)}
			</Link>
		</div>
	);
}