/**
This component represennts the title of a page
*/
interface PageTitleProps {
    pageTitle: String
}


export default function PageTitle({ pageTitle }: PageTitleProps) {
    return (
        <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-4xl 2xl:text-5xl'>{ pageTitle }</h1>
    );

}