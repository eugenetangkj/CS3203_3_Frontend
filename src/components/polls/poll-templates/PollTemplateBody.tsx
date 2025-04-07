"use client"

import {  PollQuestionTypeEnum } from "@/types/Poll";
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton";
import PageSubtitle from "@/components/common/text/PageSubtitle";
import AiTooltip from "@/components/common/others/AiTooltip";
import { UsePollTemplateButton } from "@/components/polls/poll-templates/UsePollTemplateButton";
import useSWR from "swr";
import { POLL_TEMPLATES_GET_BY_OID_SWR_HOOK } from "@/constants/SwrHooks";
import { pollTemplateGetByOid } from "@/data-fetchers/PollTemplatesFunctions";
import { Skeleton } from "@/components/ui/skeleton";

/** 
Body for view poll template page
*/
interface PollTemplateBodyProps {
    id: string
}

export default function PollTemplateBody({ id }: PollTemplateBodyProps) {
    const { data, error, isLoading } = useSWR(`${POLL_TEMPLATES_GET_BY_OID_SWR_HOOK}/${id}`, () => pollTemplateGetByOid(id));


    return (
        isLoading
        ? <div className='flex flex-col space-y-4 px-6 md:px-12 mt-32 mb-8'> 
                <Skeleton className='h-[30px] w-[240px]' />
                <Skeleton className='h-[50px] w-full' />
            </div>
        : error || data?.id.length === 0 || data === undefined
        ? <div>Something went wrong. We could not fetch the poll template.</div>
        : <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />
            
            {/* Action Buttons */}
            <div className='flex flex-row justify-end items-center'>
                <UsePollTemplateButton pollTemplate={ data } />
            </div>

            {/* Poll Template */}
            <div className='flex flex-col space-y-12'>

                {/* Question */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Question" />
                    <p className='text-xl text-yap-black-800'>{ data.question }</p> 
                </div>

                {/* Options */}
                {
                    data.question_type === PollQuestionTypeEnum.MCQ &&
                    <div className='flex flex-col space-y-4'>
                        <PageSubtitle pageSubtitle="Options" />
                        <ul className='list-disc pl-5 space-y-4 text-yap-black-800'>
                            {
                                data.options.map((option: string) => (
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
                    <p><span className='text-yap-brown-900 text-lg'>Category: </span><br/>{ data.category }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Question Type: </span><br/>{ data.question_type }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Date created: </span><br/>{ data.date_created }</p>
                    <p><span className='text-yap-brown-900 text-lg'>Why did AI design this poll template: </span><br/>{ data.reasoning }</p>
                </div>
            </div>
        </div>
    );
}
