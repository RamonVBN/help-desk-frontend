
import React from "react";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";


export const EditButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
    return (
        <Button {...props} ref={ref} variant={'secondary'} size={'sm'} className="rounded-[5px]  hover:bg-gray-200 hover:text-gray-500">
            <PenLine className="size-[14px]" />
        </Button>
    );
});

EditButton.displayName = "EditButton";