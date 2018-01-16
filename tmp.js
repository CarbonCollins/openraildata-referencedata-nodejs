const promisify = (fn, ...args) => {
  return new Promise((resolve, reject) => {

  })
}


const promisify = fn => function () {
  return new Promise((resolve, reject) => {
    let args = [].concat(Array.prototype.slice.call(arguments), [function (err, rest) {
      if (err) {
        reject(err);
      } else {
        let arg2 = [].concat(Array.prototype.slice.call(arguments));
        arg2.shift();
        console.log(arg2);
        resolve.apply(this, arg2);
      }
    }]);
    console.log(args);
    fn.apply(this, args);
  });
}.bind(this) 