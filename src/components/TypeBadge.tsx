import { getTypeColour } from "../utils/typeColors";

type TypeBadgeProps = {
    type: string
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const { bg, text } = getTypeColour(type)

  return (
    <span className={`${bg} ${text} text-xs font-semibold px-2 py-0.5 rounded-full capitalize`}>
        {type}
    </span>
  )
}

export default TypeBadge