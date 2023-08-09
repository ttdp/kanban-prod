import { Metadata } from "next"
import NavBar from "@/app/board/components/NarBar"

export const metadata: Metadata = {
    title: 'Board',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    )
}
