import PageTitle from "@/components/common/text/PageTitle";
import SignUpForm from "@/components/sign-up/SignUpForm";
import { UserRoleEnum } from "@/types/User";
import Link from "next/link";


/** 
Layout for the sign up page for new users to create an account. The role of the account created is citizen.
*/

export const metadata = {
    title: "Sign Up - Just Yap!",
    description: "Sign up for a new account in Just Yap!",
	
};


export default function SignUpPage() {
	return (
    	<div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      		<div className="flex flex-col justify-between items-center space-y-4">
				{/* Title */}
				<PageTitle pageTitle="New here? Join now!" />

				{/* Sign up form */}
				<SignUpForm
					role={ UserRoleEnum.Citizen }
					successMessage='Sign up is successful. Please sign in now.'
					buttonMessage="Sign Up"
					buttonActionMessage="Signing up..."
				/>

				{/* Sign in instead */}
				<h6>Already have an account? <span className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 underline'>
					<Link href='sign-in'>Sign in</Link>
				</span> here.</h6>

      		</div>
    	</div>
  	);
}
