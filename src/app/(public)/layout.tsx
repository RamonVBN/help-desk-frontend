import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen bg-[url(/image.png)] bg-top-left bg-no-repeat bg-cover absolute flex">

            <div className="w-full  md:max-w-[42.5rem] 2xl:max-w-[50%] md:flex md:flex-col xl:items-center md:ml-auto px-6 pt-8 md:px-[8.75rem] md:py-[3rem] bg-gray-600 rounded-t-[20px] mt-8">
                
                <header className="flex gap-4 justify-center items-center mb-6 md:mb-8">
                    <Image width={40} height={40} src={'/logo.svg'} alt="" />
                    <span className="text-2xl font-bold leading-[140%] text-blue-800 ">HelpDesk</span>
                </header>

                <main className="flex flex-col gap-3 xl:w-[25rem]">
                    {children}
                </main>

            </div>
        </div>
    );
}
