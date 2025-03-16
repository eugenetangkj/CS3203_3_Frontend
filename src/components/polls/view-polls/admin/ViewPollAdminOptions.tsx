"use client"

import { Poll, PollStatusEnum } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Trash2Icon } from "lucide-react"
import { PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

/**
Represents the options field that the admin views for each poll. It is only editable
if the poll is unpublished and if it is a MCQ question.
*/
interface ViewPollAdminOptionsProps {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function ViewPollAdminOptions({ currentPoll, setPoll }: ViewPollAdminOptionsProps) {
    //State to track what is being typed in the current field for adding an option
    const [currentOption, setCurrentOption] = useState<string>('')


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
            <PageSubtitle pageSubtitle="Options" />
            {
                currentPoll.options.length !== 0 &&
                <div className="pl-3 space-y-3">
                    {/* Existing options */}
                    <ul className="space-y-4 text-yap-black-800">
                        {currentPoll.options.map((option, index) => (
                            <li key={index} className="flex items-center justify-between gap-4 relative before:content-['•'] before:absolute before:left-[-10px] before:text-yap-black-800 before:text-3xl">
                                 <span className="pl-4 flex-1 break-words">{option}</span> 
                                {currentPoll.status === PollStatusEnum.Unpublished && (
                                    <Trash2Icon
                                        className="w-5 h-5 min-w-5 max-w-5 cursor-pointer text-red-500 hover:text-red-400 duration-200"
                                        onClick={() =>
                                            setPoll((prevPoll) => ({
                                                ...prevPoll,
                                                options: prevPoll.options.filter((_, i) => i !== index),
                                            }))
                                        }
                                    />
                                )}
                            </li>
                        ))}
                    </ul>

                </div>
            }
            {/* Add new option */}
            { currentPoll.status == PollStatusEnum.Unpublished &&
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
                    className="!text-base border border-yap-gray-200 rounded-xl text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-3/4 sm:w-1/2 lg:w-1/4 pr-12 h-10"
                    />
                    <button 
                        onClick={ handleCreateNewOption } 
                        className="flex justify-center items-center w-10 h-10 bg-yap-green-900 rounded-full hover:bg-yap-green-800 duration-200 focus:outline-none"
                    >
                        <PlusIcon className="text-white w-6 h-6" />
                    </button>
                </div>
            }
        </div> 
    )
}
