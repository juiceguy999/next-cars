'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/components/icons/SearchIcon";

const CarSearchForm = () => {

  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = `?search=${search}&brand=${brand}`;
    router.push(`/cars/search${query}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 mx-auto max-w-2xl w-full flex flex-col gap-4 md:flex-row items-center">
      <div className="w-full md:w-3/5">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Enter keywords or choose brand"
          className="w-full px-4 py-3 border border-borderGray rounded-lg bg-dark text-light placeholder:text-silverGray focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 flex gap-4 items-center">
        <div className="flex-grow">
          <label htmlFor="brand" className="sr-only">Car Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} id="brand" className="w-full px-4 py-3 border border-borderGray rounded-lg bg-dark text-light focus:outline-none">
            <option value="All">All</option>
            <option value="Ford">Ford</option>
            <option value="Mercedes">Mercedes</option>
            <option value="BMW">BMW</option>
            <option value="Audi">Audi</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Porsche">Porsche</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Volvo">Volvo</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Nissan">Nissan</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Kia">Kia</option>
            <option value="Jeep">Jeep</option>
            <option value="Lexus">Lexus</option>
            <option value="Opel">Opel</option>
            <option value="Renault">Renault</option>
            <option value="Mazda">Mazda</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Mitsubushi">Mitsubushi</option>
            <option value="Dodge">Dodge</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Bentley">Bentley</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Lada">Lada</option>
            <option value="Skoda">Skoda</option>
            <option value="Subaru">Subaru</option>
            <option value="McLaren">McLaren</option>
            <option value="Bugatti">Bugatti</option>
          </select>
        </div>
        <button type="submit" className="w-16 h-12 hover:bg-backgroundGray transition-all flex items-center justify-center gap-2 rounded-lg bg-darkGray border-borderGray border">
          <SearchIcon className="w-6 h-6 stroke-light"/>
        </button>
      </div>
    </form>
  )
}

export default CarSearchForm