from flask import Flask, make_response, jsonify
import time
import requests
import json
from bs4 import BeautifulSoup
import openai
import random
from PIL import Image
from io import BytesIO
from sklearn.cluster import KMeans
import numpy as np

openai.api_key = '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'
post_list = list()

def get_posts():
  def get_colors(url, id):
    print(id)
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert("RGBA")
    resized_img = img.resize((192, 192))

    rw, rh = resized_img.size
    thickness = 6
    for x in range(thickness, rw - thickness):
      for y in range(thickness, rh - thickness):
        resized_img.putpixel((x,y),(0,0,0,0))

    pixels = np.array(list(resized_img.getdata()))
    kmeans = KMeans(n_clusters = 1, n_init=10)
    kmeans = kmeans.fit(pixels)
    centroids = kmeans.cluster_centers_
    [r,g,b,a] = centroids[0]
    r,b,g = int(r),int(g),int(b)
    background_color = ('#%02x%02x%02x' % (r,g,b)).upper()
    text_color = '#000000' if (r*0.299 + g*0.587 + b*0.114) > 186 else '#FFFFFF'

    # datas = img.getdata()
    # newData = []
    # delta = 70
    # for item in datas:
    #     if item[0] in range(r-delta, r+delta) and item[1] in range(g-delta, g+delta) and item[2] in range(b-delta, b+delta):
    #         newData.append((255, 255, 255, 0))
    #     else:
    #         newData.append(item)

    # img.putdata(newData)
    # img.save('output/{}.png'.format(id), 'png')

    return {'background_color': background_color, 'text_color': text_color}
  
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
      'sec-fetch-mode': 'cors',
      'user-agent': 'Mozilla/5.0',
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
      'url': 'https://zabo.sparcs.org/zabo/{}'.format(post.get('_id')),
      **get_colors(post.get('photos', {})[0].get('url'), post.get('_id')),
      **get_summary(post.get('title'), BeautifulSoup(post.get('description').replace('<p>', '').replace('</p>', '\n'), 'html.parser').text)
    } for post in json.loads(response.text)
  ]

def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


get_posts()
# print(post_list)

app = Flask(__name__)
@app.route('/') # 접속하는 url
def index():
  return build_actual_response(make_response(json.dumps(random.choice(post_list), ensure_ascii=False)))


# app.run(debug=True)
# host 등을 직접 지정하고 싶다면
  

if __name__=="__main__":
  app.run(host='0.0.0.0', port="5000", debug=True)