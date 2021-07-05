# DiscordEventBot
The idea behind this project is, to have a simple tool to plan on different events.
Me and a few friends often had the problem, that we never knew who would come to meetup and who still needed more information
What this bot should be capable of:

 - Create events
 - Manage information of an event (like location and time)
 - Subscribe/Unsubscribe to an event, to start/stop receiving information about it
 - Notification when a new event is created, to inform everyone about it
 
Each event will have its own channel, where only subscribed people will have access to.

For v1 the bot is designed to only work on a single server and without a database, in later versions, this will probably change.

# Commands
Following commands are currently planned:

|command&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|description|status|
|:--|:--|:--|
|`!ev commands [showDetails=false]`|Shows all available commands, if wanted, it shows a bit more detailed list, including usage of each command|:heavy_check_mark:|
|`!ev help <command>`|Shows all available commands, can also show a more detailed list if wanted|:heavy_check_mark:|
|`!ev init <channelname/id>`|Creates hub channel, in which information about new events is shared|:x:|
|`!ev create <eventName>`|Create an event|:x:|
|`!ev sub <eventName>`|Subscribe to an event|:x:|
|`!ev unsub <eventName>`|Unsubscribe to an event|:x:|
|`!ev edit <option> <information>`|Edit information about an event|:x:|

# Usage
The bot can be run, by using:
```sh
npm run start
```
If no config file is found, a default template will be copied and the bot will stop, in the config file you need to add the token of your bot and can also adjust the prefix for commands.
The config file contains a json looking as follows:
```json
{
  "token": "<your_bot_token>",
  "prefix": "!ev "
}
```

