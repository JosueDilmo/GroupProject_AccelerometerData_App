# Mobile Apps 2 - BSC30922 - Semester 1 & 2

<br>

## Group Project

- Lecture Name: [Saravanabalagi Ramachandran](https://github.com/saravanabalagi)
- Students Name: `Josue Santos`
- Student Number: `24061`
  <br><br>

## Accelerometer Data App <br>

### Description <br>

The objective of this project is to develop a cloud connected mobile app to collect and upload accelerometer data and display a leaderboard. The requirements are as follows and both requirements carry equal weightage:

- <b>Authenticate using Firebase\*, upload data to Firestore</b><br>

  - [x] Sign up using StudentID (as username) and a password.<br>
  - [x] After sign up, collect and update details such as name, course, year in Firestore > <i>StudentID</i>, allow editing these details later.<br>
  - [x] Collect and store locally 1000 accelerometer data points.<br>
  - [x] Once 1000 data points are collected, upload to Firestore > <i>StudentID</i> > accelerometer_data<br>
  - [x] Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimised)<br>

- <b>Display Leaderboard<br></b>

  - [x] Retrieve accelerometer_data of all users and calculate movement score\*\* for each user<br>
  - [x] If accelerometer_data is unavailable or not in correct format or has more than 1000 data points, show score "N/A".<br>
  - [x] Show recycler view to display leaderboard with columns rank, name and score (use score for ranking)<br>
  - [ ] Refresh every minute, show information: last refreshed (in time ago format\*\*\*), and refreshing in x seconds<br>
  - [x] Show details of user when clicked in full screen, allow going back to leaderboard<br>

<b>Data Upload Format Example:</b>

Firestore > StudentID ><br>

- name: "Full Name"<br>
- course: "BSc Computer Science"<br>
- year: 3<br>
- accelerometer_data: [{x: float, y: float, z: float}, {x: float, y: float, z: float}, ...upto a max of 1000 datapoints]<br>

## Notes:

\*To prevent unintended errors in the shared firestore, you should start development with your own firebase configuration and make sure everything works. Once everything works error free, then you can use the common firebase config and the app will automatically use the same firestore and firebase auth.<br>

\*\*Calculating activity score in Kcal is a complex function, use this formula instead:

movement score = Σ(Σ|x| + Σ|y| + Σ|z|)/n

where,

     n is the number of data points (1000 in this project)
    (x, y, z) is one accelerometer data point

\*\*\*Feel free to use your own function or an external open source library to convert timestamp to time ago format

## Report

This project was a bit easier than the first one mostly because developed the first project in React Native (and that project was much bigger than this one) and because I had used Firebase/Firestore Cloud in my final project last year. After watching few videos about some basic Firebase/Firestore for Web things and reading the documentations (all in the reference section) wasn’t too hard to understand what to do. Still, I couldn’t fulfil all the requirements and still some changes to be done.<br>

First, I could not connect to the shared Firestore Database, I tried few times but got some errors about <i>unidentified objects</i>, so my option was to stick with my Firestore which is configured the same as the requirements.<br>

Second, in the requirements <i>Display Leaderboard</i> it is missing the refresh every minute function (and the display last refreshed) and I’m a bit concerned with the retrieve of accelerometer data and the display of the calculated scores. In the requirements there is no information about how it should be store, so I used the same Array which contain all the data from the collection Users, and I added the score according to their position in the array.<br>

The accelerometer sensors are running when the application is opened and keep running until it is closed/ minimized. The library <i>Expo Sensors</i> (available in the reference) made the usage and capture of the data simple and fast.<br>

Although simple, this project was a real challenge and being able of using tools available in a normal development environment such as Firebase authentication and Firestore database made this project worth of spending few nights awake and the knowledge it added will be always precious.<br>

In the reference section is the videos and documentation I used for this project and all the code seen is referenced.

## Reference

[Expo Documentation Firebase](https://docs.expo.dev/guides/using-firebase/)<br>
[Expo Sensors Documentation](https://docs.expo.dev/versions/latest/sdk/accelerometer/)<br>
[React Navigation](https://reactnavigation.org/docs/getting-started)<br>
[Firebase Auth Documentation](https://firebase.google.com/docs/auth/web/start)<br>
[Firestore Web Documentation](https://firebase.google.com/docs/firestore/quickstart)<br>
[React Native Auth](https://youtu.be/ql4J6SpLXZA)<br>
[Stack Overflow](https://stackoverflow.com/)
