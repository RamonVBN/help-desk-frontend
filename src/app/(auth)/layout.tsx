import Image from "next/image";
import "../globals.css";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-full bg-[url(/image.png)] bg-top-left bg-no-repeat bg-cover absolute">

            <div className="w-full h-screen md:max-w-[42.5rem] lg:max-w-[60%] 2xl:max-w-[50%] md:flex md:flex-col xl:items-center  md:ml-auto px-6 pt-8 md:px-[8.75rem] md:py-[3rem] bg-gray-600 rounded-t-[20px] mt-8">
                
                <header className="flex gap-4 justify-center items-center mb-6 md:mb-8">
                    <Image width={40} height={40} src={'/logo.svg'} alt="" />
                    <h1 className="text-2xl font-bold leading-[140%] text-blue-800 ">HelpDesk</h1>
                </header>

                <div className="flex flex-col gap-3 xl:w-[65%]">
                    {children}
                </div>

            </div>
        </div>
    );
}
