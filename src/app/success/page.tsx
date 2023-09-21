"use client"
import Link from "next/link";
export default function Success(){

    return(
        <main className="h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg w-1/2 font-latoRegular text-gray-700 p-16">
                <h1 className="text-lg text-center pb-4 font-latoBold">
                    Check-In Successful!
                </h1>
                <p className="text-lg text-center text-gray-500">
                    Please press the button below to return to the sign-in form. 
                </p>
                <Link href={"/"}>
                    <button className="bg-violet-700 font-latoBold text-lg rounded-lg w-full justify-center text-white py-3 mt-6">
                        Return to form
                    </button>
                </Link>
            </div>
        </main>
    );
}