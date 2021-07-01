# DiscordEventBot
The idea behind this project is, to have a simple tool to plan on different events.
Me and a few friends often had the problem, that we never knew who would come to meetup and who still needed more information
What this bot should be capable of:

 - Create events
 - Manage information of an event (like location and time)
 - Subscribe/Unsubscribe to an event, to start/stop receiving information about it
 - Notification when a new event is created, to inform everyone about it
 
Each event will have its own channel, where only subscribed people will have access to.

# Usuage
Following commands are currently planned:

|command							|description															|
|:----------------------------------|:----------------------------------------------------------------------|
|`!ev init <channelname/id>`		|Creates hub channel, in which information about new events is shared	|
|`!ev create <eventName>`			|Create an event														|
|`!ev sub <eventName>`				|Subscribe to an event													|
|`!ev unsub <eventName>`			|Unsubscribe to an event												|
|`!ev edit <option> <information>`	|Edit information about an event										|
