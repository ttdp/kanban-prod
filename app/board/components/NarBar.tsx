import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
    return (
        <nav className="p-4 flex drop-shadow-xl bg-gray-500">
            <h1 className="">
                <Link href="/">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                </Link>
            </h1>
        </nav>
    );
}

export default NavBar;