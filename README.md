# WRMC 91.1 FM Website - Sprint 3

[![Build Status](https://travis-ci.com/csci312-s21/project-blackberry-binturong.svg?branch=main)](https://travis-ci.com/csci312-s21/project-blackberry-binturong)

This application is the WRMC 91.1 FM Middlebury College Radio website. It will be a hub for listeners, DJs, and board members to view the schedule, listen to live shows, and engage with the radio community.

Here is a link to our [app on Heroku](https://wrmc-website.herokuapp.com/)

## Required Environment Variables

```
AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET
AUTH0_DOMAIN
NEXTAUTH_SECRET
NEXTAUTH_URL
DATABASE_URL
LASTFM_ROOT
LASTFM_KEY
```

## Setting up the Database

Run `npx knex migrate:latest` to initialize the database.

Run `npx knex seed:run` to seed the database.