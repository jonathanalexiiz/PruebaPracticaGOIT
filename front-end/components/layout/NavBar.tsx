import Link from "next/link";

export default function Navbar(){
    return(
        <nav>
            <Link href={""}>Inicio</Link>
            <Link href={""}>About</Link>
        </nav>
    );
}