# hextechhunt

HextechHunt is a web application that will allow League of Legends players to keep track of their Hextech Chest rewards via Champion Mastery for the current season. Players can enter their Summoner name and select their Region to view a comprehensive list of Champions that they have played, and see whether or not they have been granted a Hextech Chest as a reward for Champion Mastery (by either themselves or a teammate). The list will also indicate which Champions hold significant potential to reward the player with a Chest if they have not been rewarded already.

## Live URL
URL will be here soon.

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
Here is an overview of the app's bread and butter components at work:

![alt tag](hextechhunt-overview.png)

## Experiences and Challenges
Although I am very well aware that this app is basic, and that many entries in the Riot Games API Challenges demonstrate phenomenal experience in design, development, data analysis, etc., I took the development of this app as an opportunity to learn and grow. The majority of my development experience comes from back-end development both academically and profressionally. Only recently did I start getting into front-end development and frameworks such as AngularJS and Node. Hence, I took all that I knew, learned and did what I could, and ended up with *HextechHunt*.

Some challenges I faced:
+ I am a full-time employee, so I had to be efficient with time management.
+ When implementing the Results using Champion and ChampionMastery data, my JavaScript promises were misbehaving >:( I had to carefully analyze my returned promises and come up with a way to enforce data integrity.
+ I had some issues with the Static Data, primarily with the Champion (square) images. I had to convert the names of some of the Champions with camel-case names; e.g. *LeBlanc* had to get converted to *Leblanc*. However, *Rek'Sai* only had to lose the apostrophe, and keep its camel-case name (?). Finally, there is *Wukong*, who had to get converted to *MonkeyKing*. Figured that out thanks to this [forum discussion](https://developer.riotgames.com/discussion/community-discussion/show/p7fE97po).

## How to Run Locally
### Prerequisites
+ Make sure [Git](https://git-scm.com/) in installed and configured on your machine.
+ Obtain an API key from [Riot Games Developers](https://developer.riotgames.com/) site.
+ Create an environment variable called **RIOT_API_KEY** to reflect this key. Example: `export RIOT_API_KEY="my-riot-api-key-goes-here"`

### Steps
+ Install [Node.js](https://nodejs.org/en/) and [Npm](https://www.npmjs.com/). I believe the Node.js installer for Windows and Mac will also install Npm for you, while Linux users will be required to install it separately via their package manager. Please double check though! You can check your installation of Node.js via command-line: `node --version`. The same can be done for Npm: `npm --version`.
+ Clone this repository to a location of your choosing: `git clone https://github.com/abaran30/hextechhunt.git`
+ Inside the project folder will be two additional folders: *hextechhunt-client* and *hextechhunt-server*. Run the `npm install` command in **both** of those folders.
+ After you verify a successful installation of dependencies (a *node_modules* folder will appear in both *hextechhunt-client* and *hextechhunt-server*), you will now need to run two processes. I recommend having two terminal instances open for this; one for each process. For the first process, in *hextech-client*, run command `http-server`. If successful, you should see output like the following:
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.2:8080
Hit CTRL-C to stop the server
```
+ For the second process, in *hextech-server*, run command `npm start`. If successful, you should see output like the following:
```

> hextechhunt-server@0.0.1 start /home/some/path/hextechhunt/hextechhunt-server
> node index.js

HextechHunt (Server) started at http://localhost:3030
```

+ At this point, the application is running locally! Open up your favorite browser and navigate to http://localhost:8080. If all went well, you will be in HextechHunt!

## Special Thanks
Special thanks to Riot Games for giving us the opportunity to create these awesome, game-data-driven applications. Win or lose this API Challenge (April 2016), it has been a most pleasurable experience to create my own application featuring Riot Games data and League of Legends. Developing this app helped me learn more about the aforementioned technologies and API-driven development in general, and for that I am grateful.

## Disclaimer

*HextechHunt* isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing *League of Legends*.
*League of Legends* and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
