import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { X } from 'lucide-react'

type HoursSelectProps = {
  value: string[]
  onChange: (value: string[]) => void
}

export function HoursSelect({value, onChange}: HoursSelectProps) {

    const morningHours = ['7:00', '8:00', '9:00', '10:00', '11:00']
    const afternoonHours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    const nightHours = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

    return (
        <ToggleGroup.Root type="multiple" value={value} onValueChange={onChange}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-[0.625rem] leading-[140%] tracking-[6%] text-gray-400">
                        MANHÃ
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {
                            morningHours.map((hour, i) => {

                                return (
                                    <ToggleGroup.Item key={i} asChild value={hour}>
                                        <span className="group flex gap-1 p-1.5 px-3 rounded-full border border-gray-400
                                                    font-bold text-gray-200 text-xs leading-[140%] data-[state=on]:bg-blue-300 data-[state=on]:text-gray-600 data-[state=on]:border-transparent
                                                    data-[state=off]:hover:bg-gray-500 cursor-pointer">
                                            {hour}
                                            <X className="group-data-[state=off]:hidden" size={14} />
                                        </span>
                                    </ToggleGroup.Item>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-[0.625rem] leading-[140%] tracking-[6%] text-gray-400">
                        TARDE
                    </span>
                    <div className="flex flex-wrap gap-2">
                       {
                            afternoonHours.map((hour, i) => {

                                return (
                                    <ToggleGroup.Item key={i} asChild value={hour}>
                                        <span className="group flex gap-1 p-1.5 px-3 rounded-full border border-gray-400
                                                    font-bold text-gray-200 text-xs leading-[140%] data-[state=on]:bg-blue-300 data-[state=on]:text-gray-600 data-[state=on]:border-transparent
                                                    data-[state=off]:hover:bg-gray-500 cursor-pointer">
                                            {hour}
                                            <X className="group-data-[state=off]:hidden" size={14} />
                                        </span>
                                    </ToggleGroup.Item>
                                )
                            })
                        }
                        
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-bold text-[0.625rem] leading-[140%] tracking-[6%] text-gray-400">
                        NOITE
                    </span>
                    <div className="flex flex-wrap gap-2">
                         {
                            nightHours.map((hour, i) => {

                                return (
                                    <ToggleGroup.Item key={i} asChild value={hour}>
                                        <span className="group flex gap-1 p-1.5 px-3 rounded-full border border-gray-400
                                                    font-bold text-gray-200 text-xs leading-[140%] data-[state=on]:bg-blue-300 data-[state=on]:text-gray-600 data-[state=on]:border-transparent
                                                    data-[state=off]:hover:bg-gray-500 cursor-pointer">
                                            {hour}
                                            <X className="group-data-[state=off]:hidden" size={14} />
                                        </span>
                                    </ToggleGroup.Item>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </ToggleGroup.Root>
    )
}