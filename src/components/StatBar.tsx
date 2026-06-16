type StatBarProps = {
    name: string
    value: number
}

const MAX_STAT = 255

const StatBar = ({ name, value }: StatBarProps) => {
    const percentage = Math.min((value / MAX_STAT) * 100, 100)

    return (
    <li className="text-xl font-semibold capitalize grid grid-cols-2 gap-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {name.split('-').filter(Boolean).join(' ')} :
        </p> 
        <div className="flex items-center gap-4">
            <div className="w-full h-2.5 border border-zinc-200 dark:border-zinc-600 rounded overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                <div 
                    className="h-full bg-red-500 dark:bg-red-400 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{value}</p>
        </div>
    </li>
    )
}

export default StatBar