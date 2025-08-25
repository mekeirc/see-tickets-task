import Image from "next/image";
import CartButton from "./cartButton";

export default function Nav() {
    return (
        <div className="flex bg-gray-100 px-6 py-1 w-full nav justify-between">
            <Image
                src={"https://c.ststat.net/content/seeticketsv2/eventim/svgs/see-by-eventim-white-yellow.svg"}
                alt="Logo"
                width={150}
                height={50}
            />
            <CartButton />
        </div>
	);
}