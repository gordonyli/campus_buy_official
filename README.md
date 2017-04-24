# CampusBuy
-
### Release Notes for CampusBuy v1.0.0
-
#### New Features for this Release 

* Recreated the Sell Form to be more intuitive
* Cleaned up database to include more product attributes like user id, etc.
* Updated search functionality to be more general
* Implemented Item description page
* New layout for user profile page
* Updated UI of Login and Register pages
* Added Item Description form in sell form
* Updated code architecture
* Implemented Bootstrap template to keep consistent UI across pages
* Moved Searchbar into navigation bar
* Pivoted to different color scheme for more pleasant viewing
* Updated UI of product list page after searching
* Email and phone number now is included in user profile
* Added a seller profile page that is linked to each item

#### Bug Fixes since last Release  

* My Cart now specific to each user
* Remove functionality works for My Market
* My Market now specific to each user
* Fixed layout issues on each page to make website more responsive for different screens


#### Known Bugs and Defects

* Search does not always work on the product listing screen
* Register does not send email verification token
* Product page still includes filter by Seller Rating

### Installation Guide for CampusBuy v1.0.0
-
#### Prerequisites  
CampusBuy is a website (web-based application) that is currently running on a heroku web-hosting service. It requires any web browser so Google Chrome, Mozilla Firefox, and Safari will run it. To simply access the website, navigate in your preferred web browser to www.campusbuy.herokuapp.com

#### Dependencies for Development 
1. Download heroku client from the heroku website (see https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. Make a heroku account 
3. Download node.js

#### Download Instructions
1. Navigate to https://github.com/gordonyli/campus_buy_official/
2. Click _Clone or Download_ to download the source files

#### Build
No build necessary for this app.

#### Installation
1. Open up a terminal, navigate to the correct directory, and run npm install to install any dependencies you need
2. git checkout [branch name] to navigate to whichever branch you run
4. To push changes, run heroku push master:[branch name]

#### Run instructions 
1. To run the heroku application, launch a terminal window and type heroku open
2. To run locally, type heroku local

### Miscellaneous Notes (from previous iterations)






-
#### Setup

1. Download heroku client from the heroku website (https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. Make a heroku account 
3. Download node.js

#### USING HEROKU WITH NODE

1. heroku login (login with heroku)
2. heroku create
3. git push heroku master
4. heroku ps:scale web=1 
5. heroku open (opens by the URL we give it)

#### CREATING NEW APP

1. git init
2. heroku create
3. create package.json
4. npm install (all this does is download all dependencies such as express)

#### MONGODB and MLAB

1. create mlab account
2. create database
3. create user
4. run heroku config:set MONGODB_URI='mongodb://adv:adv@ds033259.mlab.com:33259/campus_buy' in terminal

#### MIDDLEWARE CONNECTION

1. create a server.js file 


#### RESTFUL API

1. create a routes folder 
2. commands include post, get, delete, and put
3. git push heroku master 

#### RUN LOCALLY

1. heroku git:clone -a evening-escarpment-98449
2. heroku git:remote -a evening-escarpment-98449
3. heroku config:get MONGODB_URI -s >> .env