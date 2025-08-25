import Image from "next/image";

export default function ProductCard({
	category,
	description,
	id,
	image,
	price,
	rating,
	title,
}: {
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
}) {
	return (
		<div
            className="max-w-sm rounded overflow-hidden shadow-md p-5 border border-gray-200 flex flex-col align-center items-baseline justify-between" 
            key={id}
        >
			<div className="image-container flex align-center justify-center mx-auto mb-6">
                <Image
                    src={image}
                    alt="Product Image"
                    width={200}
                    height={200}
                    className="self-center"
                />
            </div>
            <h2 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-2xl dark:text-white">
				{title}
			</h2>
			<p className="flex-1 w-full overflow-hidden description">{description}</p>
			<p className="font-bold text-xl mt-4 mb-1">&pound;{price}</p>
			<p>
				{rating.rate} / 5 <small className="text-gray-500">({rating.count} ratings)</small>
			</p>
            <div className="rounded-full bg-gray-100 text-blue-600 inline-flex px-3 capitalize mt-3">{category}</div>
		</div>
	);
}
