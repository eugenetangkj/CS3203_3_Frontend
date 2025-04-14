"use client"

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { ScratchCard } from 'next-scratchcard';
import Image from "next/image";

/**
Represents an alert dialog that shows the reward for the citizen upon completing the poll.
*/
interface CitizenRewardPanelProps {
    isRewardPanelOpen: boolean,
    setIsRewardPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    collectiblePath: string
}


export function CitizenRewardPanel({ isRewardPanelOpen, setIsRewardPanelOpen, collectiblePath }: CitizenRewardPanelProps) {
    return (
        <AlertDialog open={ isRewardPanelOpen } onOpenChange={ setIsRewardPanelOpen }>
            <AlertDialogContent className='font-afacad' aria-describedby="collectible-description">
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Thanks for participating! Scratch to reveal your reward.</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex justify-center flex-col items-center space-y-2">
                    <p id='collectible-description' className='sr-only'>Reward</p>
                    <ScratchCard width={300} height={150} finishPercent={35} brushSize={15}>
                        <Image src={ collectiblePath } alt="Collectible" className="w-full h-full" height={150} width={300} />
                    </ScratchCard>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ () => { setIsRewardPanelOpen(false) }}>
                        Yay! ☺️
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>  
  )
}
