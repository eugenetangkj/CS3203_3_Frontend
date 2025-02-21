/**
This component represents the subtitle of a page.
*/
interface PageSubtitleProps {
    pageSubtitle: string
}


export default function PageSubtitle({ pageSubtitle }: PageSubtitleProps) {
    return (
        <h2 className='text-yap-brown-900 font-bold text-2xl sm:text-3xl'>{ pageSubtitle }</h2>
    );

}