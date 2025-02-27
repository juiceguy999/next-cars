import CarAddForm from "@/components/CarAddForm"

const CarAddPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-5xl md:pt-16 pb-0 md:pb-8">
        <div
          className="bg-dark text-light px-4 py-6 md:px-6 md:py-8 md:rounded-xl md:shadow-none shadow-orangeInset"
        >
          <CarAddForm />
        </div>
      </div>
    </section>
  )
}

export default CarAddPage