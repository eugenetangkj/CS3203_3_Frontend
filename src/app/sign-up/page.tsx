import PageTitle from "@/components/common/text/PageTitle";
import SignUpForm from "@/components/sign-up/SignUpForm";


/** 
Layout for the sign up page for new users to create an account
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
				<SignUpForm />


				{/* Sign in instead */}
				<h6>Already have an account? <span className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 underline'>
					<a href='sign-in'>Sign in</a>
				</span> here.</h6>

      		</div>
    	</div>
  	);
}
