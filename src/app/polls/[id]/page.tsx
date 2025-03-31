import ViewPollBody from "@/components/polls/view-polls/general/ViewPollBody";


/** 
Layout for the dynamic page which allows admin and citizens to view a given poll. The specific
layout depends on:

1. For admin, depends on the status of the poll..
2. For citizen, depends on whether he has already completed the poll or not.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "View a poll",
};


export default async function ViewPoll({ params }: any) {
    //Determine which poll is the user trying to view
    const { id } = await params

    return (
        <ViewPollBody id={id} />
    );
}
