"use client"

import { Poll } from "@/types/Poll"
import { MoveLeft, Trash2Icon, PlusIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { CreatePollButton } from "./CreatePollButton"
import PageSubtitle from "../common/text/PageSubtitle"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { POSSIBLE_POLL_TYPES } from "@/types/Poll"
import { capitaliseFirstLetter } from "@/utils/HelperFunctions"
import { SaveChangesToPollButton } from "./SaveChangesToPollButton"
import PublishPollButton from "./PublishPollButton"
import DeletePollButton from "./DeletePollButton"




/**
Represents a page where the admin and citizen can view and edit a poll, depending on the status of the poll.
*/
interface ViewPollAdminDetailsProps {
    currentPoll: Poll,

}

export function ViewPollAdminDetails({ currentPoll }: ViewPollAdminDetailsProps) {

    //Poll that is maintained within the current page
    const [poll, setPoll] = useState<Poll>(currentPoll)

    //Current option that is added
    const [currentOption, setCurrentOption] = useState<string>('')

    //If the current poll object changes, update the state
    useEffect(() => {
        setPoll(currentPoll); 
    }, [currentPoll]);

    //Handles adding of option
    const handleCreateNewOption = () => {
        if (currentOption.trim() === '') {
            //Ignore pure whitespace options
            return
        }
        //Add current option to poll's options
        setPoll((prevPoll) => ({
            ...prevPoll,
            options: [...prevPoll.options, currentOption],
        }));

        //Reset current option
        setCurrentOption('')
    }



    return (
        <div className='flex flex-col space-y-4'>
            {/* Navigate back to all polls */}
            <a href="/polls" className='w-fit'>
                <div className='flex flex-row justify-start items-center space-x-4'>
                    <MoveLeft className='text-yap-brown-900' />
                    <h6 className='text-yap-brown-900'>Back to all polls</h6>
                </div> 
            </a>


            {/* Action Buttons */}
            <div className='self-end flex-row justify-center items-center'>
                {/* Only show create poll button for new uncreated polls that are not saved in the database yrt */}
                {poll.id === -1 && <CreatePollButton currentPoll={ poll } />}
                {poll.id !== -1 && poll.status !== "closed" && <SaveChangesToPollButton currentPoll={ poll } />}
                {poll.id !== -1 && poll.status == 'unpublished' && <PublishPollButton currentPoll={ poll } />}
                {poll.id !== -1 && <DeletePollButton currentPoll={ poll } />}
            </div>


            {/* Poll Data */}
            <div className='flex flex-col space-y-12'>

                {/* Question Section */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Question" />
                    <Input
                        type="text"
                        value={poll.question}
                        onChange={(event) => 
                            setPoll((prevPoll) => ({
                                ...prevPoll, 
                                question: event.target.value, //Only update the question field
                            }))
            
                        }
                        disabled={ poll.status !== 'unpublished' }
                        placeholder="Enter the poll question..."
                        className="!text-base border border-yap-gray-200 rounded-xl text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-full pr-12 h-12"
                    />
                </div>


                {/* Question Description */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Description" />
                    <Textarea
                        value={poll.description}
                        onChange={(event) => 
                            setPoll((prevPoll) => ({
                                ...prevPoll, 
                                description: event.target.value, //Only update the description field
                            }))
                        }
                        disabled={ poll.status !== 'unpublished' }
                        placeholder="Enter the poll description..."
                        className="!text-base border border-yap-gray-200 rounded-xl text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-full pr-12 h-12"
                    />
                </div>


                {/* Question Type */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Question Type" />
                    <Select value={ poll.type } onValueChange={(value) => {
                        setPoll((prevPoll) => ({
                            ...prevPoll,
                            type: value,
                        }));
                        setCurrentOption('');
                    }}
                    disabled= { poll.status !== 'unpublished' }>
                        <SelectTrigger className="w-[180px] text-yap-black-800 rounded-xl text-base">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {POSSIBLE_POLL_TYPES.map((pollType: string) => (
                                <SelectItem value={pollType} key={pollType} className='font-afacad text-yap-black-800 text-base'>{ capitaliseFirstLetter(pollType) }</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                {/* Options */}
                {
                    (poll.type == "mcq") && 
                    <div className='flex flex-col space-y-4'>
                        <PageSubtitle pageSubtitle="Options" />
                        
                        {/* Options available */}
                        {
                            poll.options.length !== 0 &&
                            <div className="space-y-3">
                                {poll.options.map((option, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-4 h-4 border-2 border-yap-brown-900 rounded-full"></div>
                                            <span className="text-yap-black-800">{option}</span>
                                        </div>
                                        <Trash2Icon
                                            className='w-5 h-5 cursor-pointer ml-4 text-red-500 hover:text-red-400 duration-200'
                                            onClick={() => 
                                                setPoll((prevPoll) => ({
                                                    ...prevPoll,
                                                    options: prevPoll.options.filter((_, i) => i !== index)
                                                }))
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        }

                        {/* Add option */}
                        <div className='flex flex-row space-x-4'>
                            <Input
                            type="text"
                            placeholder="Enter a new option..."
                            value={ currentOption }
                            onChange={(e) => setCurrentOption(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleCreateNewOption();
                                }
                            }}
                            className="!text-base border border-yap-gray-200 rounded-xl text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-3/4 sm:w-1/2 lg:w-1/4 pr-12 h-12"
                            />

                            <button 
                                onClick={ handleCreateNewOption } 
                                className="flex justify-center items-center w-12 h-12 bg-yap-green-900 rounded-full hover:bg-yap-green-800 duration-200 focus:outline-none"
                            >
                                <PlusIcon className="text-white w-6 h-6" />
                            </button>
                        </div>

                    </div>
                }

                {/* Additional information */}
                <div className='flex flex-col space-y-4'>
                    <PageSubtitle pageSubtitle="Additional Information" />

                    <div className='text-base text-yap-black-800 flex flex-col space-y-4'>
                        <p><span className='text-yap-brown-900 text-lg'>Status:</span><br/>{ capitaliseFirstLetter(poll.status) }</p>
                        <p><span className='text-yap-brown-900 text-lg'>Date created</span><br/>{ poll.dateCreated }</p>
                        { poll.datePublished !== "" && <p><span className='text-yap-brown-900 text-lg'>Date published:</span><br/>{ poll.datePublished }</p>}
                        { poll.dateClosed !== "" && <p><span className='text-yap-brown-900 text-lg'>Date closed:</span><br/>{ poll.dateClosed }</p>}
                        <p><span className='text-yap-brown-900 text-lg'>Type:</span><br/>{ poll.isAiGenerated ? "AI-generated 🤖" : "User-generated 🧑" }</p>
                        { poll.reasoning !== "" && <p><span className='text-yap-brown-900 text-lg'>How did AI design this poll:</span><br/>{ poll.reasoning }</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
