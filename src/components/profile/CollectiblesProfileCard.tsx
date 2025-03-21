import { User } from "@/types/User"
import Image from "next/image";
import { ALL_COLLECTIBLES, PATH_UNKNOWN_COLLECTIBLE_IMAGE } from "@/constants/Constants"

/** 
This component represents the profile card that contains the collectibles of the user.
It will only be rendered if the user is a citizen.
*/
interface CollectiblesProfileCardProps {
    user: User | undefined
}

export default function CollectiblesProfileCard({ user }: CollectiblesProfileCardProps ) {

    return (
        <div className={`bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-4 flex flex-col justify-between space-y-8`}>
            <h3 className='text-xl sm:text-2xl text-yap-brown-900 mb-6 self-center'>Collectibles</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 self-center w-full gap-x-4 gap-y-12">
                {ALL_COLLECTIBLES.map((collectible) =>
                    <div className='flex flex-col justify-center items-center col-span-1 space-y-2' key={ collectible.id }>
                        <Image src={ user?.collectibles.includes(collectible.path) ? collectible.path : PATH_UNKNOWN_COLLECTIBLE_IMAGE } alt={ collectible.name } height={150} width={150}
                            style={{ height: 'auto', objectFit: 'contain', position: 'relative' }}
                        />
                        <p className="text-yap-brown-900">{ user?.collectibles.includes(collectible.path) ? collectible.name : '???' }</p>
                    </div>

                )}
            </div>

            
        </div>

    )
   





}
