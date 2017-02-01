# campus_buy_official

******************************************SETUP******************************************

1. Download heroku client from the heroku website (https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. Make a heroku account 
3. Download node.js

**********************************USING HEROKU WITH NODE**********************************

1. heroku login (login with heroku)
2. heroku create
3. git push heroku master
4. heroku ps:scale web=1 
5. heroku open (opens by the URL we give it)

*************************************CREATING NEW APP*************************************

1. git init
2. heroku create
3. create package.json
4. npm install (all this does is download all dependencies such as express)

*************************************MONGODB and MLAB*************************************

1. create mlab account
2. create database
3. create user
4. run heroku config:set MONGODB_URI='mongodb://adv:adv@ds033259.mlab.com:33259/campus_buy' in terminal

**********************************MIDDLEWARE CONNECTION**********************************

1. create a server.js file 


***************************************RESTFUL API***************************************

1. create a routes folder 
2. post, get delete, put command
3. git push heroku master 
