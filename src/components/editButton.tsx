
import React from "react";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";


export function EditButton() {

    return (
        <Button  variant={'secondary'} size={'sm'} className="rounded-[5px]  hover:bg-gray-200 hover:text-gray-500">
            <PenLine className="size-[14px]" />
        </Button>
    )
}