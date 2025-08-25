"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

export default function AddToBasketButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    setAdded(true);

    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`w-full text-white font-semibold px-6 py-2 my-2 rounded shadow cursor-pointer ${
        added
          ? "bg-green-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {added ? "Product Added" : "Add to Basket"}
    </button>
  );
}
