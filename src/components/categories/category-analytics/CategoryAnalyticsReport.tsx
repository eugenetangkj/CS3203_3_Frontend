import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { COLOUR_MAP } from "@/constants/Constants";
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";
import { ComplaintStatistics } from "@/types/Complaint";


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

  });



/**
This component represents the report that will be generated for category analytics.
 */
interface CategoryAnalyticsReportProps {
    categoryAnalytics: CategoryAnalytics,
    complaintStatistics: ComplaintStatistics
}


export const CategoryAnalyticsReport = ({ categoryAnalytics, complaintStatistics }: CategoryAnalyticsReportProps) => (
    <Document>
        {/* Page 1 */}
        <Page size="A4" style={styles.page}>
            {/* Header with image and category name */}
            <View style={styles.header}>
            {/* Insert your logo/image here */}
            <Image src='/logo.png' style={styles.logo} />
            <Text style={styles.headerText}>Category Analytics Report</Text>
            </View>

            {/* Main content of the document */}
            <View style={styles.section}>
            {/* Title */}
            <Text style={styles.title}>{categoryAnalytics.name}</Text>

            {/* Date */}
            <View style={styles.subsection}>
                <Text style={styles.subtitle}>Time Period for Analytics</Text>
                <Text style={styles.subtext}>This refers to the time period during which the complaint's posted date falls, in order to generate analytics for this category.</Text>

                <Text style={styles.text}>10-2024 to 03-2025</Text>
            </View>

            {/* Summary */}
            <View style={styles.subsection}>
                <Text style={styles.subtitle}>Summary (AI-generated)</Text>
                <Text style={styles.text}>{ categoryAnalytics.summary }</Text>
            </View>

            {/* Trending Keywords */}
            <View style={styles.subsection}>
                    <Text style={styles.subtitle}>Trending Keywords (AI-generated)</Text>
                    <Text style={styles.subtext}>These are the top keywords that appear in the complaints.</Text>
                    <View style={styles.unorderedList}>
                        {categoryAnalytics.concerns.slice(0, 8).map((keyword, index, array) => ( //For now, cap max keywords
                            <View 
                                style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                key={index}
                            >
                                {/* Bullet point */}
                                <Text style={styles.bullet}>•</Text> 

                                {/* Text container */}
                                <Text style={styles.text}>{keyword}</Text>
                            </View>
                        ))}
                    </View>
            </View>


            {/* ABSA Results */}
            <View style={styles.subsection}>
                    <Text style={styles.subtitle}>ABSA Results (AI-generated)</Text>
                    <Text style={styles.subtext}>Aspect-based sentiment analysis (ABSA) shows the sentiments of themes that emerged within the category, based on the complaints.</Text>
                    <View style={styles.unorderedList}>
                        {categoryAnalytics.absa_result.slice(0, 8).map((absaResult, index, array) => (
                            <View 
                                style={index === array.length - 1 ? styles.listItemLast : styles.listItem} 
                                key={index}
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
                                key={index}
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
                                key={index}
                            >
                                {/* Bullet point */}
                                <Text style={styles.bullet}>•</Text> 

                                {/* Text container */}
                                <Text style={styles.text}>{suggestion}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Statistics */}
                <View style={styles.subsection}>
                    <Text style={styles.subtitle}>Statistics</Text>
                    <Text style={styles.subtext}>The forecasted sentiment is predicted for the month right after the time period used for this category analytics.</Text>
                    <Text style={styles.text}>Number of complaints: { complaintStatistics.count } </Text>
                    <Text style={styles.text}>Average sentiment: { complaintStatistics.avg_sentiment }</Text>
                    <Text style={styles.text}>Forecasted sentiment: { categoryAnalytics.forecasted_sentiment }</Text>
                </View>






            </View>

            {/* Footer */}
            <Text style={styles.footer}>2</Text>
        </Page>



    </Document>
);
