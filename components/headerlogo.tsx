import Link from "next/link"
import Image from "next/image"

export const HeaderLogo = () => {
    return(
        <Link href='/'>
            <div className="items-center flex">
                <Image src='/logo.svg' alt="Logo" height={28} width={28}/>
                <p className="font-semibold text-white lg:text-2xl ml-2.5">
                    Financio
                </p>
            </div>
        </Link>
    )
}