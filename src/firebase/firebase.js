import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };


// // child_removed

// database.ref('expenses').on('child_removed', (snapShot) => {
//     console.log(snapShot.key, snapShot.val());
// })

// // child_changed

// database.ref('expenses').on('child_changed', (snapShot) => {
//     console.log(snapShot.key, snapShot.val());
// })

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapShot) => {
//         expenses.push({
//             id: childSnapShot.key,
//             ...childSnapShot.val()
//         })
//     })
//     console.log(expenses);
// })


// database.ref('expenses').push({
//     description: 'food',
//     'note': 'yummy',
//     amount: 200,
//     createdAt: 5000
// })



// database.ref('notes').push({
//     title: "Course Topics",
//     body: "React Native, Angular, Python"
// })

// database.ref('notes').set(notes);

// database.ref().on('value', (snapShot) => {
//     const data = snapShot.val();
//     const { name } = data;
//     const { title, company } = data.job;
//     console.log(`${name} is a ${title} at ${company}.`);
// })

// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         console.log(snapshot.val());
//     })

// setTimeout(() => {
//     database.ref('age').set(25)
// }, 3500);

// setTimeout(() => {
//     database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(32)
// }, 10500);

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch(e => console.log(e));

// database.ref().set({
//     name: 'Will Friebel',
//     age: 32,
//     stressLevel: 5,
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'San Francisco',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('data was saved to firebase');
// }).catch(e => console.log('something went wrong', e));

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })