'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { fetchCar } from "@/utils/requests";
import Spinner from "@/components/Spinner";

const CarEditForm = () => {

  const {id} = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    name: '',
    description: '',
    brand: 'Ford',
    type: 'SUV',
    condition: 'New',
    fuel: 'Gas',
    transmission: 'Automatic',
    drive: 'FWD',
    color: 'Black',
    seats: '',
    price: '',
    year: '2012',
    mileage: '',
    capacity: '',
    power: '',
    features: [],
    rent: false,
    rates: {
      weekly: '',
      monthly: '',
      daily: ''
    },
    address: false,
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    },
    seller: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [mileageError, setMileageError] = useState('');
  const [capacityError, setCapacityError] = useState('');
  const [powerError, setPowerError] = useState('');
  const [ratesError, setRatesError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [sellerNameError, setSellerNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [loading, setLoading] = useState(true);

  // Initializing edit page by fetching data and ending loading
  useEffect(() => {
    (async () => {
      try {
        const carData = await fetchCar(id);
        
        // Check rates object for null and replace with empty string
        if(carData && carData.rates) {
          const defaultRates = {...carData.rates};
          for(const rate in defaultRates){
            if(defaultRates[rate] === null) {
              defaultRates[rate] = '';
            }
          }
          carData.rates = defaultRates;
        }

        // Check location object for null and replace with empty string
        if(carData && carData.location) {
          const defaultLocation = {...carData.location};
          for(const key in defaultLocation){
            if(defaultLocation[key] === null) {
              defaultLocation[key] = '';
            }
          }
          carData.location = defaultLocation;
        }

        setFields(carData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })()
  }, [])


  const handleChange = (e) => {
    const {name, value} = e.target;

    if(name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value
        }
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value
      }))
    }
  }

  const handleFeaturesChange = (e) => {
    const {value, checked} = e.target;

    const updatedFeatures = [...fields.features];

    if(checked) {
      updatedFeatures.push(value);
    } else {
      const index = updatedFeatures.indexOf(value);

      if(index !== -1) {
        updatedFeatures.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      features: updatedFeatures
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;


    if (!fields.name.trim()) {
      setNameError('Car name is required');
      isValid = false;
    } else if (fields.name.length < 4) {
      setNameError('Please provide a more specific name');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!fields.description.trim()) {
      setDescriptionError('Enter the car description');
      isValid = false;
    } else if (fields.description.length < 10) {
      setDescriptionError('Please provide more information about the car');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!fields.price) {
      setPriceError('Enter the car price');
      isValid = false;
    } else if (!/^\d{3,6}$/.test(fields.price)) {
      setPriceError('Enter a valid price');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (fields.mileage === '') {
      setMileageError('Enter the car mileage');
      isValid = false;
    } else if (!/^\d{1,6}$/.test(fields.mileage)) {
      setMileageError('Enter a valid mileage');
      isValid = false;
    } else {
      setMileageError('');
    }

    if (!fields.capacity) {
      setCapacityError('Enter the engine capacity');
      isValid = false;
    } else if (!/^\d{2,5}$/.test(fields.capacity)) {
      setCapacityError('Enter a valid capacity');
      isValid = false;
    } else {
      setCapacityError('');
    }

    if (!fields.power) {
      setPowerError('Enter the engine power');
      isValid = false;
    } else if (!/^\d{1,4}$/.test(fields.power)) {
      setPowerError('Enter a valid power');
      isValid = false;
    } else {
      setPowerError('');
    }


    if(fields.rent) {
      if (!fields.rates.weekly && !fields.rates.monthly && !fields.rates.daily) {
        setRatesError('At least one field is required');
        isValid = false;
      } else if (fields.rates.daily && !/^\d{1,5}$/.test(fields.rates.daily)) {
        setRatesError('Enter a valid price');
        isValid = false;
      } else if (fields.rates.weekly && !/^\d{1,5}$/.test(fields.rates.weekly)) {
        setRatesError('Enter a valid price');
        isValid = false;
      } else if (fields.rates.monthly && !/^\d{1,5}$/.test(fields.rates.monthly)) {
        setRatesError('Enter a valid price');
        isValid = false;
      } else {
        setRatesError('');
      }
    } else {
      setRatesError('');
    }


    if(fields.address) {
      if (!fields.location.street.trim()) {
        setStreetError('Street is required');
        isValid = false;
      } else {
        setStreetError('');
      }
  
      if (!fields.location.city.trim()) {
        setCityError('City is required');
        isValid = false;
      } else {
        setCityError('');
      }
  
      if (!fields.location.state.trim()) {
        setStateError('State is required');
        isValid = false;
      } else {
        setStateError('');
      }
  
      if (!fields.location.zipcode) {
        setZipcodeError('Zipcode is required');
        isValid = false;
      } else if (!/^\d{5}$/.test(fields.location.zipcode)) {
        setZipcodeError('Enter a valid zipcode');
        isValid = false;
      } else {
        setZipcodeError('');
      }
    } else {
      setStreetError('')
      setCityError('')
      setStateError('')
      setZipcodeError('')
    }

    if (!fields.seller.name.trim()) {
      setSellerNameError('Name is required');
      isValid = false;
    } else {
      setSellerNameError('');
    }

    if(fields.seller.email && !/\S+@\S+\.\S+/.test(fields.seller.email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (fields.seller.phone && !/^\d{4,15}$/.test(fields.seller.phone)) {
      setPhoneError('Phone number is invalid');
      isValid = false;
    } else {
      setPhoneError('');
    }


    if(!isValid) { return }

    const formData = new FormData(e.target);

    // Make sure checkbox values passed to FormData (mdn docs "checkbox")
    formData.append('rent', fields.rent);
    formData.append('address', fields.address);

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        router.replace(`/cars/${id}`);
      } else if (response.status === 401 || response.status === 403) {
        toast.error('Can\'t edit others\' cars')
      } else {
        toast.error('Something went wrong')
      }
      
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong')
    }

  }

  return loading ? (<Spinner loading={loading} />) : (
    <section>
      <div className="container m-auto max-w-5xl md:pt-16 pb-0 md:pb-8">
        <div
        className="bg-dark text-light px-4 py-6 md:px-6 md:py-8 md:rounded-xl md:shadow-none shadow-orangeInset"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl md:text-4xl font-bold md:text-center mb-6 bg-gradient-to-r from-[#f00] to-[#faff00] bg-clip-text text-transparent">
              Edit listing
            </h2>

            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <label className="block text-light font-bold mb-2">Car name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="focus:placeholder:text-orange focus:border-orange border border-borderGray bg-dark rounded-lg focus:outline-none w-full py-2 px-3 placeholder:text-silverGray"
                  placeholder="Enter your car name..."
                  value={fields.name}
                  onChange={handleChange}
                  maxLength="80"
                />
                {nameError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{nameError}</span>}
              </div>
              <div className="flex gap-4">
                <div className="flex-grow">
                  <label
                    htmlFor="color"
                    className="text-light font-bold mb-2 opacity-0 hidden md:block"
                    >Color</label>
                  <select
                    id="color"
                    name="color"
                    className="focus:border-orange border border-borderGray w-full focus:outline-none bg-dark rounded-lg flex-shrink-0 py-[9px] px-3"
                    value={fields.color}
                    onChange={handleChange}
                  >
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Purple">Purple</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Gray">Gray</option>
                    <option value="Brown">Brown</option>
                    <option value="Orange">Orange</option>
                    <option value="Pink">Pink</option>
                    <option value="Silver">Silver</option>
                    <option value="Beige">Beige</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="text-light font-bold mb-2 opacity-0 hidden md:block"
                    >Year</label>
                  <select
                    id="year"
                    name="year"
                    className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark flex-shrink-0 py-[9px] px-3"
                    value={fields.year}
                    onChange={handleChange}
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="type"
                  className="block text-light font-bold mb-2"
                  >Body type</label>
                <select
                  id="type"
                  name="type"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.type}
                  onChange={handleChange}
                >
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Truck">Truck</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Sports">Sports</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Wagon">Wagon</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Crossover">Crossover</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="brand"
                  className="block text-light font-bold mb-2"
                  >Brand</label>
                <select
                  id="brand"
                  name="brand"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.brand}
                  onChange={handleChange}
                >
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
              <div className="flex-1">
                <label
                  htmlFor="condition"
                  className="block text-light font-bold mb-2"
                  >Condition</label>
                <select
                  id="condition"
                  name="condition"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.condition}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Broken">Broken</option>
                </select>
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="fuel"
                  className="block text-light font-bold mb-2"
                  >Fuel</label>
                <select
                  id="fuel"
                  name="fuel"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.fuel}
                  onChange={handleChange}
                >
                  <option value="Gas">Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Plug-In Hybrid">Plug-In Hybrid</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="transmission"
                  className="block text-light font-bold mb-2"
                  >Transmission</label>
                <select
                  id="transmission"
                  name="transmission"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.transmission}
                  onChange={handleChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Automated Manual">Automated Manual</option>
                  <option value="Continuously Variable">Continuously Variable</option>
                  <option value="Dual Clutch">Dual Clutch</option>
                  <option value="Direct Shift Gearbox">Direct-shift Gearbox</option>
                  <option value="Semi Automatic">Semi Automatic</option>
                  <option value="Torque Converter">Torque Converter</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="drive"
                  className="block text-light font-bold mb-2"
                  >Drivetrain</label>
                <select
                  id="drive"
                  name="drive"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.drive}
                  onChange={handleChange}
                >
                  <option value="FWD">FWD</option>
                  <option value="AWD">AWD</option>
                  <option value="RWD">RWD</option>
                  <option value="4WD">4WD</option>
                </select>
              </div>
            </div>

            <div className="mb-10 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="mileage" className="block text-light font-bold mb-2"
                  >Mileage (km)</label>
                <input
                  type="number"
                  
                  id="mileage"
                  name="mileage"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.mileage}
                  onChange={handleChange}
                />
                {mileageError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{mileageError}</span>}
              </div>
              <div className="flex-1">
                <label htmlFor="capacity" className="block text-light font-bold mb-2"
                  >Engine Capacity (cc)</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.capacity}
                  onChange={handleChange}
                />
                {capacityError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{capacityError}</span>}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="power"
                  className="block text-light font-bold mb-2"
                  >Engine Power (hp)</label>
                <input
                  type="number"
                  id="power"
                  name="power"
                  className="focus:border-orange border rounded-lg focus:outline-none border-borderGray bg-dark w-full py-2 px-3"
                  value={fields.power}
                  onChange={handleChange}
                />
                {powerError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{powerError}</span>}
              </div>
            </div>


            <div className="mb-8">
              <label className="block text-light font-bold text-xl mb-4"
                >Features</label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_apple_carplay"
                    name="features"
                    value="Apple CarPlay"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Apple CarPlay')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_apple_carplay">Apple CarPlay</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_heated_seats"
                    name="features"
                    value="Heated Seats"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Heated Seats')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_heated_seats">Heated Seats</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_leather_interior"
                    name="features"
                    value="Leather Interior"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Leather Interior')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_leather_interior">Leather Interior</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_sunroof"
                    name="features"
                    value="Sunroof"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Sunroof')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_sunroof">Sunroof</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_third_row_seat"
                    name="features"
                    value="Third Row Seat"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Third Row Seat')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_third_row_seat">Third Row Seat</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_bluetooth_music"
                    name="features"
                    value="Bluetooth Music"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Bluetooth Music')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_bluetooth_music">Bluetooth Music</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_gps_navigation"
                    name="features"
                    value="GPS Navigation"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('GPS Navigation')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_gps_navigation">GPS Navigation</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_usb_input"
                    name="features"
                    value="USB Input"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('USB Input')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_usb_input"
                    >USB Input</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_wifi_hot_spot"
                    name="features"
                    value="Wi-Fi Hot Spot"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Wi-Fi Hot Spot')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_wifi_hot_spot">Wi-Fi Hot Spot</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_satellite_radio"
                    name="features"
                    value="Satellite Radio"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Satellite Radio')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_satellite_radio">Satellite Radio</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_360_camera"
                    name="features"
                    value="360 Camera"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('360 Camera')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_360_camera"
                    >360 Camera</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_blindspot_sensors"
                    name="features"
                    value="Blindspot Sensors"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Blindspot Sensors')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_blindspot_sensors">Blindspot Sensors</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_ventilated_seats"
                    name="features"
                    value="Ventilated Seats"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Ventilated Seats')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_ventilated_seats">Ventilated Seats</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_heated_steering_wheel"
                    name="features"
                    value="Heated Steering Wheel"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Heated Steering Wheel')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_heated_steering_wheel">Heated Steering Wheel</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature_parking_assistance"
                    name="features"
                    value="Parking Assistance"
                    className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                    checked={fields.features.includes('Parking Assistance')}
                    onChange={handleFeaturesChange}
                  />
                  <label className="text-sm bg-dark text-light border border-borderGray py-2 px-3 rounded-3xl peer-checked:bg-[#FF570010] peer-focus:border-orange peer-checked:border-orange select-none cursor-pointer peer-checked:text-orange" htmlFor="feature_parking_assistance">Parking Assistance</label>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <p className="text-xl text-light font-bold">Seats:</p>
              <div className="flex gap-4 md:gap-8 flex-wrap">
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_one"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="1"
                      checked={fields.seats == '1'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">1</span></div>
                  </div>
                  <label htmlFor="seats_one" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    1
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_two"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="2"
                      checked={fields.seats == '2'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">2</span></div>
                  </div>
                  <label htmlFor="seats_two" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    2
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_three"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="3"
                      checked={fields.seats == '3'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">3</span></div>
                  </div>
                  <label htmlFor="seats_three" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    3
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_four"
                      name="seats"
                      className="
                      peer
                      col-start-1 row-start-1
                      appearance-none shrink-0
                      w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                      focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="4"
                      checked={fields.seats == '4'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">4</span></div>
                  </div>
                  <label htmlFor="seats_four" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    4
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_five"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="5"
                      checked={fields.seats == '5'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">5</span></div>
                  </div>
                  <label htmlFor="seats_five" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    5
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_six"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="6"
                      checked={fields.seats == '6'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">6</span></div>
                  </div>
                  <label htmlFor="seats_six" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    6
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_seven"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="7"
                      checked={fields.seats == '7'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">7</span></div>
                  </div>
                  <label htmlFor="seats_seven" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    7
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="grid place-items-center mt-1">
                    <input
                      type="radio"
                      id="seats_eight"
                      name="seats"
                      className="
                        peer
                        col-start-1 row-start-1
                        appearance-none shrink-0
                        w-12 h-12 border-borderGray checked:border-orange checked:bg-[#FF570010] md:w-6 md:h-6 border-2 md:border-orange rounded-xl md:rounded-full
                        focus:outline-none cursor-pointer
                      "
                      onChange={handleChange}
                      value="8"
                      checked={fields.seats == '8'}
                    />
                    <div className="pointer-events-none col-start-1 row-start-1 w-3 h-3 rounded-full peer-checked:text-orange md:peer-checked:bg-orange flex items-center justify-center md:block"><span className="md:hidden">8+</span></div>
                  </div>
                  <label htmlFor="seats_eight" className="text-start hover:cursor-pointer text-2xl sr-only md:not-sr-only">
                    8+
                  </label>
                </div>
              </div>

            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex items-center select-none">
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  value="true"
                  className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                  checked={fields.rent}
                  onChange={(e) => setFields((prevFields) => ({...prevFields, rent: e.target.checked, rates: {daily: '', weekly: '', monthly: ''} }))}
                />
                <label className="text-base py-2 px-5 bg-dark border border-borderGray rounded-3xl cursor-pointer peer-focus:border-orange peer-checked:text-orange peer-checked:bg-[#FF570010] peer-checked:border-orange" htmlFor="rent">Rent</label>
              </div>
              <div className="flex items-center select-none">
                <input
                  type="checkbox"
                  id="address"
                  name="address"
                  value="true"
                  className="mr-2 accent-orange w-5 h-5 sr-only appearance-none peer"
                  checked={fields.address}
                  onChange={(e) => setFields((prevFields) => ({...prevFields, address: e.target.checked, location: { state: '', city: '', zipcode: '', street: ''} }))}
                />
                <label className="text-base py-2 px-5 bg-dark border border-borderGray rounded-3xl cursor-pointer peer-focus:border-orange peer-checked:text-orange peer-checked:bg-[#FF570010] peer-checked:border-orange" htmlFor="address">Add Address</label>
              </div>
            </div>

            {fields.rent && (<div className="mb-4 bg-darkGray rounded-lg p-4">
              <label className="block text-light font-bold mb-2"
                >Prices</label>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex items-center">
                  <label htmlFor="weekly_rate" className="pl-2 md:pl-0 basis-24 md:basis-0 flex-shrink-0 md:mr-2">Weekly</label>
                  <input
                    type="number"
                    id="weekly_rate"
                    name="rates.weekly"
                    className="focus:border-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 focus:outline-none"
                    value={fields.rates.weekly}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="monthly_rate" className="pl-2 md:pl-0 basis-24 md:basis-0 flex-shrink-0 md:mr-2">Monthly</label>
                  <input
                    type="number"
                    id="monthly_rate"
                    name="rates.monthly"
                    className="focus:border-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 focus:outline-none"
                    value={fields.rates.monthly}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="daily_rate" className="pl-2 md:pl-0 basis-24 md:basis-0 flex-shrink-0 md:mr-2">Daily</label>
                  <input
                    type="number"
                    id="daily_rate"
                    name="rates.daily"
                    className="focus:border-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 focus:outline-none"
                    value={fields.rates.daily}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {ratesError && <span className="block text-[#f00] opacity-90 mt-2 text-sm">{ratesError}</span>}
            </div>)}

            {fields.address && (<div className="mb-4 bg-darkGray rounded-lg p-4">
              <label className="block font-bold mb-2">Location</label>
              <input
                type="text"
                id="street"
                name="location.street"
                className="focus:border-orange focus:placeholder:text-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 mb-2 placeholder:text-silverGray focus:outline-none"
                placeholder="Street"
                value={fields.location.street}
                onChange={handleChange}
              />
              {streetError && <span className="block text-[#f00] opacity-90 mb-2 text-sm">{streetError}</span>}
              <input
                type="text"
                id="city"
                name="location.city"
                className="focus:border-orange focus:placeholder:text-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 mb-2 placeholder:text-silverGray focus:outline-none"
                placeholder="City"
                value={fields.location.city}
                onChange={handleChange}
              />
              {cityError && <span className="block text-[#f00] opacity-90 mb-2 text-sm">{cityError}</span>}
              <input
                type="text"
                id="state"
                name="location.state"
                className="focus:border-orange focus:placeholder:text-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 mb-2 placeholder:text-silverGray focus:outline-none"
                placeholder="State"
                value={fields.location.state}
                onChange={handleChange}
              />
              {stateError && <span className="block text-[#f00] opacity-90 mb-2 text-sm">{stateError}</span>}
              <input
                type="number"
                id="zipcode"
                name="location.zipcode"
                className="focus:border-orange focus:placeholder:text-orange bg-dark border border-borderGray rounded-lg w-full py-2 px-3 mb-2 placeholder:text-silverGray focus:outline-none"
                placeholder="Zipcode"
                value={fields.location.zipcode}
                onChange={handleChange}
              />
              {zipcodeError && <span className="block text-[#f00] opacity-90 text-sm">{zipcodeError}</span>}
            </div>)}


            <div className="flex flex-col md:flex-row gap-4 mt-8 mb-4">
              <div className="flex-grow">
                <label
                  htmlFor="seller_name"
                  className="block text-light font-bold mb-2"
                  >Name <span className="text-[#ff5700] opacity-90">*</span></label>
                <input
                  type="text"
                  id="seller_name"
                  name="seller.name"
                  className="focus:border-orange focus:placeholder:text-orange border border-borderGray bg-dark rounded-lg w-full py-2 px-3 placeholder:text-silverGray focus:outline-none"
                  placeholder="Name"
                  value={fields.seller.name}
                  onChange={handleChange}
                  maxLength="20"
                />
                {sellerNameError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{sellerNameError}</span>}
              </div>
              <div className="flex-grow">
                <label
                  htmlFor="seller_email"
                  className="block text-light font-bold mb-2"
                  >Email</label>
                <input
                  type="text"
                  id="seller_email"
                  name="seller.email"
                  className="focus:border-orange border focus:placeholder:text-orange border-borderGray bg-dark rounded-lg w-full py-2 px-3 placeholder:text-silverGray focus:outline-none"
                  placeholder="Email address"
                  value={fields.seller.email}
                  onChange={handleChange}
                  maxLength="35"
                />
                {emailError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{emailError}</span>}
              </div>
              <div className="flex-grow">
                <label
                  htmlFor="seller_phone"
                  className="block text-light font-bold mb-2"
                  >Phone</label>
                <input
                  type="tel"
                  id="seller_phone"
                  name="seller.phone"
                  className="focus:border-orange focus:placeholder:text-orange border border-borderGray bg-dark rounded-lg w-full py-2 px-3 placeholder:text-silverGray focus:outline-none"
                  placeholder="Phone"
                  value={fields.seller.phone}
                  onChange={handleChange}
                />
                {phoneError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{phoneError}</span>}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-light font-bold mb-2"
                >Description <span className="text-[#ff5700] opacity-90">*</span></label>
              <textarea
                id="description"
                name="description"
                className="focus:border-orange focus:placeholder:text-orange border border-borderGray bg-dark rounded-lg w-full py-2 px-3 placeholder:text-silverGray resize-none focus:outline-none"
                rows="4"
                placeholder="Add description of your car..."
                value={fields.description}
                onChange={handleChange}
                maxLength="300"
              ></textarea>
              {descriptionError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{descriptionError}</span>}
            </div>

            <div className="mb-8">
              <label
                htmlFor="price"
                className="block text-light font-bold mb-2"
                >Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="focus:border-orange border border-borderGray bg-dark rounded-lg max-w-xs w-full py-2 px-3 focus:outline-none"
                value={fields.price}
                onChange={handleChange}
              />
              {priceError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{priceError}</span>}
            </div>


            <div>
              <button
                className="bg-dark text-light border border-borderGray hover:border-orange hover:text-orange font-semibold py-2 px-4 rounded-lg w-full focus:outline-none"
                type="submit"
              >
                Update Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CarEditForm;