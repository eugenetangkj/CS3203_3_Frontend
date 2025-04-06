# Just Yap!

## About
Singaporeans frequently voice complaints on social media, but these platforms are cluttered with irrelevant content, making it hard to distill actionable insights. 

Just Yap! addresses this gap by collecting real-time complaints from social media, then using AI and machine learning to filter, categorise and analyse them. It visualises key insights to help authorities better understand public concerns. Additionally, Just Yap! generates AI-suggested polls, enabling government agencies to engage citizens on trending issues, fostering responsive and data-driven policymaking.

Currently, our real-time data collection pipeline collects complaints from the r/Singapore subreddit. In the future, we look forward to extending it to other sources like Facebook.

<div align="center">
    <img src="public/github/just-yap.gif" width="full" />
</div>


## Core Features (User-facing)
### Feature 1: View All Complaints
View the full list of social media complaints collected from our real-time data collection pipeline. 

**Operations supported (Admin):**
1. Search by keyword in title and description
2. Filter by category
3. Sort by date posted and sentiment (ascending, descending or none)
4. Browse up to 100 complaints per page


<div align="center">
    <br />
    <img src="public/github/all-complaints.png" width="full" />
</div>




### Feature 2: Polls
As an admin, engage the citizens with polls. Just Yap! offers AI-recommended poll templates based on complaints from the past 6 months, allowing you to engage citizens on trending issues.

As a citizen, have you voice heard by participating in polls and earn fun digital collectibles along the way.


**Operations supported (Admin):**
1. Browse poll templates
2. Create new MCQ or open-ended polls from scratch or based on existing poll templates
3. Edit or delete a poll
4. Publish a poll (Make polls live so citizens can participate)
5. Close a poll (Prevent further responses from citizens)
6. Republish a poll (Reopen closed polls to get more responses from citizens)
7. View poll responses + Export poll responses as CSV (Note: CSV export is supported for open-ended polls only)


**Operations supported (Citizen):**
1. Participate in polls.
2. Earn unique digital collectibles (Ps... There are 6 different ones to collect! 😉)


<div align="center">
    <br />
    <img src="public/github/polls.png" width="full" />
</div>


### Feature 3: Category Analytics
View category-specific analytics generated biannually, using complaint data from the past six months. For each category, the category analytics include:
- Summary
- Trending keywords
- ABSA results
- Concerns
- Suggestions
- Most negative complaints
- Statistics (Total number of complaints, sentiment score, forecasted sentiment)
- Number of complaints over time (Graph visualisation)
- Sentiment over time (Graph visualisation)

**Operations supported (Admin):**
1. View category analytics.
2. Download category analaytics as a PDF.


<div align="center">
    <br />
    <img src="public/github/category-analytics.png" width="full" />
</div>



### Feature 4: Analytics Dashboard
View overall analytics of complaints across all categories, offering a bird’s-eye view of key statistics and trends from the social media complaints.

**Operations supported (Admin):**

The admin can view all of the following in the analytics dashboard.
1. Number of complaints by category (Multi-select option for category)
2. Number of complaints by category over time (Multi-select option for category and date selector for time period)
3. Sentiments of categories (Multi-select option for category)
4. Number of complaints by sentiment
5. Sentiments of sources
6. Sentiments of categories over time (Multi-select option for category and date selector for time period)
7. Most negative complaints


<div align="center">
    <br />
    <img src="public/github/analytics-dashboard.png" width="full" />
</div>




## Tech Stack
Explain

## Development Setup
Explain

## Testing
Explain
