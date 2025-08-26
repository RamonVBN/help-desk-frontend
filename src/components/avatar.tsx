import { cn } from "@/utils/cn"
import Image from "next/image"


interface AvatarProps {
    username?: string
    imageUrl?: string
    className?: string
}

export function Avatar({ imageUrl, className, username }: AvatarProps) {


    function splitUsername(username: string) {

        if (username.split(' ').length > 1) {

            const splitedName = username.split(' ')

            const firstName = splitedName[0][0]
            const lastName = splitedName[splitedName.length - 1][0]

            const reducedName = firstName.toUpperCase() + lastName.toUpperCase()

            return reducedName

        } else {

            const splitedName = username.split('')

            const [first, second] = splitedName

            const reducedName = [first.toUpperCase(), second.toUpperCase()].join('')

            return reducedName
        }

    }

    if (imageUrl) {

        return (
            <div  className={cn(["rounded-full overflow-hidden relative", className])}>
                <Image fill src={imageUrl} alt="" className="w-full h-full object-cover object-center" />
            </div>
        )
    }

    if (username) {
         return (
        <div className={cn(["bg-blue-800 flex justify-center items-center rounded-full text-gray-600 overflow-hidden ", className])}>
            <span className="text-inherit leading-[120%] tracking-[6%]">{splitUsername(username)}
            </span>
        </div>
    )
    }

    return (
        <div className={cn(["bg-blue-800 flex justify-center items-center rounded-full text-gray-600 animate-pulse", className])}>
        </div>
    )

   
}