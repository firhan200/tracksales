import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import UserEditForm from "./UserEditForm";
import BackButton from "./BackButton";

const prisma = new PrismaClient();

export const revalidate = 1

export const metadata = {
    title: 'Edit User',
}

async function getUser(id){
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return user;
}

export default async function Page({ params }){
    const id = params.id;

    const user = await getUser(parseInt(id));

    return (
        <div>
            <BackButton />
            <p className='text-xl font-bold mb-4'>Edit User</p>
            {
                user !== null ? <UserEditForm user={user}/> : <h3>User not found</h3>
            }
        </div>
    );
}