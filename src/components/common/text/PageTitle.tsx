/**
This component represents the title of a page.
*/
interface PageTitleProps {
    pageTitle: string
}


export default function PageTitle({ pageTitle }: PageTitleProps) {
    return (
        <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-4xl'>{ pageTitle }</h1>
    );

}