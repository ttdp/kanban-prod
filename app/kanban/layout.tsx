import { Metadata } from "next"
import NavBar from "@/app/board/components/NarBar"

export const metadata: Metadata = {
    title: 'Kanban',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}
