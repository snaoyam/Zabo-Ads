from flask import Flask
import time
import requests
import json
from bs4 import BeautifulSoup
import openai

openai.api_key = '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'
post_list = list()

def get_posts():
  def get_colors(url):
    # image = requests.get(url)
    return {'background_color': '#ffffff', 'text_color': '#000000'}
  def get_summary(title, description):
    # title_prompt = "핵심 단어 5개 이하로 ,로 구분해서 주체를 포함해서 요약해줘: {}".format(title)
    # title_resp = openai.Completion.create(
    #   model='text-davinci-003',
    #   prompt=title_prompt,
    #   temperature=0,
    #   max_tokens=100,
    #   top_p=1,
    # ).choices[0].text.strip()
    # short_title = ' '.join([l.strip() for l in title_resp.split(',')])
    # print(short_title)

    # des_prompt = '{0}을 위한 중요한 일정을 [날짜] 형식으로 일정만 알려줘: \n{1}'.format(short_title, description)
    # des_resp = openai.Completion.create(
    #   model='text-davinci-003',
    #   prompt=des_prompt,
    #   temperature=0,
    #   max_tokens=100,
    #   top_p=1,
    # ).choices[0].text.strip()
    
    # print(des_resp)

    return {'title': title, 'description': None}
    # short_description = ' '.join([l.strip() for l in title_resp.split(',')])

  global post_list
  url = 'https://zabo.sparcs.org/api/zabo/list'
  headers = {
      'accept': 'application/json, text/plain, */*',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-dest': 'empty',
      'accept-language': 'en-US,en;q=0.9',
      'if-none-match': 'W/"11cc3-nOdcIKO6GJGyswZvmklAG+VDS/I"',
      'sec-fetch-mode': 'cors',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
      'referer': 'https://zabo.sparcs.org/',
      # 'accept-encoding': 'gzip, deflate, br',
  }

  response = requests.get(url, headers=headers)
  post_list = [
    {
      'views': post.get('effectiveViews', 0),
      'author': post.get('owner', {}).get('name'),
      'author_img': post.get('owner', {}).get('profilePhoto'),
      'poster_img': post.get('photos', {})[0].get('url'),
      'updated_at': post.get('updatedAt'),
      **get_colors(post.get('photos', {})[0].get('url')),
      **get_summary(post.get('title'), BeautifulSoup(post.get('description').replace('<p>', '').replace('</p>', '\n'), 'html.parser').text)
    } for post in json.loads(response.text)
  ]



get_posts()

app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return json.dumps(post_list, ensure_ascii=False)

app.run(debug=True)
# host 등을 직접 지정하고 싶다면
  

if __name__=="__main__":
  app.run(host="localhost", port="5000", debug=True)