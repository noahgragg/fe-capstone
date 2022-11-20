# DEV Shack
This application is a digital portfolio platform that allows users to create and manage an individual profile. The profile allows users to
give a summary about themsevles, post a profile picture, add a link to their LinkedIn and GitHub profiles, and highlight specific projects
they have developed or contributed to. The intention is for users to be able to give the site link to outside agenceis and recruiters
to showcase their work as software developers.
## Authors

- [@Joe Low](https://github.com/Lowjoejoe)
- [@Noah Gragg](https://github.com/noahgragg/fe-capstone)
- [@Jeff Kelley](https://github.com/Jpkelley6)
- [@Brandon Adviento](https://github.com/Bwade808)
- [@Hali Usman-Isiaka](https://github.com/HAliUsm)
- [@Idris Yusuf](https://github.com/daleyusuf23)


## Start Guide 

Fork and clone this repo. Then run the following code. 

``` bash 
//Start the data server//
cd back-end
cd dataServer
npm install 
npm start

//Start the authorization server//
cd back-end
cd authServer
npm install
npm run devStart

//Start the React developer tool//
cd frontend
npm install
npm start
```
    
## Features
- Users can create an account, log-in with their account email, and manage their personal profile
- Upload and change profile pictures
- Add LinkedIn and Github portfolio links
- Add individual project summaries and contributions
## Lessons Learned
- Git workflow management
- Authorization token
- Local storage to manage current signed in user
- Effectively using routes (React Router)


## Tech Stack

**Client:** React, CSS, HTML, Bcrypt, AWS S3

**Server:** Node, Express, JSON Web Token, PostgreSQL


## Roadmap

- Delete function to remove projects from user profile