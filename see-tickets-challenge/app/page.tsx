import ProductCard from "@/ui/components/productCard";
import Nav from "../ui/components/nav";

export default async function Page() {
	const data = await fetch("https://fakestoreapi.com/products");
	const posts = await data.json();

	
	return (
		<div className="font-sans min-h-screen gap-16">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Nav />
				<div className="flex px-6 py-1 w-full flex-wrap gap-4 justify-center align-center">
					{posts.map((post: {
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
					}) => (
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
				</div>
			</main>
		</div>
	);
}
