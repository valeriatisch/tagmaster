# TAGMASTER

<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/57265123/83730511-78ef6600-a649-11ea-82de-3ac233918202.png">
</p>

Tagmaster is a web app for labeling pictures most commonly used for training Image Recognition AIs.  
It's completely **open source**. You can see the code to learn how it works, and contribute to help it improve.

## 📌 Project Management

We are using the scrum framework for our project with the following role distribution:

**Product Owners:** [Valeria](https://github.com/valeriatisch), [Felix](https://github.com/felixmoebius)

**Backend team:** [Felix](https://github.com/felixmoebius), [Atilla](https://github.com/Foggernaut), [Valeria](https://github.com/valeriatisch), [Rick](https://github.com/rikkce)

**Frontend team:** [Rumky](https://github.com/prez567), [Theo](https://github.com/TheoHtu), [Berkan](https://github.com/Berkan-C), [Nili](https://github.com/Nilinzm), [Rick](https://github.com/rikkce)

**DevOps:** [Felix](https://github.com/felixmoebius)

**QA:** [Rick](https://github.com/rikkce)

## 💬 Collaboration Tools

These are our communication tools:

* Telegram
* Zoom
* GitHub

## 🗂 Tech Stack

Below is a list of technologies we use at Tagmaster.

* 🎨 **Frontend:** [React](https://reactjs.org/)
* 🏗 **Backend:** [Gin Framework](https://github.com/gin-gonic/gin)
* 🎛 **Database:** [PostgreSQL](https://www.postgresql.org/)
* ☁️ **Cloud:** [Google Cloud Platform](https://cloud.google.com/gcp/?hl=de&utm_source=google&utm_medium=cpc&utm_campaign=emea-de-all-de-dr-bkws-all-all-trial-e-gcp-1009139&utm_content=text-ad-none-any-DEV_c-CRE_431049261082-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+EXA_1:1_DE_DE_General_Cloud_google+cloud+platform-KWID_43700053287067687-aud-606988878374:kwd-26415313501-userloc_9043013&utm_term=KW_google%20cloud%20platform-NET_g-PLAC_&ds_rl=1242853&ds_rl=1245734&ds_rl=1242853&ds_rl=1245734&utm_source=google&utm_medium=cpc&utm_campaign=emea-de-all-de-dr-bkws-all-all-trial-e-gcp-1003963&utm_content=text-ad-cretactr-any-DEV_c-CRE_431049261082-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+EXA_1:1_DE_DE_General_Cloud_google+cloud+platform-KWID_43700053287067687-aud-606988878374:kwd-26415313501-userloc_9043013&utm_term=KW_google%20cloud%20platform-ST_google+cloud+platform&gclid=CjwKCAjw0_T4BRBlEiwAwoEiARPaqdA7Jt6F1AEH8C9c48uY_6Mn9LgKMoXFrdnMgCit40C_vOROsxoCtbYQAvD_BwE)
* 🎩 **Deployment:** [Google App Engine](https://cloud.google.com/appengine?hl=de)
* 📨 **Email Service:** [SendGrid](https://sendgrid.com/)

## 📰 API Documentation
[Here](https://github.com/valeriatisch/tagmaster/tree/master/documentation) you can find the documentation of our backend API.

## 🙌 Want to Contribute?

We are open to all kind of contributions. If you want to:
* 🤔 share an idea
* 🐛 report an [issue](https://github.com/valeriatisch/tagmaster/issues)
* 📖 improve [documentation](https://github.com/valeriatisch/tagmaster/tree/master/documentation)
* 👩🏽‍💻contribute to the code

You are more than welcome.  
💬 You can reach us via our GitHub profiles or via contact@tagmaster.ml

## 🚀 Running Tagmaster locally

Let's setup Tagmaster locally. You need to setup the services required to run Tagmaster. Follow up the setups below to quickly get started.

## ⚙️ Setting Up Tagmaster

### → STEP #0

* Make sure **GoLang** is installed on your machine. Take a look at the [official guide](https://golang.org/doc/install) for installation.

### → STEP #1

* Clone the **[tagmaster](https://github.com/valeriatisch/tagmaster) repo**.

### → STEP #2

* You'll need a local **PostgreSQL** database. [Here](https://www.postgresql.org/docs/9.3/installation.html) you can find how to install and set it up.
* Create an account and a database.
* Create an environment variable called ```DATABASE_URI``` and set it to ```"host=localhost user=yourusername dbname=yourdatabase password=yourpassword"```.  
You may have to set additional variables.
* With common SQL queries you will be able to access the database.

### → STEP #3

* Firstly, go to ```/tagmaster``` and run the command ```go build main.go```.
* Secondly, go to ```/tagmaster/static``` and run the command ```npm start``` to start it in development mode.  
You may have to install missing module dependencies. In this case just run ```npm install```.

That's it! 🥂
