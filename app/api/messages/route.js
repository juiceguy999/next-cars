import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {status: 401});
    }

    const {userId} = sessionUser;

    const readMessages = await Message.find({recipient: userId, read: true})
    .sort({createdAt: -1})
    .populate({path: 'sender', select: 'username image'})
    .populate({path: 'car', select: 'name images'});

    const unreadMessages = await Message.find({recipient: userId, read: false})
    .sort({createdAt: -1})
    .populate({path: 'sender', select: 'username image'})
    .populate({path: 'car', select: 'name images'});

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {status: 200})

  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}

export const POST = async (request) => {
  try {
    await connectDB();

    const {email, phone, body, car, recipient} = await request.json();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({message: 'Please log in!'}), {status: 401});
    }

    const {user} = sessionUser;

    // Can not send message to self
    if(user.id === recipient) {
      return new Response(JSON.stringify({message: 'Can not send message to yourself'}), {status: 400});
    };

    const newMessage = new Message({
      sender: user.id,
      recipient,
      car,
      email,
      phone,
      body
    });

    await newMessage.save();

    return new Response(JSON.stringify({message: 'Message sent!'}), {status: 200});
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', {status: 500});
  }
}


