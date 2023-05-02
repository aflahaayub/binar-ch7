# Rock Paper Scissors Game API

This is a project part of Binar Academy Challenge. The challenge is to build an API for Rock Paper Scissors with MVC and MCR design pattern. To use it, you can run:

```
npm i
npm start
```

Then to run the API, you can use Postman and access the route. But before you access the route, you have to regist as an User or Admin.

## Play The Game

There are steps that you have to do before you can play Rock Paper Scissors Game.

If you already login and already put the token into Bearer Token in Authorization in Postman, you can create the game room.

```
localhost:2000/api/create-room
```

If you success create the game room, there'll be a room Id that you can use to access the room.

```
localhost:2000/api/fight/:room
```

Then, you can play the rock paper scissors as a player one. You can choose R, P, or S and will fight againts Computer. Don't forget to use PUT when you send the data in Postman.

```
localhost:2000/api/fight/:room
```

The game will be over when you played 3 times. Once the game is over, you can aceess game result to see the details of the game.

```
localhost:2000/api/result/:room
```

Good luck!
