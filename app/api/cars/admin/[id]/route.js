import connectDB from "@/config/database";
import Car from "@/models/Car";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const DELETE = async (request, {params}) => {
  try {
    await connectDB();

    const {id} = params;

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {status: 401})
    };

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if(!user.admin) {
      return new Response('Unauthorized', {status: 401});
    }

    const car = await Car.findById(id);

    if(!car) {
      return new Response('Car listing not found', {status: 404})
    }

    await car.deleteOne();

    return new Response('Car listing deleted', {status: 200})

  } catch (error) {
   console.log(error);
   return new Response('Something went wrong', {status: 500})
  }
}

export const PUT = async (request, {params}) => {
  try {
    await connectDB();

    const {id} = params;

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {status: 401})
    };

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if(!user.admin) {
      return new Response('Unauthorized', {status: 401});
    }

    const car = await Car.findById(id);

    if(!car) {
      return new Response('Car listing not found', {status: 404})
    }

    // Update "published" boolean field for the car (set it to true) and save

    car.published = true;

    await car.save();

    return new Response('Car listing published', {status: 200})

  } catch (error) {
   console.log(error);
   return new Response('Something went wrong', {status: 500})
  }
}