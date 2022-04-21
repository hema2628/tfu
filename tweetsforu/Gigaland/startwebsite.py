import datetime
import json

import pymongo

import eel
import os
import sys


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
from databaseMethods import DBMethods_authorinfo, databaseCreation,DBMethods_comments

eel.init('web')


# consumer_key = keys.API_key
# consumer_secret = keys.API_key_secret
# access_token = keys.Access_token
# access_token_secret = keys.Access_token_secret
#
#
# client = tweepy . Client (bearer_token = keys.bearer_token)
#
# auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret)
# auth.set_access_token(access_token, access_token_secret)
#
#
# api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

myclient = pymongo.MongoClient('mongodb://localhost:27017/')

tweets_db = myclient["tweets"]
tweeters_db = myclient["tweeters_info"]
tweetersinfo = tweeters_db["tweeters_info"]

@eel.expose
def get_IDlist():

    authorsList = DBMethods_authorinfo.get_authors_from_database()

    eel.init_page(authorsList)

    return authorsList


@eel.expose
def tweet_getter_by_Id(id):

    time_period = get_time()

    myquery_author = {"screen_name":id}
    author = tweetersinfo.find_one(myquery_author)
    start_date = time_period["start_time"]
    end_time = time_period["end_time"]


    public_tweets = tweets_db[id].find().sort("_id",-1).limit(20)
    json_list = []
    for tweet in public_tweets:
        # tweet['text'] = text_translator(tweet['text'])
        json_list.append(tweet)


    res_dict = {"author":author,
                "tweets":json_list}

    eel.creat_tweet_list(res_dict)

    return json_list


@eel.expose
def tweet_getter_by_Id_withlimit(id,amount):

    time_period = get_time()

    myquery_author = {"screen_name":id}
    author = tweetersinfo.find_one(myquery_author)
    start_date = time_period["start_time"]
    end_time = time_period["end_time"]


    public_tweets = tweets_db[id].find().sort("_id",-1).limit(amount)
    json_list = []
    for tweet in public_tweets:
        # tweet['text'] = text_translator(tweet['text'])
        json_list.append(tweet)


    res_dict = {"author":author,
                "tweets":json_list}

    eel.create_tif_cards(res_dict)

    return json_list



@eel.expose
def update_profit_loss(info):

    info_list = info.split(",")
    tweetid = info_list[0]
    tweeter_name = info_list[1]
    PL = info_list[2]
    databaseCreation.update_profit_loss(tweetid=tweetid,tweeter_name = tweeter_name,PL=PL)
    eel.search_tweets(tweeter_name)



def get_time():
    end_time = datetime.datetime.now()
    start_time = end_time + datetime.timedelta(days= -1)
    time_period = {
        "start_time":start_time,
        "end_time":end_time
    }

    return time_period


@eel.expose()
def insert_comment(comment_to,message):
    DBMethods_comments.insert_comment(comment_to,message)

@eel.expose()
def show_comments(comment_to):
    comments_list = DBMethods_comments.show_comments(comment_to)
    cl = []
    for i in comments_list:
        i['ID'] = str(i['_id'])
        cl.append(i)

    cl.reverse()
    eel.display_comments(cl)

@eel.expose()
def getCommentItem(holder,id):

    eel.getCommentItem(DBMethods_comments.getCommentItem(holder, id))


@eel.expose()
def insert_f_comment(holder,id,commentor,msg):
    print(holder,id,commentor,msg)
    DBMethods_comments.insert_f_comment(holder,id,commentor,msg)



eel.start('authors.html',port=8888)
