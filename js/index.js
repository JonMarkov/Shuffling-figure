//1、 获取元素节点
var data;
var swiper = document.getElementById("swiper");
var focus = document.getElementById("focus");
var olis = focus.getElementsByTagName("li");
var oDivs = swiper.getElementsByTagName("div");
var outer = document.getElementById("outer");

// 2、请求数据
var xhr = new XMLHttpRequest();
xhr.open("get","json/banner.json",false);
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
        data =    utils.toJSON(xhr.responseText)
    }
};
xhr.send();
console.log(data)

//3、数据绑定(尝试另一种)
function bindData() {
    let str = ``;
    let strLi = ``;
    for(let i = 0;i<data.length;i++){
        let cur = data[i];
            str += `<div><img src="${cur.img}" alt=""></div>`;
            strLi += `<li></li>`
    }
    swiper.innerHTML = str;
    focus.innerHTML = strLi;

    olis[0].classList.add("select")
    swiper.appendChild(oDivs[0].cloneNode(true))
}bindData();

// 4、让当前图片自动轮播
var timer = setInterval(autoMove,2000);
var step = null;//记录当前显示的第几张图片
function autoMove(n) {
    step++;
    //如果n不是undefined，则让step等于n
    if(typeof n === "number"){
        step = n
    }
    if(step-1 === data.length){
        utils.css(swiper,"left",0)
        step = 0;
        autoMove();
        return
    }
    zfAnimate(swiper,{left:-1000*step},300)
    changeTip(step)
}
//5、圆点函数
function changeTip(n) {
    for(var i = 0;i<olis.length;i++){
        n ===i?olis[i].classList.add("select"):olis[i].classList.remove("select")
        n === data.length?olis[0].classList.add("select"):null
    }
}

//6、鼠标划过
outer.onmouseover = function () {
    clearInterval(timer)
};

//7、鼠标离开
outer.onmouseout = function () {
    timer = setInterval(autoMove,2000)
};

//点击圆点
for(var i = 0;i<olis.length;i++){
    olis[i].index = i;
    olis[i].onclick = function () {
        autoMove(this.index);
    }
}


// for (let i = 0; i < olis.length; i++) {
//     olis[i].onclick = function(){
//         //changeTip(i);
//         step = i-1;
//         autoMove();
//     }
// }