# Sing me a Song
<p align="center" >
 <img src = "https://user-images.githubusercontent.com/87671165/144729793-8aadf069-cdfa-4d51-89b5-17ebb9588b27.gif" height = "350px"/>
</p>

## About

Are you very undecided? Well, I am, but we are lucky internet has become a life savior. In this API you can post some musics, upvote the ones you like the most and downvote the ones you don't enjoy. Based on those actions, Sing me a Song API has an algorithm which returns randomly the musics you've posted. You can also get your top voted musics only by setting the amount you want. Isn't that awesome? Your "I don't know which music I wanna choose" moments are over!!

## Features

The API has the following endpoints:

<details>
    <summary><strong>POST</strong>  /recommendations</summary>
    
* Adds a new music recommendation. The requisition has to follow the pattern bellow:
    
    ```json
    {
    	"name": "PingFong - Baby Shark",
    	"youtubeLink": "https://www.youtube.com/watch?v=XqZsoesa55w",
    }
    ```
    
    - Validation
        - `name` is a mandatory string
        - `youtubeLink` must be a youtube domain link
    - Return
        - Returns the JSON of the music you've registered:
            ```json
            {
              "id": 5,
              "name": "PingFong - Baby Shark",
              "score": 0,
              "youtubeLink": "https://www.youtube.com/watch?v=XqZsoesa55w"
            }
            ```
</details> 

<details>
    <summary><strong>POST</strong>  /recommendations/:id/upvote</summary>
    
- Adds a point to the score of the recommendation you've chosen.
- Returns the recommendation with the new score
</details> 

<details>
    <summary><strong>POST</strong> /recommendations/:id/downvote</summary>
    
- Remove a point of the recommendation you've chosen.
- If the score gets bellow -5, the recommendation'll be deleted.
- Returns the recommendation with the new score
</details>

<details>
    <summary><strong>GET</strong> /recommendations/random</summary>
    
> Receives a random recommendation based on the algorithm bellow:
- **70% of the times**: a music which score is above 10 will be recommended randomly;
- **30% of the times**: a música which score is between -5 e 10 (included) will be recommended randomly;
- In case there are only above 10 scores or only bellow or equal to 10 scores, any music will be recommended;
- In case there are no musics on the database, a statusCode 404 will be returned;

- The answer will follow the pattern bellow:

         ```json
            {
              "id": 5,
              "name": "PingFong - Baby Shark",
              "score": 230,
              "youtubeLink": "https://www.youtube.com/watch?v=XqZsoesa55w"
            }
            ```
</details>


<details>
    <summary><strong>GET</strong> /recommendations/top/:amount</summary>
    
> Returns the musics with the highest scores. Returns the top x(`:amount` parameter of the endpoint) musics, sorted by score
(highest first)
    
            [
                {
                  "id": 5,
                  "name": "PingFong - Baby Shark",
                  "score": 230,
                  "youtubeLink": "https://www.youtube.com/watch?v=XqZsoesa55w"
                },
                {
                    "id": 12,
                    "name": "George Michael - Careless Whispers",
                    "youtubeLink": "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
                    "score": 112
                },
                ...
            ]
</details>


## How to run?

You can use this url to make your requisitions: https://sing-me-a-song-backend.herokuapp.com, or run it locally following the steps bellow:

1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Run the front-end with
```bash
npm start
```
4. Open the file "database_backup.sql", then copy and paste the script on some database you'll create on your postgres terminal;

5. create an .env.dev file following the .env.example template using the credentials of the database you've created above;

6. Run the Back End with
```bash
npm start:dev
```

## What comes next?

## Tecnologies I Used

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)

## Get in touch!
[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/pina-pedrolucas)
[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pedrolucaspina22@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pedrolpin4/)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedrolpin4)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://api.whatsapp.com/send?phone=5521967431453&text=Olá,%20meu%20amigo!)
