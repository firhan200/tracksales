import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }){
    const body = await req.json();

    //check if has id
    if(!params.hasOwnProperty('id')){
        return NextResponse.json({
            success: false,
            error: 'Id not found'
        });
    }

    const id = parseInt(params.id);

    //get user
    const user = await prisma.user.findUnique({
        where : {
            id : id
        }
    });

    if(user == null){
        return NextResponse.json({
            success: false,
            error: 'User not found'
        });
    }

    //check if email already taken
    const existUser = await prisma.user.findFirst({
        where : {
            AND: {
                email : {
                    equals: body.email
                },
                id: {
                    not: id
                }
            }
        }
    });
    if(existUser){
        return NextResponse.json({
            success: false,
            error: 'Email Already Taken'
        });
    }

    //update
    const updated = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json({
        success: true,
        error: null
    });
}

export async function DELETE(req, { params }){
    //check if has id
    if(!params.hasOwnProperty('id')){
        return NextResponse.json({
            success: false,
            error: 'Id not found'
        });
    }

    const id = parseInt(params.id);

    //get user
    const user = await prisma.user.findUnique({
        where : {
            id : id
        }
    });

    if(user == null){
        return NextResponse.json({
            success: false,
            error: 'User not found'
        });
    }

    //delete
    const deleted = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({
        success: true,
        error: null
    });
}