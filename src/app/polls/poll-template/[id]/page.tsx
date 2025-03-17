import ViewPollComponent from "@/components/polls/ViewPollComponent";
import { allPolls } from "@/constants/posts";
import { Poll, PollQuestionTypeEnum } from "@/types/Poll";
import { apiFetcherPost } from "@/utils/ApiFetcher";
import { determineIsObjectEmpty } from "@/utils/HelperFunctions";
import { pollTemplatesHardCodedData } from "@/constants/posts";
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton";
import { Button } from "@/components/ui/button";
import PageSubtitle from "@/components/common/text/PageSubtitle";
import AiTooltip from "@/components/common/others/AiTooltip";
import { UsePollTemplateButton } from "@/components/polls/poll-templates/UseTemplateButton/UsePollTemplateButton";
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_TEMPLATES_GET_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertPollTemplateDocumentToObject } from "@/utils/DatabaseHelperFunctions";

/** 
Layout for the page where the admin can view a poll template
*/

export const metadata = {
    title: "Poll Template - Just Yap!",
    description: "View a poll template",
};


export default async function ViewPollTemplate({ params }: any) {
    const { id } = await params

    //TODO: Update function that fetches the poll template via an API
    const fetchPollTemplate = async() => {
        //Call API and process the data
        const getPollTemplateEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLL_TEMPLATES_GET_BY_OID_ENDPOINT
        const pollTemplateData = await axios.post(getPollTemplateEndpoint, {
            "oid": id
        })
        const pollTemplate = convertPollTemplateDocumentToObject(pollTemplateData.data.document)

        return pollTemplate
    }
    const pollTemplate = await fetchPollTemplate()


    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">

            <div className='flex flex-col space-y-4'>
                {/* Navigate back to all polls */}
                <BackToPreviousButton text='Back to all polls' route='/polls' />
            </div>

            {/* Action Buttons */}
            <div className='flex flex-row justify-end items-center'>
                <UsePollTemplateButton pollTemplate={ pollTemplate } />
            </div>

            {/* Poll Template */}
            <div className='flex flex-col space-y-12'>

                {/* Question */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Question" />
                    <p className='text-xl text-yap-black-800'>{ pollTemplate.question }</p> 
                </div>

                {/* Options */}
                {
                    pollTemplate.question_type === PollQuestionTypeEnum.MCQ &&
                    <div className='flex flex-col space-y-4'>
                        <PageSubtitle pageSubtitle="Options" />
                        <ul className='list-disc pl-5 space-y-4 text-yap-black-800'>
                            {
                                pollTemplate.options.map((option: string) => (
                                    <li key={ option }>{ option }</li>
                                ))
                            }
                        </ul>
                    </div>
                }

                {/* Template Information */}
                <div className='flex flex-col space-y-4 text-yap-black-800'>
                    <div className='flex flex-row gap-2 items-center'>
                        <PageSubtitle pageSubtitle='About Template' />
                        <AiTooltip message='AI analysed past complaints to create this template.' />
                    </div>
                    <p><span className='text-yap-brown-900 text-lg'>Category: </span><br/>{ pollTemplate.category }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Question Type: </span><br/>{ pollTemplate.question_type }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Date created: </span><br/>{ pollTemplate.date_created }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Why did AI design this poll template: </span><br/>{ pollTemplate.reasoning }</p>
                </div>
            </div>
        </div>
    );
  }