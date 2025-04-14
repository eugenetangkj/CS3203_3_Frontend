import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { Document, Page, Text, View, StyleSheet, Image, Font, Link } from "@react-pdf/renderer";
import { COLOUR_MAP } from "@/constants/Constants";
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";
import { Complaint, ComplaintStatistics, MonthlyComplaintStatistics } from "@/types/Complaint";
import { getDateRangeForCategoryAnalytics } from "@/utils/HelperFunctions";


Font.register({ family: 'Afacad', src: '/fonts/Afacad-VariableFont_wght.ttf' });
const afacadFont = 'Afacad'


const styles = StyleSheet.create({
    page: {
        padding: 30,
        position: 'relative'
    },

    //Section
    section: {
        display: 'flex',        
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
    },

    //Subsection
    subsection: {
        display: 'flex',        
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },

    //Header
    header: { 
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: 30
    },
    headerText: { fontSize: 12, color: COLOUR_MAP['yap-brown-900'], fontFamily: afacadFont },
    logo: { width: 80, height: 24 },


    //Footer
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 30,
        textAlign: 'right',
        fontSize: 10,
        color: COLOUR_MAP['yap-black-800'],
        fontFamily: afacadFont
    },


    //Text
    title: { fontSize: 36, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'], fontWeight:'bold' },
    subtitle: { fontSize: 16, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'], fontWeight:'bold' },
    text: { fontSize: 12, fontFamily: afacadFont, color: COLOUR_MAP['yap-black-800'] },
    subtext: { fontSize: 10, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'] },


    //List
    unorderedList: {
        marginTop: 5,
        width: '95%'
    },
    listItem: {
        flexDirection: 'row', // Bullet and text in the same row
        alignItems: 'flex-start', // Align at the top
        marginBottom: 5,
    },
    listItemLast: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet: {
        fontSize: 10,
        marginRight: 5, // Ensure spacing between bullet and text
        width: 10, // Fixed width to prevent line breaks
        paddingTop: 2.5,
        textAlign: 'center',
    },


    //Table
    tableContainer: {
        width: '100%',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomStyle: 'solid',
        paddingVertical: 2,
    },
    headerRow: {
        backgroundColor: COLOUR_MAP['yap-brown-900'],
        fontWeight: 'bold',
    },
    headerCell: {
        flex: 1,
        padding: 2,
        fontSize: 10,
        textAlign: 'center',
        fontFamily: afacadFont,
        color: 'white'
    },
    cell: {
        flex: 1,
        padding: 2,
        fontSize: 10,
        textAlign: 'center',
        fontFamily: afacadFont,
        color: COLOUR_MAP['yap-black-800']
    },
    complaintHeaderCell: {
        flex: 1,
        padding: 2,
        fontSize: 10,
        textAlign: 'left',
        fontFamily: afacadFont,
        color: 'white'
    },
    complaintHeaderWiderCell: {
        flex: 2,
        padding: 4,
        fontSize: 10,
        textAlign: 'left',
        fontFamily: afacadFont,
        color: 'white'
    },

    complaintCell: {
        flex: 1,
        padding: 4,
        fontSize: 10,
        textAlign: 'left',
        fontFamily: afacadFont,
        color: COLOUR_MAP['yap-black-800']
    },
    complaintWiderCell: {
        flex: 2,
        padding: 4,
        fontSize: 10,
        textAlign: 'left',
        fontFamily: afacadFont,
        color: COLOUR_MAP['yap-black-800']
    }

  });



/**
This component represents the report that will be generated for category analytics.
 */
interface CategoryAnalyticsReportProps {
    categoryAnalytics: CategoryAnalytics,
    complaintStatistics: ComplaintStatistics,
    monthlyComplaintStatistics: MonthlyComplaintStatistics[],
    relevantComplaints: Complaint[]
}

const numberOfComplaintsPerPage = 14
const startingPageNumber = 4


//Make into smaller arrays for displaying
const chunkComplaintsArray = (array: any[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};


export const CategoryAnalyticsReport = ({ categoryAnalytics, complaintStatistics, monthlyComplaintStatistics, relevantComplaints }: CategoryAnalyticsReportProps) => {
    const complaintChunks = chunkComplaintsArray(relevantComplaints, numberOfComplaintsPerPage)
    const datesForCategoryAnalytics = getDateRangeForCategoryAnalytics(categoryAnalytics.date_created)

    return (
        <Document>
            {/* Page 1 */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                {/* Insert your logo/image here */}
                <Image src='/logo.png' style={styles.logo} />
                <Text style={styles.headerText}>Category Analytics Report</Text>
                </View>

                {/* Body */}
                <View style={styles.section}>
                    {/* Title */}
                    <Text style={styles.title}>{categoryAnalytics.name}</Text>

                    {/* Date */}
                    <View style={styles.subsection}>
                        <Text style={styles.subtitle}>Time Period for Analytics</Text>
                        <Text style={styles.subtext}>This refers to the time period during which the complaint&apos;s posted date falls, in order to generate analytics for this category.</Text>

                        <Text style={styles.text}>{`${datesForCategoryAnalytics[0].slice(3, 10)} to ${datesForCategoryAnalytics[1].slice(3, 10)}`}</Text>
                    </View>

                    {/* Summary */}
                    <View style={styles.subsection}>
                        <Text style={styles.subtitle}>Summary (AI-generated)</Text>
                        <Text style={styles.text}>{ categoryAnalytics.summary }</Text>
                    </View>

                    {/* Trending Keywords */}
                    {/* <View style={styles.subsection}>
                            <Text style={styles.subtitle}>Trending Keywords (AI-generated)</Text>
                            <Text style={styles.subtext}>These are the top keywords that appear in the complaints.</Text>
                            <View style={styles.unorderedList}>
                                {categoryAnalytics.keywords.slice(0, 8).map((keyword, index, array) => ( //For now, cap max keywords
                                    <View 
                                        style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                        key={keyword}
                                    >
                                        
                                        <Text style={styles.bullet}>•</Text> 

                                        
                                        <Text style={styles.text}>{keyword}</Text>
                                    </View>
                                ))}
                            </View>
                    </View> */}


                    {/* ABSA Results */}
                    <View style={styles.subsection}>
                            <Text style={styles.subtitle}>ABSA Results (AI-generated)</Text>
                            <Text style={styles.subtext}>Aspect-based sentiment analysis (ABSA) shows the sentiments of themes that emerged within the category, based on the complaints.</Text>
                            <View style={styles.unorderedList}>
                                {categoryAnalytics.absa_result.slice(0, 10).map((absaResult, index, array) => (
                                    <View 
                                        style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                        key={absaResult.theme}
                                    >
                                        {/* Bullet point */}
                                        <Text style={styles.bullet}>•</Text> 

                                        {/* Text container */}
                                        <Text style={styles.text}>{absaResult.theme} ({capitaliseFirstLetter(absaResult.sentiment)})</Text>
                                    </View>
                                ))}
                            </View>
                    </View>

                </View>

                {/* Footer */}
                <Text style={styles.footer}>1</Text>
            </Page>

            {/* Page 2 */}
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Image src='/logo.png' style={styles.logo} />
                    <Text style={styles.headerText}>Category Analytics Report</Text>
                </View>

                {/* Body */}
                <View style={styles.section}>
                    {/* Concerns */}
                    <View style={styles.subsection}>
                        <Text style={styles.subtitle}>Concerns (AI-generated)</Text>
                        <View style={styles.unorderedList}>
                            {categoryAnalytics.concerns.slice(0, 8).map((concern, index, array) => (
                                <View 
                                    style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                    key={ concern }
                                >
                                    {/* Bullet point */}
                                    <Text style={styles.bullet}>•</Text> 

                                    {/* Text container */}
                                    <Text style={styles.text}>{concern}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Suggestions */}
                    <View style={styles.subsection}>
                        <Text style={styles.subtitle}>Suggestions (AI-generated)</Text>
                        <View style={styles.unorderedList}>
                            {categoryAnalytics.suggestions.slice(0, 8).map((suggestion, index, array) => (
                                <View 
                                    style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                    key={ suggestion }
                                >
                                    {/* Bullet point */}
                                    <Text style={styles.bullet}>•</Text> 

                                    {/* Text container */}
                                    <Text style={styles.text}>{suggestion}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>

                {/* Footer */}
                <Text style={styles.footer}>2</Text>
            </Page>

            {/* Page 3 */}
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Image src='/logo.png' style={styles.logo} />
                    <Text style={styles.headerText}>Category Analytics Report</Text>
                </View>

                {/* Body */}
                <View style={styles.section}>
                    {/* Statistics */}
                    <View style={styles.subsection}>
                        <Text style={styles.subtitle}>Statistics</Text>
                        <Text style={styles.text}>Number of complaints over time period: { complaintStatistics.count } </Text>
                        <Text style={styles.text}>Average sentiment over time period: { complaintStatistics.avg_sentiment.toFixed(3) }</Text>
                        <Text style={styles.text}>Forecasted sentiment for { categoryAnalytics.date_created.slice(3, 10) }: { categoryAnalytics.forecasted_sentiment.toFixed(3) }</Text>
                    </View>

                    {/* Number of complaints and sentiment over time */}
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={[styles.row, styles.headerRow]}>
                            <Text style={styles.headerCell}>Date</Text>
                            <Text style={styles.headerCell}># Complaints</Text>
                            <Text style={styles.headerCell}>Average Sentiment</Text>
                        </View>

                        {/* Table Rows */}
                        {monthlyComplaintStatistics.map((monthlyData, index) => (
                            <View key={ monthlyData.date } style={styles.row}>
                                <Text style={styles.cell}>{monthlyData.date}</Text>
                                <Text style={styles.cell}>{monthlyData.data.count}</Text>
                                <Text style={styles.cell}>{monthlyData.data.avg_sentiment.toFixed(3)}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>3</Text>
            </Page>


            {/* Subsequent Pages */}
            {complaintChunks.map((chunk, index) => (
                 <Page size="A4" style={styles.page} key={index}>

                 {/* Header */}
                 <View style={styles.header}>
                     <Image src='/logo.png' style={styles.logo} />
                     <Text style={styles.headerText}>Category Analytics Report</Text>
                 </View>
 
                 {/* Body */}
                 <View style={styles.section}>
                    { index === 0 && <Text style={styles.subtitle}>List of Complaints</Text> }
                     <View style={styles.tableContainer}>
                         {/* Table Header */}
                         <View style={[styles.row, styles.headerRow]}>
                             <Text style={styles.complaintHeaderWiderCell}>Title</Text>
                             <Text style={styles.complaintHeaderWiderCell}>Description</Text>
                             <Text style={styles.complaintHeaderCell}>Date</Text>
                             <Text style={styles.complaintHeaderCell}>Category</Text>
                             <Text style={styles.complaintHeaderCell}>Source</Text>
                             <Text style={styles.complaintHeaderCell}>Sentiment</Text>
                         </View>
 
                         {/* Table Rows */}
                         {chunk.map((complaint, index) => (
                             <View key={ index } style={styles.row}>
                                 <Link style={styles.complaintWiderCell} src={complaint.url}>
                                     {complaint.title.length > 50
                                     ? complaint.title.slice(0, 50) + '...'
                                     : complaint.title
                                     }
                                 </Link>
                                 <Text style={styles.complaintWiderCell}>{
                                     complaint.description.length === 0 
                                     ? '[No description]' 
                                     : complaint.description.length > 50 
                                     ? complaint.description.slice(0, 50) + '...' 
                                     : complaint.description
                                 }</Text>
                                 <Text style={styles.complaintCell}>{complaint.date}</Text>
                                 <Text style={styles.complaintCell}>{complaint.category}</Text>
                                 <Text style={styles.complaintCell}>{complaint.source}</Text>
                                 <Text style={styles.complaintCell}>{complaint.sentiment.toFixed(3)}</Text>
                             </View>
                         ))}
                     </View>
                 </View>
 
                 {/* Footer */}
                 <Text style={styles.footer}>{ index + startingPageNumber }</Text>
             </Page>
            
        ))}




        </Document>
    )
}
