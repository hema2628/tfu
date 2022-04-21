import time
import pymongo
import tweepy
import os
import sys

from bson import ObjectId

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
print(BASE_DIR)

myclient = pymongo.MongoClient('mongodb://localhost:27017/')

dblist = myclient.list_database_names()

comments_db = myclient["comments"]


def insert_comment(id,message):
    target_schema_name = "comments_for_" + id
    target_schema = comments_db[target_schema_name]
    localtime = time.asctime( time.localtime(time.time()) )

    comment_obj = {
        "commentor": "user1",
        "to":id,
        "message":message,
        "time":localtime,
        "following_comments":[],
    }

    target_schema.insert_one(comment_obj)



def show_comments(comment_to):
    target_schema_name = "comments_for_" + comment_to
    target_schema = comments_db[target_schema_name]

    comments_list = target_schema.find()

    return comments_list


def getCommentItem(holder,id):
    target_schema_name = "comments_for_" + holder
    target_schema = comments_db[target_schema_name]

    item = target_schema.find_one({"_id":ObjectId(id)})
    print(item)

    return item

def insert_f_comment(holder,id,commentor,msg):

    target_schema_name = "comments_for_" + holder
    target_schema = comments_db[target_schema_name]
    localtime = time.asctime( time.localtime(time.time()) )

    f_comment = {
        "commentor":commentor,
        "msg":msg,
        "time":localtime
    }

    target_schema.update_one({"_id":ObjectId(id)}, {'$addToSet': {'following_comments': f_comment}})
