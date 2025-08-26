
import { cn } from "@/utils/cn"
import { AvailableHourTag } from "./availableHourTag"


interface TableHoursAvailableProps {
    
    hoursList: string[]
    limit: number
    className: string
}

export function TableCellHoursAvailable({hoursList, limit, className}: TableHoursAvailableProps){

    return (

        <div className={cn(['flex gap-1', className])}>
           { hoursList.map((hour, i) => {

                if (i + 1 <= limit) {
                    
                    return (
                        <AvailableHourTag key={i}>{hour}</AvailableHourTag>
                    )
                } else if(hoursList.length === i + 1) {
                    
                    return(
                        <AvailableHourTag key={i}>+{hoursList.length - limit}</AvailableHourTag>
                    )
                
                }   
            })}
        </div>
    )
}