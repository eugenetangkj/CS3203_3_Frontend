#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
import pandas as pd
from pymongo import MongoClient, ASCENDING
from datetime import datetime
import ast
import os


def fill_na_values(raw_df, boolean_cols = []):
    string_cols = []
    number_cols = []

    for col in raw_df.columns:
        if raw_df[col].dtype == object:  
            string_cols.append(col)
        elif np.issubdtype(raw_df[col].dtype, np.number):
            number_cols.append(col)

    raw_df[string_cols] = raw_df[string_cols].fillna("")
    raw_df[number_cols] = raw_df[number_cols].fillna(0)

    for col in boolean_cols:
        raw_df[col] = raw_df[col].astype(bool)

    clean_df = raw_df.copy()
    return clean_df

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "CS3203"
COLLECTION_CATEGORIES = "categories"
COLLECTION_SOURCES = "sources"
COLLECTION_POSTS = "posts"
COLLECTION_COMPLAINTS = "complaints"
COLLECTION_CATEGORY_ANALYTICS = "category_analytics"
COLLECTION_USERS = "users"
COLLECTION_POLL_TEMPLATES = "poll_templates"
COLLECTION_POLLS = "polls"
COLLECTION_POLL_RESPONSES = "poll_responses"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# 1. Collection: categories

categories_data = [
    {"name": "Housing", "color": "#8D6E63"},  # Warm Earthy Brown - homes and buildings
    {"name": "Healthcare", "color": "#E74C3C"},  # Bold Red - urgency and medical cross color
    {"name": "Public Safety", "color": "#FF5733"},  # Vibrant Red-Orange - alert and emergency
    {"name": "Transport", "color": "#1ABC9C"},  # Teal - modern transport vibes
    {"name": "Education", "color": "#3498DB"},  # Bright Blue - trust and knowledge
    {"name": "Environment", "color": "#2ECC71"},  # Fresh Green - nature and sustainability
    {"name": "Employment", "color": "#F1C40F"},  # Bright Yellow - opportunities and career
    {"name": "Public Health", "color": "#E67E22"},  # Warm Orange - community wellness
    {"name": "Legal", "color": "#9C640C"},  # Deep Brown-Gold - traditional legal scales
    {"name": "Economy", "color": "#F39C12"},  # Golden Orange - wealth and finance
    {"name": "Politics", "color": "#5DADE2"},  # Sky Blue - governance and transparency
    {"name": "Technology", "color": "#8E44AD"},  # Purple - innovation and creativity
    {"name": "Infrastructure", "color": "#34495E"},  # Dark Gray-Blue - solid structures
    {"name": "Others", "color": "#95A5A6"}  # Neutral Gray - miscellaneous
]

categories_collection = db[COLLECTION_CATEGORIES]
categories_collection.drop()
categories_collection.insert_many(categories_data)
categories_collection.create_index([("name", 1)], unique=True)

print("Collection: categories inserted successfully!")

# 2. Collection: sources

sources_data = [
    {"name": "Reddit", "color": "#FF5733"}  # Vibrant Red-Orange
]

sources_collection = db[COLLECTION_SOURCES]
sources_collection.drop()
sources_collection.insert_many(sources_data)
sources_collection.create_index([("name", 1)], unique=True)

print("Collection: sources inserted successfully!")

# 3. Collection: posts
# print("Current working directory:", os.getcwd())
raw_df = pd.read_csv("./scripts/data/historical_posts.csv")
clean_df = fill_na_values(raw_df)
clean_df["date"] = pd.to_datetime(clean_df["date"], unit='s')
clean_df["comments"] = clean_df["comments"].apply(lambda i: i.split("|")).apply(lambda ls: [i for i in ls if i != "" and i != "[deleted]" and i != "[removed]"])
clean_df = clean_df.dropna()

posts_data = clean_df.to_dict(orient="records")

posts_collection = db[COLLECTION_POSTS]  
posts_collection.drop()
posts_collection.insert_many(posts_data)
posts_collection.create_index([("id", 1)], unique=True)
posts_collection.create_index([("created_utc", ASCENDING)])

print("Collection: posts inserted successfully!")

# 4. Collection: complaints

categories = {i["name"] for i in categories_data}

raw_df = pd.read_csv("./scripts/data/historical_complaints.csv")
clean_df = fill_na_values(raw_df)
clean_df["date"] = pd.to_datetime(clean_df["date"])
clean_df["url"] = clean_df["id"].apply(lambda i: f"https://www.reddit.com/r/singapore/comments/{i}/")
clean_df["source"] = clean_df["source"].apply(lambda i: i.title())
clean_df = clean_df[clean_df["date"] < datetime.now()]
clean_df = clean_df.dropna()

complaints_data = clean_df.to_dict(orient="records")

complaints_collection = db[COLLECTION_COMPLAINTS]  
complaints_collection.drop()
complaints_collection.insert_many(complaints_data)
complaints_collection.create_index([("id", 1)], unique=True)
complaints_collection.create_index([("title", "text"), ("description", "text")])

print("Collection: complaints inserted successfully!")

# 5. Collection: category_analytics

raw_df = pd.read_csv("./scripts/data/sample_category_analytics.csv")
clean_df = raw_df
clean_df["keywords"] = clean_df["keywords"].apply(ast.literal_eval)
clean_df["concerns"] = clean_df["concerns"].apply(ast.literal_eval)
clean_df["suggestions"] = clean_df["suggestions"].apply(ast.literal_eval)
clean_df["absa_result"] = clean_df["absa_result"].apply(ast.literal_eval).apply(lambda all: [{"theme": i.split(",")[0].lstrip(" ").rstrip(" "), "sentiment": i.split(",")[1].lstrip(" ").rstrip(" ")} for i in all])
category_analytics_data = clean_df.to_dict(orient="records")

category_analytics_collection = db[COLLECTION_CATEGORY_ANALYTICS]
category_analytics_collection.drop()
category_analytics_collection.insert_many(category_analytics_data)
category_analytics_collection.create_index([("name", 1)], unique=True)

print("Collection: category_analytics inserted successfully!")

# 6. Collection: users

users_collection = db[COLLECTION_USERS]
users_collection.drop()
users_collection.create_index([("email", 1)], unique=True)

print("Collection: users initialized successfully!")

# 7. Collection: poll_templates
raw_df = pd.read_csv("./scripts/data/sample_poll_templates.csv")
clean_df = raw_df
clean_df["options"] = clean_df["options"].apply(ast.literal_eval)
poll_templates_data = clean_df.to_dict(orient="records")

poll_templates_collection = db[COLLECTION_POLL_TEMPLATES]
poll_templates_collection.drop()
poll_templates_collection.insert_many(poll_templates_data)

print("Collection: poll_templates inserted successfully!")


# 8. Collection: poll_responses
poll_responses_collection = db[COLLECTION_POLL_RESPONSES]
poll_responses_collection.drop()
print("Collection: poll_responses reset successfully!")

# 9. Collection: polls
polls_collection = db[COLLECTION_POLLS]
polls_collection.drop()
print("Collection: polls reset successfully!")



# %%
