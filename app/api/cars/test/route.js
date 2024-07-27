import connectDB from "@/config/database";
import Car from "@/models/Car";
import mongoose from "mongoose";

export const GET = async (request) => {
  try {
    await connectDB();

    const models = mongoose.models.Car.schema;

    console.log(models);

    return new Response('Hello World :)', {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {status: 500});
  }
}
