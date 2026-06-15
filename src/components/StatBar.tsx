type StatBarProps = {
    name: string
    value: number
}

const MAX_STAT = 255

const StatBar = ({ name, value }: StatBarProps) => {
    const percentage = Math.min((value / MAX_STAT) * 100, 100)

    return (
    <li className="text-xl font-semibold capitalize grid grid-cols-2 gap-4">
        <p className="text-sm">{name.split('-').filter(Boolean).join(' ')} : </p> 
        <div className="flex items-center gap-4">
            <div className={`w-[255px] h-2.5 border rounded overflow-hidden flex `}>
                <div 
                    className="h-full bg-black transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-xs font-medium">{value}</p>
        </div>
    </li>
    )
}

export default StatBar