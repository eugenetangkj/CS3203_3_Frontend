import PageTitle from "@/components/common/text/PageTitle";


/** 
Layout for the all complaints page that the authority can use to view all complaints obtained from social media.
*/

export const metadata = {
    title: "All Complaints - Just Yap!",
    description: "View the full list of complaints obtained from social media.",
};


export default function AllComplaintsPage() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      <div className="flex flex-col space-y-8">

        {/* Title */}
        <PageTitle pageTitle="All Complaints" />
   
             
                
      </div>
    </div>
  );

}
