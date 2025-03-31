import PageTitle from "@/components/common/text/PageTitle";
import SignInForm from "@/components/sign-in/SignInForm";
import Link from "next/link";


/** 
Layout for the sign in page for existing users to login
*/

export const metadata = {
    title: "Sign In - Just Yap!",
    description: "Sign in to your account in Just Yap!",
};


export default function SignInPage() {
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col justify-between items-center space-y-8">
                {/* Title */}
                <PageTitle pageTitle="Welcome back!" />

                {/* Sign in form */}
                <SignInForm />

                {/* Link to sign up instead */}
                <h6>Don&apos;t have an account? <span className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 underline'>
                    <Link href='sign-up'>Sign up</Link>
                </span> here.</h6>
            
            </div>
        </div>
    );
}
