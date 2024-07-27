import connectDB from "@/config/database";
import Car from "@/models/Car";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";



export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    };

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if(!user.admin) {
      return new Response('Unauthorized', {status: 401});
    }

    const cars = await Car.find({published: false}).populate('owner', 'image');

    return new Response(JSON.stringify(cars), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}