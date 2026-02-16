import Link from "next/link";
import { ReactNode } from "react";

export const StyledLink = ({href, children} : {href: string, children: ReactNode}) => {
    return (
        <Link className="text-blue-600 font-semibold underline underline-offset-2 decoration-transparent hover:decoration-blue-700 hover:duration-250 hover:transition-colors transition-colors duration-250" href={href}>{children}</Link>
    )
}