
/** 
This component represents the title used in each analytics dashboard component.
*/
interface AnalyticsDashboardTitleProps {
    readonly title: string
}

export default function AnalyticsDashboardTitle({ title }: AnalyticsDashboardTitleProps) {
    return (
        <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>{ title }</h3>           
  );
}
