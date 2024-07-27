const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchCars(){
  try {

    if(!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/cars`, {
      cache: 'no-store'
    });

    if(!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json();

  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchCar(id){
  try {

    if(!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/cars/${id}`);

    if(!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json();

  } catch (error) {
    console.log(error);
    return null;
  }
}

export {fetchCars, fetchCar};