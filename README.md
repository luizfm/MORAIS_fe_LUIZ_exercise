# Tempo Frontend challenge

# Solution Improvement

### Describe what you have improved in the solution

## To Run the project you must run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```

## To run coverage tests you must run

```
npm run test:coverage
```

All generated files report will be at the output of `coverage/lcov-report` </br>
Here it is also possible to check a table of coverage by openning the file `index.html` on the folder mentioned above on your browser.

Below there is an image showing the last coverage report of the application:
![Screenshot 2023-07-16 at 22 27 50](https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/4a370562-fc6f-4806-ba39-90d0a078c98a)


## Env variables

### Setry

This project uses Sentry (only in localhost for challenge purposes) to monitor applications errors and possible fetch exceptions.
It's possible to create an own project just to test. To do that, visit sentry.io and create an account and a React project. Once finished
Get the provided `sentry_dns` and pass it url as value of the env variable REACT_APP_SENTRY_DNS

Below, there is an image example of the captured events errors in the application.

![Screenshot 2023-07-16 at 22 27 19](https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/8c5c838f-a8ba-4c6b-8403-da5c0f9d0bc0)



The DNS env varible I'm using in this project is the below one:
REACT_APP_SENTRY_DNS=https://356220fd9d1445668a93c06e2d6f9f0c@o4505540112482304.ingest.sentry.io/4505540114120704

### Segment

To deal with tracking it was also added the library Segment, which track provided events. Here, we're using events on the `Cards` components.
To get your own Segment key, visit segment.com, create an account and then a JavaScript web project. Once the project is created, access it's settings. <br />
You should be able to see API Keys option on the screen. Click on it and get your Write Key and provide it as a Segment Key on your application.

Below there is an image showing what events I've trackecd while coding this challenge:

![Screenshot 2023-07-16 at 22 26 54](https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/b1cd82d0-f7d7-4f73-b1d9-65bfa284554f)


The Segment Write Key env varible I'm using in this project is the below one:
REACT_APP_SEGMENT_KEY=SAvF8OKIuzYvYuR7T6oZleavWBFgG63W

### Lighthouse

To check applications performance, SEO, best practices and accessibility, we used Lighthouse analyzer. Regarding perfomance, there are a few cache options that would <br />
be interesting to do but it would require a bit more time to check and implement. We're going to leave it as technical debt for now. <br /> 
It also points a few console warns but they're related segment API key on production, nothing related to code.

Here are a few pages summary pictures:

### /
<img width="1025" alt="Screenshot 2023-07-17 at 14 14 26" src="https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/1f21fdd2-4a33-4ce4-a31e-fbcb0a7ea37e">

### /team/:teamId
<img width="1018" alt="Screenshot 2023-07-17 at 14 15 22" src="https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/d27aaf70-633a-42e2-96e6-9a24c9f56510">

### /user/:userId
<img width="1035" alt="Screenshot 2023-07-17 at 14 15 51" src="https://github.com/luizfm/MORAIS_fe_LUIZ_exercise/assets/45155140/623d586a-a986-49a7-9e3b-39a13311c63c">


### Deployment

The application is deployed using Vercel. A custom domain was implemented a set to `tempo-challenge.luizfm.com`. Feel free to navigate on it.

### Improvement suggestions for future

- [ ] Backend should return paginated responses. That will let us render just a few results and, if necessary, request more pages using a page feature or an infinite scroll request.
- [ ] Backend should let frontend send query params through the URLs to facilitate filtering. Today, the filter is made on the Frontend but it's not a good pratice.
- [ ] The endpoint `/users/:userId` could return also the `teamId` as response from requested user. If we reload the page `userDetail`, there is no way to use the back button since we don't have any teamId information.
- [ ] The endpoint `/team/:teamId` could return teamMembers and teamLead data instead just `ids`. Since we need the `ids` to make the requests to get users info and then render the cards, it does not seem to be a good pratice to hit backend more then one time for the required information. That would be a good improvement.

## Conclusion

It was a good challenge and it helped me a lot to improve more my hard skills. Thank you so much for the opportunity. Feel free to contact me at:

LinkedIn: https://www.linkedin.com/in/luiz-fernando-morais-54a459103/
email: luiz.ado@hotmail.com
