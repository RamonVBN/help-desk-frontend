import { useState } from "react"
import { ProfileDialog } from "./profileDialog"
import { PasswordDialog } from "./passwordDialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { ArrowLeft, CircleUser } from "lucide-react"
import { DropdownMenuItem } from "../ui/dropdown-menu"


export function UserDialog() {

    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)

    const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false)

    function handleChangeNewPasswordModal() {

        setIsNewPasswordModalOpen((prevState) => !prevState)
    }

    function handleCloseUserDialog(){
        setIsUserDialogOpen(false)
    }

    return (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex gap-2 text-gray-500 w-[9.875rem] hover:bg-gray-200 cursor-pointer">
                    <CircleUser className=" size-5 text-gray-500" />
                    <span className="text-base leading-[140%]">Perfil</span>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent aria-describedby="Atualize as informações do seu perfil." className="p-0 gap-0" onCloseAutoFocus={() => setIsNewPasswordModalOpen(false)}>

                <DialogHeader className="py-5 px-7">
                    <DialogTitle className="mr-auto flex gap-2 items-center">
                        {
                            isNewPasswordModalOpen ? (
                                <>
                                    <Button variant={'ghost'} onClick={() => handleChangeNewPasswordModal()}>
                                        <ArrowLeft data-icon="arrow-left" className="size-[1.125rem]" />
                                    </Button>
                                    Alterar senha
                                </>
                            ) :
                                'Perfil'
                        }
                        <DialogDescription className="sr-only">Atualize as informações do seu perfil.</DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                {
                    !isNewPasswordModalOpen ? (
                        <ProfileDialog closeUserDialog={handleCloseUserDialog} changeNewPasswordModal={handleChangeNewPasswordModal} />
                    )
                        :
                        <PasswordDialog closeUserDialog={handleCloseUserDialog} />
                }
            </DialogContent>
        </Dialog>
    )
}