import { cookies } from "next/headers";
import { AppLayoutHeader } from "@/components/layouts/appLayoutHeader";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token?.value) {
        return redirect("/sign-in")
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 bg-top-left flex flex-col lg:flex-row">

            <AppLayoutHeader/>

            <div className="pt-3 xl:w-[calc(100vw_-_15.625rem)] lg:w-[calc(100vw_-_12.5rem)] h-[calc(100vh_-_5.75rem)] lg:h-screen">
                <main className=" flex w-full min-h-full lg:h-full bg-gray-600 rounded-t-[20px] pt-[1.75rem] px-6 pb-6 lg:pt-[3.25rem] lg:px-12 lg:pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
