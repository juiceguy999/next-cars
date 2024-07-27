import connectDB from "@/config/database";
import Car from "@/models/Car";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    const bookmarks = await Car.find({_id: {$in: user.bookmarks}}).populate('owner', 'image');

    return new Response(JSON.stringify(bookmarks), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500})
  }
}

export const POST = async (request) => {
  try {
    await connectDB();

    const {carId} = await request.json();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    // Check if car is bookmarked
    let isBookmarked = user.bookmarks.includes(carId);
    let message;

    if(isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(carId);
      message = 'Bookmark removed';
      isBookmarked = false;
    } else {
      user.bookmarks.push(carId);
      message = 'Bookmark added';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({message, isBookmarked}), {status: 200})

  } catch (error) { 
    console.log(error)
    return new Response('Something went wrong', { status: 500})
  }
}
