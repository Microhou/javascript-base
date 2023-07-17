// function slow(x) {
//     // 这里可能会有重负载的 CPU 密集型工作
//     console.log(`Called with ${x}`);
//     return x;
// }

// let worker = {
//     someMethod() {
//         return 1;
//     },
//     slow(x) {
//         alert("Called with " + x);
//         return x * this.someMethod();
//     }
// }

let worker = {
    slow(min, max){
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
}

function cachingDecorator(func, hash) {
    let cache = new Map();

    return function () {
        console.log('args---->', arguments)
        let key = hash(arguments);
        if (cache.has(key)) { // 如果缓存中有对应的结果
            return cache.get(key) // 从缓存中读取结果
        }
        
        let result = func.call(this, ...arguments); // 否则就调用 func
        cache.set(key, result); // 然后将结果缓存（记住）下来
        return result;
    }
}

function hash(args) {
    // return args[0] + ',' + args[1];
    return [].join.call(args);
}


worker.slow = cachingDecorator(worker.slow, hash);
console.log( worker.slow(3, 5) ); // works
console.log( "Again " + worker.slow(3, 5) ); // same (cached)

// slow = cachingDecorator(slow);

// console.log(slow(1)); // slow(1) 被缓存下来了，并返回结果
// console.log("Again: " + slow(1) );

// worker.slow = cachingDecorator(worker.slow);
// console.log(worker.slow(2));
// console.log(worker.slow(2));

let wrapper = function(func) {
    return func.apply(this, arguments);
}

function work(a, b) {
    console.log(a + b); // work 是一个任意的函数或方法
}

function spy(func) {
    
    function wrapper(...args) {
        wrapper.calls.push(args);
        func.apply(this, args);
    }

    wrapper.calls = [];

    return wrapper;
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}

