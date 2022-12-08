# Mobile Apps 2 - BSC30922 - Semester 1 & 2

<br>

## Individual Project

- Lecture Name: [Saravanabalagi Ramachandran](https://github.com/saravanabalagi)
- Students Name: `Josue Santos`
- Student Number: `24061`
  <br><br>

## Map places in Ireland <br>

### Description <br>

The objective of this project is to develop a cloud connected mobile app to collect and upload accelerometer data and display a leaderboard. The requirements are as follows and both requirements carry equal weightage:

- <b>Authenticate using Firebase\*, upload data to Firestore</b><br>

  - [x] Sign up using StudentID (as username) and a password.<br>
  - [ ] After sign up, collect and update details such as name, course, year in Firestore > <i>StudentID</i>, allow editing these details later.<br>
  - [ ] Collect and store locally 1000 accelerometer data points.<br>
  - [ ] Once 1000 data points are collected, upload to Firestore > <i>StudentID</i> > accelerometer_data<br>
  - [ ] Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimised)<br>

- <b>Display Leaderboard<br></b>

  - [ ] Retrieve accelerometer_data of all users and calculate movement score\*\* for each user<br>
  - [ ] If accelerometer_data is unavailable or not in correct format or has more than 1000 data points, show score "N/A".<br>
  - [ ] Show recycler view to display leaderboard with columns rank, name and score (use score for ranking)<br>
  - [ ] Refresh every minute, show information: last refreshed (in time ago format\*\*\*), and refreshing in x seconds<br>
  - [ ] Show details of user when clicked in full screen, allow going back to leaderboard<br>

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

## Reference

[Expo Documentation Firebase](https://docs.expo.dev/guides/using-firebase/)<br>
[React Navigation](https://reactnavigation.org/docs/getting-started)<br>
[Firebase Web Documentation](https://firebase.google.com/docs/auth/web/start)<br>
[React Native Auth](https://youtu.be/ql4J6SpLXZA)<br>
