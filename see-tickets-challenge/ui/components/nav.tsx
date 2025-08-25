import Image from "next/image";

export default function Nav() {
    return (
        <div className="flex">
            <Image
                src={"https://c.ststat.net/content/seeticketsv2/eventim/svgs/see-by-eventim-white-yellow.svg"}
                alt="Logo"
                width={250}
                height={50}
            />
        </div>
	);
}