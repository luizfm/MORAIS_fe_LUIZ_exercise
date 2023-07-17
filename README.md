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


