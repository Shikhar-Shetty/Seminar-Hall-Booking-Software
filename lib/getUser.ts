import { getServerSession } from "next-auth";
import dbConnect from "./dbConnect"
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const getUser = async() => {
    dbConnect();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId){
        revalidatePath("/sign-in")
        throw new Error("User is not authorized")
    }
    return userId;
}