// 周期性调度有两种方式，一种是setInterval,另一种是嵌套的setTimeout

// let timerId = setTimeout(function tick() {
//    alert('tick');
//    timerId = setTimeout(tick, 2000);
//    alert('tick end')
// }, 2000)


// let delay = 5000;
// let timerId = setTimeout(function request() {
//    //发送请求
//    if('request failed due to server overload') {
//         // 下一次执行的间隔是当前的 2 倍
//         delay *= 2;
//    } 

//    timerId = setTimeout(request, delay)
// }, delay)

let start = Date.now();
let times = [];

setTimeout(function run() {
    times.push(Date.now() - start); // 保存前一个调用的延时

    if (start + 100 < Date.now()) { // 100 毫秒之后，显示延时信息
        console.log(times);
    }else {
        setTimeout(run);
    }
});

// function printNumbers(from, to) {
//     let num = from;
//     let timerId = setInterval(function () {
//         console.log(num);
//         if(to === num){
//             clearInterval(timerId)
//         }

//         num++;
//     }, 1000)
// }

// 使用嵌套的 setTimeout：

function printNumbers(from, to) {
    let current = from;
    setTimeout(function go () {
       console.log(current);
       if (current < to) {
           setTimeout(go, 1000);
       }
       current++;
    }, 1000)
}

// 用例：
printNumbers(5, 10);




