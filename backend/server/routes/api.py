import requests 
from datetime import datetime
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from dateutil.relativedelta import relativedelta
from server.utils.solution import generate_safety_advice

router = APIRouter(prefix="/api")

NEWSAPI_KEY = "acf3df4c285941829a60fa483e084105"
KEYWORDS = ['attack', 'violence', 'theft', 'shooting', 'assault', 'kidnap', 'fire', 'riot']

def fetch_news(city: str):
    one_month_ago = datetime.now() - relativedelta(months=1)
    from_date = one_month_ago.strftime('%Y-%m-%d')
    query = f"{city} {' OR '.join(KEYWORDS)}"
    url = (
        f'https://newsapi.org/v2/everything?'
        f'q={query}&'
        f'from={from_date}&'
        'sortBy=publishedAt&'
        'language=en&'
        'pageSize=10&'
        f'apiKey={NEWSAPI_KEY}'
    )
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('articles', [])
    else:
        print("Failed to fetch news:", response.status_code)
        return []

@router.get("/threats")
async def get_threats(location: str = Query(default="Surat")):
    news = fetch_news(location)
    dangerous_news = []
    for article in news:
        title = article.get('title', '')
        description = article.get('description', '')
        advice = generate_safety_advice(title, description)
        article['advice'] = advice
        dangerous_news.append(article)
    return JSONResponse(content={"news": dangerous_news})