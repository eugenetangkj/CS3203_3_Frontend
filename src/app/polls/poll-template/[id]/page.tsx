import PollTemplateBody from "@/components/polls/poll-templates/PollTemplateBody";

/** 
Layout for the page where the admin can view a poll template
*/

export const metadata = {
    title: "Poll Template - Just Yap!",
    description: "View a poll template",
    viewport: 'width=device-width, initial-scale=1',
};


export default async function ViewPollTemplate({ params }: any) {
    const { id } = await params

    return (
        <PollTemplateBody id={ id } />
    );
  }