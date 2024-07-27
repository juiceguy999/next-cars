import connectDB from "@/config/database";
import Car from "@/models/Car";
import { getSessionUser } from "@/utils/getSessionUser";

// /api/cars/:id

export const GET = async (request, {params}) => {
  try {
    await connectDB();

    const car = await Car.findById(params.id).populate({path: 'owner', select: 'username image'});

    if(!car) {
      return new Response('Car not found', {
        status: 404
      })
    }

    return new Response(JSON.stringify(car), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}

export const DELETE = async (request, {params}) => {
  try {
    await connectDB();

    // Check if there's an active session and user id
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {
        status: 401
      })
    }

    const {userId} = sessionUser;

    // Find the car and verify user

    const car = await Car.findById(params.id);

    if(!car) {
      return new Response('Car listing not found', {status: 404})
    }

    if(car.owner.toString() !== userId) {
      return new Response('Not the owner of car listing', {status: 401})
    }

    await car.deleteOne();

    return new Response('Car listing deleted successfully', {status: 200});

  } catch (error) {
    
    console.log(error);
    return new Response('Something went wrong', {status: 500});

  }
}

export const PUT = async (request, {params}) => {
  try {

    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    };

    const {userId} = sessionUser;

    const {id} = params;

    const formData = await request.formData();

    // Get car from database and update info
    const existingCar = await Car.findById(id);

    if(!existingCar) {
      return new Response('Car listing not found', { status: 404})
    }
    
    // Verify user
    if(existingCar.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401})
    }

    const carData = {
      name: formData.get('name'),
      description: formData.get('description'),
      brand: formData.get('brand'),
      type: formData.get('type'),
      condition: formData.get('condition'),
      fuel: formData.get('fuel'),
      transmission: formData.get('transmission'),
      drive: formData.get('drive'),
      color: formData.get('color'),
      seats: formData.get('seats'),
      price: formData.get('price'),
      year: formData.get('year'),
      mileage: formData.get('mileage'),
      capacity: formData.get('capacity'),
      power: formData.get('power'),
      rent: formData.get('rent'),
      rates: {
        daily: formData.get('rates.daily'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly')
      },
      address: formData.get('address'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode')
      },
      seller: {
        name: formData.get('seller.name'),
        email: formData.get('seller.email'),
        phone: formData.get('seller.phone')
      },
      owner: userId,
      features: formData.getAll('features')
    };

    // Update car in database
    const updatedCar = await Car.findByIdAndUpdate(id, carData);

    return new Response(JSON.stringify(updatedCar), {status: 200});

  } catch (error) {
    console.log(error);
    return new Response('Failed to add car', { status: 500 })
  }
}