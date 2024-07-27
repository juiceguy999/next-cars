import Link from "next/link"

const InfoBox = ({
  heading,
  backgroundColor = 'bg-darkGray',
  textColor='text-white',
  linkPath,
  linkText,
  linkColor,
  linkBackground,
  children
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg flex flex-col gap-4 justify-between`}>
      <h2 className={`${textColor} text-2xl font-bold tracking-wider`}>{ heading }</h2>
      <p className={`${textColor}`}>
        {children}
      </p>
      <Link
        href={linkPath}
        className={`${linkBackground} ${linkColor} inline-block font-semibold text-sm rounded-md px-4 py-2 self-start`}
      >
        {linkText}
      </Link>
    </div>
  )
}

export default InfoBox