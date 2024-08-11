import pandas as pd
from serpapi import GoogleSearch
import gemini  # Replace with your actual Gemini library import

def serpapi_google_news_search(query, api_key):
    articles = []
    start = 0
    results_per_page = 10

    while True:
        params = {
            "engine": "google",
            "q": query,
            "tbm": "nws",
            "api_key": api_key,
            "start": start
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        news_results = results.get('news_results', [])

        if not news_results:
            break

        articles.extend(news_results)
        start += results_per_page

        if len(news_results) < results_per_page:
            break

    return articles

def fetch_news_for_localities(localities, api_key):
    all_articles = []
    for locality in localities:
        query = f"Real estate news in {locality}, Mumbai"
        print(f"Fetching news for: {query}")
        articles = serpapi_google_news_search(query, api_key)
        for article in articles:
            article['locality'] = locality
        all_articles.extend(articles)
    return all_articles

# Replace this with your actual SerpApi API key
api_key = "YOUR_SERPAPI_KEY"
mumbai_localities = [
    "Fort", "Nariman Point", "Marine Lines", "Churchgate",
    "Cuffe Parade", "Malabar Hill", "Girgaon", "Tardeo", "Byculla",
    "Bandra", "Khar", "Santacruz", "Juhu", "Vile Parle", "Andheri",
    "Jogeshwari", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar"
]

# Fetch news for all localities
all_articles = fetch_news_for_localities(mumbai_localities, api_key)

# Convert to DataFrame
df = pd.DataFrame(all_articles)

# Display the DataFrame
print(df.head())

# Optionally, save to a CSV file
filename = "real_estate_news_mumbai_localities.csv"
df.to_csv(filename, index=False)

print(f"DataFrame created with {len(df)} articles.")

# Example Gemini integration (replace with your actual code and API key)
gemini_client = gemini.Client("YOUR_GEMINI_API_KEY")

# Assuming you want to generate summaries for each article
for index, row in df.iterrows():
    article_text = row['title'] + ". " + row['description'] + ". " + row['link']
    summary = gemini_client.generate_text(article_text, max_tokens=100)
    df.loc[index, 'summary'] = summary

print(df.head())
