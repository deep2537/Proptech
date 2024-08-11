from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd 
df=pd.read_csv("real_estate_news_bandra.csv")
# print(df.columns)
analyzer=SentimentIntensityAnalyzer()
negative=[]
positive=[]
neutral=[]
for i in range(df.shape[0]):
    title=df.iloc[i,2]
    desc=df.iloc[i,-3]
    title_analyzed=analyzer.polarity_scores(title)
    desc_analyzed=analyzer.polarity_scores(desc)
    print(desc_analyzed)

    