import Link from "next/link"

const InfoBox = ({
  heading,
  backgroundColor = 'bg-darkGray',
  textColor='text-light',
  linkPath,
  linkText,
  linkColor,
  linkBackground,
  children
}) => {
  return (
    <div className={`${backgroundColor} p-6 md:rounded-lg flex flex-col gap-4 justify-between`}>
      <h2 className={`${textColor} text-2xl font-bold tracking-wide`}>{ heading }</h2>
      <p className={`text-light font-medium`}>
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