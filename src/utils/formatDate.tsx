import { format } from "date-fns";


export function formatDate(date: string){

    return format(date, 'dd/MM/yy HH:mm')
}