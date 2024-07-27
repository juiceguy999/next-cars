import CarAddForm from "@/components/CarAddForm"

const CarAddPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-5xl md:pt-16 pb-0 md:pb-8">
        <div
          className="bg-dark text-light px-4 py-6 md:px-6 md:py-8 md:rounded-xl md:shadow-none shadow-[rgba(255,40,0,0.05)_0px_-23px_25px_0px_inset,rgba(255,40,0,0.04)_0px_-36px_30px_0px_inset,rgba(255,40,0,0.03)_0px_-79px_40px_0px_inset]"
        >
          <CarAddForm />
        </div>
      </div>
    </section>
  )
}

export default CarAddPage