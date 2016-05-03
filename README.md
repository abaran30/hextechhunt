# hextechhunt

HextechHunt is a web application that will allow League of Legends players to keep track of their Hextech Chest rewards via Champion Mastery for the current season. Players can enter their Summoner name and select their Region to view a comprehensive list of Champions that they have played, and see whether or not they have been granted a Hextech Chest as a reward for Champion Mastery. The list will also indicate which Champions hold a significant potential to reward the user with a Chest if they have not been rewarded already.

## The Technologies and Libraries
+ [AngularJS (1.5.5)](https://angularjs.org/)
+ [Node.js (5.11.0)](https://nodejs.org/en/)
+ [Npm (3.8.7)](https://www.npmjs.com/)
+ [Express (4.13.1)](http://expressjs.com/)
+ [jQuery (2.2.3)](https://jquery.com/)
+ [Normalize.css (4.1.1)](https://necolas.github.io/normalize.css/)
+ [Heartcode CanvasLoader (0.9.1)](https://github.com/heartcode/CanvasLoader)

## Overview and Control Flow

## Experiences and Challenges
Although I am very well aware that this app is basic, and that many entries in the Riot Games API Challenges demonstrate phenomenal experience in design, development, data analysis, etc., I took the development of this app as an opportunity to learn and grow. The majority of my development experience comes from back-end development both academically and profressionally. Only recently did I start getting into front-end development and frameworks such as AngularJS and Node. Hence, I took all that I knew, learned and did what I could, and ended up with *HextechHunt*.

Some challenges I faced:
+ I am a full-time employee, so I had to be efficient with time management.
+ When implementing the Results using Champion and ChampionMastery data, my JavaScript promises were misbehaving >:( I had to carefully analyze my returned promises and come up with a way to enforce data integrity.
+ I had some issues with the Static Data, primarily with the Champion (square) images. I had to convert the names of some of the Champions with camel-case names; e.g. *LeBlanc* had to get converted to *Leblanc*. However, *Rek'Sai* only had to lose the apostrophe, and keep its camel-case name (?). Finally, there is *Wukong*, who had to get converted to *MonkeyKing*. Figured that out thanks to this [forum discussion](https://developer.riotgames.com/discussion/community-discussion/show/p7fE97po).

## Special Thanks
Special thanks to Riot Games for giving us the opportunity to create these awesome, game-data-driven applications. Win or lose this API Challenge (April 2016), it has been a most pleasurable experience to create my own application featuring Riot Games data and League of Legends. Developing this app helped me learn more about the aforementioned technologies and API-driven development in general, and for that I am grateful.

## Disclaimer

*HextechHunt* isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing *League of Legends*.
*League of Legends* and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
