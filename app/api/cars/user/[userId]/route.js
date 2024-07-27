import connectDB from "@/config/database";
import Car from "@/models/Car";


// /api/cars/user/:userId
export const GET = async (request, {params}) => {
  try {
    await connectDB();

    const userId = params.userId;

    if(!userId) {
      return new Response('User ID is required', {
        status: 400
      });
    }

    const cars = await Car.find({owner: userId});
    

    return new Response(JSON.stringify(cars), {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}