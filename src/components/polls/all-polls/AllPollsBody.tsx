"use client"

import PollTemplatesSection from "@/components/polls/all-polls/PollTemplatesSection";
import UnpublishedPollsSection from "@/components/polls/all-polls/UnpublishedPollsSection";
import ClosedPollsSection from "@/components/polls/all-polls/ClosedPollsSection";
import OngoingPollsSection from "@/components/polls/all-polls/OngoingPollsSection";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { ERROR_MESSAGE_API } from "@/constants/Constants";
import { UserRoleEnum } from "@/types/User";
import PollCardsSkeleton from "../PollCardsSkeleton";

/** 
Body for the polls page which conditionally renders sections depending on the user's role
*/

export default function AllPollsBody() {
    const { data, error, isLoading } = useUserProfile();

    return (
        isLoading
        ? <div className='flex flex-col space-y-4'> 
            <Skeleton className='h-[30px] w-[240px]' />
            <PollCardsSkeleton />
          </div>
        : (error)
        ? <div>{ ERROR_MESSAGE_API }</div>
        : <div className="flex flex-col space-y-12">
            <OngoingPollsSection />
            <ClosedPollsSection />
            { data?.role === UserRoleEnum.Admin ? <UnpublishedPollsSection /> : null}
            { data?.role === UserRoleEnum.Admin ? <PollTemplatesSection /> : null}
        </div>
    );
}
