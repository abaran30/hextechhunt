# HextechHunt

HextechHunt is a web application that will allow League of Legends players to keep track of their Hextech Chest rewards via Champion Mastery for the current season. Players can enter their Summoner name and select their Region to view a comprehensive list of Champions that they have played, and see whether or not they have been granted a Hextech Chest as a reward for Champion Mastery (by either themselves or a teammate). The list will also indicate which Champions hold significant potential to reward the player with a Chest if they have not been rewarded already.

## Live Demo
Demo can be found [here](http://104.236.80.122:8080/).

## The Technologies and Libraries
+ [AngularJS (1.5.5)](https://angularjs.org/)
+ [Node.js (5.11.0)](https://nodejs.org/en/)
+ [Npm (3.8.7)](https://www.npmjs.com/)
+ [Express (4.13.1)](http://expressjs.com/)
+ [jQuery (2.2.3)](https://jquery.com/)
+ [Normalize.css (4.1.1)](https://necolas.github.io/normalize.css/)
+ [Heartcode CanvasLoader (0.9.1)](https://github.com/heartcode/CanvasLoader)
+ [Ionicons (2.0.1)](http://ionicons.com/)

## Overview and Control Flow
Here is an overview of the application's bread and butter components at work:

![alt tag](hextechhunt-overview.png)

## Experiences and Challenges
Although I am very well aware that this application is simple, and that many Riot Games API Challenge entries demonstrate phenomenal skills in design, development, data analysis, etc., I took the development of this application as an opportunity to learn and grow. The majority of my development experience comes from back-end development both academically and professionally. Only recently did I start getting into front-end development and frameworks such as AngularJS and Node.js. Hence, I took all that I knew, learned and did what I could, and ended up with *HextechHunt*.

Some challenges I faced:
+ I am a full-time employee, so time management was a big challenge.
+ When implementing the Results using Champion and ChampionMastery data, my JavaScript promises were misbehaving >:( I had to carefully analyze my returned promises and come up with a way to enforce data integrity.
+ I had some issues with the Static Data, primarily with the Champion (square) images. I had to convert the names of some of the Champions with camel-case names; e.g. *LeBlanc* had to get converted to *Leblanc*. However, *Rek'Sai* only had to lose the apostrophe, and keep its camel-case name (?). Finally, there is *Wukong*, who had to get converted to *MonkeyKing*. Figured that out thanks to this [forum discussion](https://developer.riotgames.com/discussion/community-discussion/show/p7fE97po).

## If I Had Extra Time, I Would Have Liked To...
+ Learn and utilize a web framework to simplify my implementation.
+ Allow sorting the results in the Results view.
+ Come up with a more sophisticated way of predicting which Champions hold significant potential to reward the player with a Chest, if they have not been rewarded already.
+ End to end testing with [Protractor](http://angular.github.io/protractor/#/).
+ Make the application more responsive for better mobile viewing.
+ Generally improve styling.

## How to Set Up and Run Locally
### Prerequisites
+ Make sure [Git](https://git-scm.com/) is installed and configured on your machine.

+ Obtain an API key from the [Riot Games Developers](https://developer.riotgames.com/) site.

+ Create an environment variable called **RIOT_API_KEY** to reflect this key. Example, `export RIOT_API_KEY="riot-api-key-goes-here"`.

### Steps
+ Install [Node.js](https://nodejs.org/en/) and [Npm](https://www.npmjs.com/). I believe the Node.js installer for Windows and Mac will also install Npm for you, while Linux users will be required to install them separately via package manager. Please double check though! You can check your installation of Node.js with `node --version` or `nodejs --version`. The same can be done for Npm with `npm --version`.

+ Install [http-server](https://www.npmjs.com/package/http-server) globally with `npm install http-server -g`.

+ Clone this repository to a location of your choosing with `git clone https://github.com/abaran30/hextechhunt.git`

+ Inside the project folder will be two additional folders: *hextechhunt-client* and *hextechhunt-server*. Run `npm install` in **both** folders.

+ After you verify a successful installation of dependencies (a *node_modules* folder will appear in both *hextechhunt-client* and *hextechhunt-server*), you will now need to run two processes. I recommend having two terminal instances open for this; one for each process. For the first process, in *hextech-client*, run `http-server`. If successful, you should see output like the following:
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.2:8080
Hit CTRL-C to stop the server
```

+ For the second process, in *hextech-server*, run `npm start`. If successful, you should see output like the following:
```

> hextechhunt-server@0.0.1 start /home/some/path/hextechhunt/hextechhunt-server
> node index.js $HOST

HextechHunt (Server) started at http://localhost:3030
```

+ At this point, the application is running locally! Open up your favorite browser (Google Chrome or Firefox recommended) and navigate to http://localhost:8080. If all went well, you will be in *HextechHunt*!

### Notes for Development
When the project is running locally, keep in mind of the following:
+ Changes made to the code/markup in *hextech-client* should be reflected in the application immediately upon browser refresh. If for some reason you are not seeing your changes in the application, check to make sure the `http-server` is still running and clear your browser's cache.
+ Changes made to the code in *hextech-server* will require a server restart. Simply kill the server process (Ctrl + C) and re-run `npm start` in *hextech-server*.

## Special Thanks
Special thanks to Riot Games for giving us the opportunity to create these awesome, game-data-driven applications. Win or lose the April 2016 API Challenge, it has been a most pleasurable experience to create my own application featuring Riot Games data and League of Legends. Developing this application helped me learn more about the aforementioned technologies and API-driven development in general, and for that I am very grateful.

## Disclaimer

*HextechHunt* isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing *League of Legends*.
*League of Legends* and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
