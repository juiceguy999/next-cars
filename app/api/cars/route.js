import connectDB from "@/config/database";
import Car from "@/models/Car";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";



export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 12;

    const skip = (page - 1) * pageSize;

    const total = await Car.countDocuments({});

    const cars = await Car.find({published: true}).skip(skip).limit(pageSize).populate('owner', 'image');

    const result = {
      total,
      cars
    };

    return new Response(JSON.stringify(result), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}

export const POST = async (request) => {
  try {

    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    };

    const {userId} = sessionUser;

    

    const formData = await request.formData();

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

    console.log(carData);

    const images = formData.getAll('images');

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`, {
          folder: 'nextcars'
        }
      );

      imageUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises);
      carData.images = uploadedImages;
    }


    const newCar = new Car(carData);
    await newCar.save();

    return new Response(JSON.stringify({id: newCar._id}), {status: 200});

  } catch (error) {
    console.log(error);
    return new Response('Failed to add car', { status: 500 })
  }
}