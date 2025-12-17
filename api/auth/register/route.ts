import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";


export async function POST (request: NextRequest) {
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: 'Email and Password is required'},
                {status: 400}
            )
        }

        await connectToDatabase();

        const userExists = await User.findOne({email});

        if(userExists){
            return NextResponse.json(
                {error: 'user already registered'},
                {status:400}
            )
        }

        await User.create({email, password});

        return NextResponse.json(
            {message: 'user registered successfully'},
            {status:400}
        )
    } catch (error) {

        console.error(error);
        
        return NextResponse.json(
            {error: 'user failed to register'},
            {status:400}
        )
    }
}