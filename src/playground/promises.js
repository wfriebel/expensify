const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('this is my resolved data');
    }, 3000);
})

console.log('Begin script');

promise.then(data => {
    console.log(data);
})