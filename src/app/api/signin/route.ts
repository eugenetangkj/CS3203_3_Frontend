
import { NextResponse } from "next/server";
import { COOKIE_JWT_TOKEN } from "@/constants/Constants";
import { cookies } from "next/headers";


/**
API route to set the JWT token in the cookie in the browser header when the user signs in

Adapted from https://nextjs.org/docs/app/api-reference/functions/cookies#setting-a-cookie

*/
export async function POST(request: Request) {
    const { token } = await request.json();

    if (token) {
        const cookieStore = await cookies()
        cookieStore.set({
            name: COOKIE_JWT_TOKEN,
            value: token,
            httpOnly: true,
            path: '/',
        })

        return NextResponse.json({ message: "Token set in cookie" });
    } else {
        return NextResponse.json({ message: "Token missing" }, { status: 400 });
    }
}