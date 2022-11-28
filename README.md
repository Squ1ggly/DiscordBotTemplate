# Description
Hi,
This is just my VERY opinionated discord bot template. The intention of this template is to make setting up a new discord bot fast and easy, should work out of the box. If there are any issues you can create an issue on Github => [HERE](https://github.com/Squ1ggly/DiscordBotTemplate/issues)

## Main Features 
Automatic help message generation, derived from command files.
Plenty of helper functions to help speed things up, like generating slash commands with a simple function.
Simple typing definitions that can be expanded easily to your code


## Help
To add commands you can just create a new file in either the prefix or slash command folder.
For example you can create randomQuote.ts as a file. It will be added to the help command automatically.

### How to run
PREREQUISITES
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nodejs 16 or later => Required
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yarn ===============> Optional
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you are using yarn, please remove package-lock.json OR yarn.lock if you are using npm
        
1. **DO THIS FIRST** => ***npm genenv*** OR ***yarn genenv*** : This will generate the .env file required for the bot to run.
2. After run **npm start:npm** OR **yarn start:yarn** in the terminal : This will start the bot. The packet manager can be interchanged i.e. **npm start:yarn** is valid.

## Extra Info for beginners
1. The Prefix commands are messages sent into a channel with a prefix e.g. "!ping" and have no special discord integrations.
2. The Slash commands have a special integration with discord and will prompt the user what they can do when they type "/". They can also take special arguments you define.