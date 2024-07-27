import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const GET = async (request, {params}) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {status: 401})
    };

    const {userId} = sessionUser;

    // Count unread messages of the user
    const messagesCount = await Message.countDocuments({
      recipient: userId,
      read: false
    });

    return new Response(JSON.stringify(messagesCount), {status: 200})

  } catch (error) {
   console.log(error);
   return new Response('Something went wrong', {status: 500})
  }
}