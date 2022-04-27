# tfu
1. install:

   pip install pymongo
   
   pip install eel
   
   pip install eel[jinja2]
   
   pip install tweepy
   
   pip install googletrans==4.0.0-rc1
   
2. 首先运行Gigaland/databaseMethods/DBMethods_authorinfo.py来获取tweeter列表并建立和更新数据库
3. 运行Gigaland/databaseMethods/databaseCreation.py来获取用户推文信息并建立数据库 该程序持续运行，会每间隔五分钟更新一次数据库
4. 运行Gigaland/startwebsite.py打开网页 
