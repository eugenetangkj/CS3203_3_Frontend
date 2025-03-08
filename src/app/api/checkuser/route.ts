
import { NextResponse } from "next/server";
import { COOKIE_JWT_TOKEN } from "@/constants/Constants";
import { cookies } from "next/headers";


/**
API route to check if the user is signed in by looking for the existence of the cookie

*/
export async function POST(request: Request) {
    const cookieStore = await cookies();
    const hasCookie = cookieStore.has(COOKIE_JWT_TOKEN)

    return NextResponse.json(hasCookie);
}