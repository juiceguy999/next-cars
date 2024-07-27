import Image from "next/image"
import Link from "next/link";
import MessageIcon from "@/components/icons/MessageIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";

const CarSellerInfo = ({car, className=''}) => {
  return (
    <div className={`${className} text-light`}>
      <h3 className="hidden md:block text-3xl font-bold mb-6">Seller’s info</h3>

      <div className="p-4 pb-6 md:rounded-lg bg-dark">
        <div className="flex gap-2 items-center mb-4">
          <Image className="rounded-full" src={car.owner.image} width={48} height={48} alt="user" />
          <span className="font-semibold text-base">{car.seller.name}</span>
        </div>
        <ul className="mb-4">
          {car.seller.email && (<li className="flex gap-1 items-center">
            <MessageIcon className="flex-shrink-0 stroke-orange w-4 h-4" />
            <Link href={`mailto:${car.seller.email}`} className="text-orange opacity-95 text-sm md:text-base"
              >{car.seller.email}</Link>
          </li>)}
          {car.seller.phone && (<li className="flex gap-1 items-center mt-2">
            <PhoneIcon className="w-4 h-4 stroke-orange" />
            <Link href={`tel:${car.seller.phone}`} className="text-orange opacity-95 text-sm md:text-base"
              >{car.seller.phone}</Link>
          </li>)}
        </ul>
        <p className="text-sm">
          {car.description}
        </p>
      </div>
    </div>
  )
}

export default CarSellerInfo;