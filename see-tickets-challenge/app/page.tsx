import ProductCard from "@/ui/components/productCard";
import Nav from "../ui/components/nav";

export default async function Page() {
	const data = await fetch("https://fakestoreapi.com/products");
	const posts = await data.json();
	console.log(posts, "posts");

	return (
		<div className="font-sans min-h-screen gap-16">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Nav />
				<div className="flex px-6 py-1 w-full">
					{posts.map((post) => (
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
