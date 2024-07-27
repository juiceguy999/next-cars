import CarSearchForm from "@/components/CarSearchForm"
import GoogleIcon from "@/components/icons/GoogleIcon"

const Hero = () => {
  return (
    <section className="bg-black py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          NextCars
        </h1>
        <p className="my-4 text-base md:text-xl leading-8 text-white">
          Personal full-stack project for selling cars, <br /> built on Next.js & MongoDB and using Google OAuth + NextAuth
        </p>
      </div>
      <CarSearchForm />
    </div>
  </section>
  )
}

export default Hero