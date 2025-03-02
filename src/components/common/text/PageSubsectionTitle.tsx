/**
This component represents the subsection title of a page.
*/
interface PageSubsectionTitleProps {
    subsectionTitle: string
}


export default function PageSubsectionTitle({ subsectionTitle }: PageSubsectionTitleProps) {
    return (
        <h3 className='text-yap-brown-900 font-bold text-xl sm:text-2xl'>{ subsectionTitle }</h3>
    );

}