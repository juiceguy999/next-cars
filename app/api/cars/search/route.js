import connectDB from "@/config/database";
import Car from "@/models/Car";

// /api/cars/search

export const GET = async (request) => {
  try {
    await connectDB();

    const {searchParams} = new URL(request.url);
    const search = searchParams.get('search');
    const brand = searchParams.get('brand');

    const searchPattern = new RegExp(search, 'i');

    let query = {
      $or: [
        {name: searchPattern},
        {description: searchPattern},
      ]
    }

    if(brand && brand !== 'All') {
      const brandPattern = new RegExp(brand, 'i');
      query.brand = brandPattern;
    };

    const cars = await Car.find(query).populate('owner', 'image');

    return new Response(JSON.stringify(cars), {status: 200})
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', {status: 500})
  }
} 