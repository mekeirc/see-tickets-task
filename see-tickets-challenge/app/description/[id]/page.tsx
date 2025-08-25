import { notFound } from "next/navigation";
import Nav from "@/ui/components/nav";
import Image from "next/image";
import Link from "next/link";
import AddToBasketButton from "@/ui/components/addToBasketButton";

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

export default async function ProductDescriptionPage({ params }: { params: { id: string } }) {
	const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
	if (!res.ok) { return notFound(); }
	const product: Product = await res.json();

	return (
		<div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
			<Nav />
			<div className="px-6 w-full">
				<Link href="/" className="inline-flex gap-1 mb-4 text-blue-500">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#139DF4" d="m6.921 12.5 5.792 5.792L12 19l-7-7 7-7 .713.708L6.921 11.5H19v1H6.921Z"/></svg>
					Back
				</Link>
				<h1 className="text-xl font-bold mb-4">{product.title}</h1>
				<Image
					src={product.image}
					alt={product.title}
					className="mb-6 w-64 h-64 object-contain"
					width={200}
					height={200}
				/>
				<p className="mb-4">{product.description}</p>
				<p className="text-xl font-semibold mb-2">£{product.price}</p>
				<AddToBasketButton product={product} />
				<p className="my-3">
					Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
				</p>
				<p className="rounded-full bg-gray-100 text-blue-600 inline-flex px-3 capitalize mt-3">
					{product.category}
				</p>
			</div>
		</div>
	);
}
