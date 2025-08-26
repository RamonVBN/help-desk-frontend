'use client'

import { ArrowLeft, BriefcaseBusiness, ClipboardList, LogOut, Menu, Plus, Trash, Upload, Users, Wrench } from "lucide-react";
import Image from "next/image";

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar";

import { UserDialog } from "@/components/userModal";
import { NavLink } from "@/components/navLink";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser, User } from "@/api/getUser";
import { useMediaQuery } from "usehooks-ts"


export function AppLayoutHeader() {

    const isSm = useMediaQuery("(min-width: 640px)")

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    const { data: user, isLoading } = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    const { mutate: logOut } = useMutation({
        mutationFn: () => api.delete('/sessions'),
        onSuccess: () => {
            router.replace('/sign-in')
        }
    })

    function closeNavMenu() {
        setIsNavMenuOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsNavMenuOpen(false);
    }
  };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className=" xl:w-[15.625rem] lg:w-[12.5rem] flex lg:flex-col justify-between">

            <div className="flex gap-4 lg:px-5 lg:py-6 p-6 items-center ">
                <Button className="lg:hidden hover:bg-gray-300/50" variant={"icon"} size={'icon'} onClick={() => setIsNavMenuOpen(true)}>
                    <Menu strokeWidth={3} size={20} />
                </Button>

                <div className="flex gap-3 lg:items-start">
                    <Image width={44} height={44} src={'/logo.svg'} alt="" />
                    <div className="flex flex-col">
                        <span className="font-bold text-xl leading-[140%] text-gray-600">HelpDesk</span>


                        <span className="font-bold text-[10px] leading-[140%] tracking-[6%] text-blue-200">
                            {
                                user?.role === 'ADMIN' && (
                                    'ADMIN'
                                )
                            }

                            {
                                user?.role === 'TECHNICIAN' && (
                                    'TÉCNICO'
                                )
                            }

                            {
                                user?.role === 'CLIENT' && (
                                    'CLIENTE'
                                )
                            }
                        </span>
                    </div>
                </div>
            </div>

            <Separator className="hidden lg:block bg-gray-200" />

            <nav ref={menuRef} className={`h-full w-3/4 sm:w-1/2 lg:w-full px-4 py-5 absolute top-0 z-50 bg-gray-200 lg:block lg:static lg:bg-transparent transition-transform  ${isNavMenuOpen ? 'transform-[translateX(0%)]' : 'transform-[translateX(-100%)]'} lg:transform-[translateX(0%)]`}>
                <div className=" text-gray-600 mb-5 lg:hidden">
                    <Button variant={'ghost'} onClick={() => setIsNavMenuOpen(false)}>
                        <ArrowLeft />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="font-bold text-[10px] leading-[140%] tracking-[%6] text-gray-400 ml-4 lg:hidden">MENU</span>
                    <div className="flex flex-col gap-1.5">

                        {
                            user ? (

                                <>
                                    <NavLink name={user.role === 'ADMIN' ? 'Chamados' : 'Meus chamados'} closeNavMenu={closeNavMenu} href={'/calleds'}>
                                        <ClipboardList size={20} />
                                    </NavLink>
                                    {
                                        user.role === 'ADMIN' && (
                                            <>
                                                <NavLink name="Técnicos" closeNavMenu={closeNavMenu} href="/technicians">
                                                    <Users size={20} />
                                                </NavLink>
                                                <NavLink name="Clientes" closeNavMenu={closeNavMenu} href="/clients">
                                                    <BriefcaseBusiness size={20} />
                                                </NavLink>
                                                <NavLink name="Serviços" closeNavMenu={closeNavMenu} href="/services">
                                                    <Wrench size={20} />
                                                </NavLink>
                                            </>
                                        )
                                    }
                                    {
                                        user.role == 'CLIENT' && (
                                            <NavLink name="Criar chamado" closeNavMenu={closeNavMenu} href="/calleds/new">
                                                <Plus size={20} />
                                            </NavLink>
                                        )
                                    }
                                </>
                            ) :
                                <>
                                    <div className="w-full px-3 py-4 rounded-[5px] h-[2.75rem] bg-gray-200 animate-pulse" />
                                    <div className="w-full px-3 py-4 rounded-[5px] h-[2.75rem] bg-gray-200 animate-pulse" />
                                    <div className="w-full px-3 py-4 rounded-[5px] h-[2.75rem] bg-gray-200 animate-pulse" />
                                    <div className="w-full px-3 py-4 rounded-[5px] h-[2.75rem] bg-gray-200 animate-pulse" />
                                </>

                        }
                    </div>
                </div>

            </nav>

            <Separator className="hidden lg:block bg-gray-200" />

            <DropdownMenu
                modal>
                <DropdownMenuTrigger asChild>
                    <div className={`flex gap-3 p-4 items-center  transition-colors ${user ? 'lg:hover:bg-gray-200 cursor-pointer' : 'pointer-events-none cursor-not-allowed'}`}>
                        <Avatar username={user?.name} imageUrl={user?.imageUrl} className="w-10 h-10 text-[14px]" />
                        <div className="lg:flex lg:flex-col hidden ">
                            {
                                user ? (
                                    <>
                                        <span className="text-[14px] leading-[140%] text-gray-600 truncate max-w-[9.375rem]">{user.name}</span>
                                        <span className="text-xs leading-[140%] text-gray-400 truncate max-w-[9.375rem]">{user.email}</span>
                                    </>
                                ) :
                                    <div className="flex flex-col gap-1">
                                        <span className=" bg-gray-200 animate-pulse h-[15px] w-[9.375rem] rounded-[6px]" />
                                        <span className="bg-gray-200 animate-pulse h-[10px] w-[9.375rem] rounded-[6px]" />
                                    </div>
                            }
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={isSm ? 8 : 0} collisionPadding={8} side={isSm ? 'right' : 'bottom'} className="bg-gray-100 px-5 py-4 flex flex-col gap-4 border border-gray-200" >
                    <DropdownMenuLabel className="font-bold text-gray-400 text-[10px] leading-[140%] tracking-[6%]">OPÇÕES</DropdownMenuLabel>
                    <div>

                        <UserDialog />

                        <DropdownMenuItem onClick={() => logOut()} className="flex gap-2 text-red-300 w-[9.875rem] hover:bg-gray-200 cursor-pointer">
                            <LogOut className=" size-5 text-red-300" />
                            <span className="text-base leading-[140%]">Sair</span>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

        </header>
    )
}