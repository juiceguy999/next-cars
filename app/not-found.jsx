import SadIcon from '@/components/icons/SadIcon'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <section className="flex-grow">
      <div className="container m-auto max-w-4xl">
        <div className="px-6 py-24 mb-4 text-center">
          <SadIcon className='w-36 h-36 mx-auto fill-orange' />
          <h1 className="text-2xl md:text-3xl text-orange font-semibold mt-4 mb-4">Sorry, but we can't find the page you're looking for</h1>
          <p className="text-grayish text-base md:text-xl font-medium mb-10">
            Please make sure that the address is correct and try again 
          </p>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  )
}

export default NotFoundPage