import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(){
    //get all user
    const users = await prisma.user.findMany({
        orderBy: {
            id: 'desc'
        }
    });

    return NextResponse.json(users.map((user, index) => { return { id: user.id, name: user.name, email: user.email } }));
}

export async function POST(req){
    const body = await req.json();
    //validate
    //check if email already taken
    const existUser = await prisma.user.findFirst({
        where : {
            email : {
                equals: body.email
            }
        }
    });
    if(existUser){
        return NextResponse.json({
            success: false,
            error: 'Email Already Taken'
        });
    }

    //run inside `async` function
    try{
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }catch(err){
        return NextResponse.json({
            success: false,
            error: err
        });
    }
}