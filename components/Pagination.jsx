import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

const Pagination = ({page, pageSize, totalItems, onPageChange}) => {

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if(newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  }

  return (
    <section className="container mx-auto flex justify-center items-center gap-4">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="group px-2 py-1 text-light bg-grayish/50 rounded-md disabled:bg-dark">
        <ArrowLeftIcon className="w-6 h-6 stroke-orange group-disabled:stroke-silverGray" />
      </button>
      <div className="basis-16 text-center"><span className="text-light">{page} / {totalPages}</span></div>
      <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="group px-2 py-1 flex items-center text-light bg-grayish/50 rounded-md disabled:bg-dark">
        <ArrowRightIcon className="w-6 h-6 stroke-orange group-disabled:stroke-silverGray" />
      </button>
    </section>
  )
}

export default Pagination