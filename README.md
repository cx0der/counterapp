# Counter app

This is a very simple (and badly written) application that keeps track of clicks for each user. A user can login with their username and use a button to increase their counter. The app then displays all counters.

# Instructions
The server and the client are separate applications. The server can be started with

```
npm install
npm run build
npm run start
```

and the client with

```
npm install
npm run start
```

Then, navigating to localhost:3000 will display the login page.

# Tasks
Your task is to fix and improve the application as much as you can. Do not spend more than a couple of hours on this. If there are still remaining tasks to do, just write down your ideas and we'll go through them in the interview.

Some ideas:
- Code quality
- Security concerns
- Persistence
- Page style
- Live-refresh for simultaneous users
- ...

# Discussion
During the interview, we'll go through your solution and discuss further topics, such as:
- How would you host this kind of application on AWS?
- How would you ensure that the application operates correctly in production?
- How could we achieve low-latency when accessing the application from different parts of the world?
- Why or why not would you implement this API in GraphQL, and if you were to implement it, how would you do it?

# Submission
Please put your solution in a Github repository and email us a link to it. Just don't mention Elo so that other applications can't find it.
