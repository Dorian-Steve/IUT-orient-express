import {prisma} from "@/lib/prisma";
import { type User } from  '@prisma/client';

export async function createUser(data: User) {
    try{
        const user = await prisma.user.create({ data })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function getUserById({
    id, 
    email
}:{
    id?: number  // Changed from string to number
    email?: string
}) {
    try {
        if(!id && !email) {
            throw new Error('id or email is required')
        }

        let user;
        
        if (id) {
            user = await prisma.user.findUnique({ 
                where: { id }
            });
        } else if (email) {
            user = await prisma.user.findUnique({ 
                where: { email }
            });
        }

        return { user }
    } catch (error){
        return { error }
    }
}

export async function UpdateUser(id: number, data: Partial<User>) {  // Changed from string to number
    try{
        const user = await prisma.user.update({ 
            where: { id },
            data
         })
        return { user }
    } catch (error) {
        return { error }
    }
}