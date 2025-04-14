import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton";
import PageTitle from "@/components/common/text/PageTitle";
import SignUpForm from "@/components/sign-up/SignUpForm";
import { UserRoleEnum } from "@/types/User";


/** 
Layout for the the admin to create new admin accounts.
*/

export const metadata = {
    title: "Create Admin Account - Just Yap!",
    description: "Create a new admin account.",
	viewport: 'width=device-width, initial-scale=1',
};


export default function CreateAdminPage() {
	return (
    	<div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      		<div className="flex flex-col justify-between items-center space-y-4">
				{/* Back to previous button */}
				<div className='self-start'>
					<BackToPreviousButton text='Back to Profile' route='/profile' />
				</div>

				{/* Title */}
				<PageTitle pageTitle="Create an Admin Account" />

				{/* Sign up form */}
				<SignUpForm 
					role={ UserRoleEnum.Admin }
					successMessage='Admin account is successfully created.'
					buttonMessage='Create Account'
					buttonActionMessage='Creating...' />

      		</div>
    	</div>
  	);
}
