import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { COLOUR_MAP } from "@/constants/Constants";


Font.register({ family: 'Afacad', src: '/fonts/Afacad-VariableFont_wght.ttf' });
const afacadFont = 'Afacad'


const styles = StyleSheet.create({
    page: { padding: 30 },

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


    //Text
    title: { fontSize: 36, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'], fontWeight:'bold' },
    subtitle: { fontSize: 16, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'], fontWeight:'bold' },
    text: { fontSize: 12, fontFamily: afacadFont, color: COLOUR_MAP['yap-black-800'] },
    subtext: { fontSize: 10, fontFamily: afacadFont, color: COLOUR_MAP['yap-brown-900'] },


    //List
    unorderedList: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    listItem: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 4,
        marginBottom: 5,
    },
      bullet: {
        width: 4,
        height: 4,
        borderRadius: 3,
        backgroundColor: COLOUR_MAP['yap-black-800'], // Bullet color
        marginRight: 8,
        marginTop: 2,
      },

  });



/**
This component represents the report that will be generated for category analytics.
 */
interface CategoryAnalyticsReportProps {
    categoryAnalytics: CategoryAnalytics
}


export const CategoryAnalyticsReport = ({ categoryAnalytics }: CategoryAnalyticsReportProps) => (
  <Document>
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

            <Text style={styles.text}>01-2025 to 03-2025</Text>
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
            {categoryAnalytics.keywords.slice(0, 8).map((keyword, index) => ( //For now, cap max keywords
                <View style={styles.listItem} key={index}>
                    <View style={styles.bullet} />
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
            {categoryAnalytics.absa_result.slice(0, 8).map((absaResult, index) => ( //For now, cap max ABSA results
                <View style={styles.listItem} key={index}>
                    <View style={styles.bullet} />
                    <Text style={styles.text}>{ absaResult.theme }({ absaResult.theme })</Text>
                </View>
            ))}
            </View>
        </View>






      </View>
    </Page>
  </Document>
);
