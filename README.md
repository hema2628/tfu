# tfu
1. install:

   pip install pymongo
   
   pip install eel
   
   pip install eel[jinja2]
   
   pip install tweepy
   
   pip install googletrans==4.0.0-rc1
   
2. Firstly, run "Gigaland/databaseMethods/DBMethods_authorinfo.py" to get tweeter list and establish/update database.
3. Run "Gigaland/databaseMethods/databaseCreation.py" to get user tweets and establish database. This process will keep working and refresh database every 5 minutes.
4. Run "Gigaland/startwebsite.py" to open website.
