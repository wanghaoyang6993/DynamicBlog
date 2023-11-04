/* eslint-disable */
/**
 * 更顺滑的滚动效果
 */
export default throttle()

function throttle(position = 0,dom) {
    //先上一层节流，防止多次触发导致bug
    let flag = true;
    return (position,dom) => {
        if(!flag) return;
        // Promise.resolve().then(()=>{scroll(position,dom);})
        //将滚动方法放到定时器，确保该程序执行的原子型，防止出现卡顿
        setTimeout(() => {
            scroll(position,dom)
        }, 50);
        flag = false;
        setTimeout(() => {
            flag = true;
        },3000);
    }
}

/**
 * 
 * @param {Number} position 滚动位置
 * @param {Dom} dom 要进行滚动的元素 
 */
function scroll(position = 0,dom) {

    //滚动速率
    let rate = 20;

    //当前滚动高度
    let currentHeight
    if(dom) {
        currentHeight = dom.scrollTop
    }else {
        currentHeight = document.documentElement.scrollTop || document.body.scrollTop;
    }
    

    // const requestAnimationFrame = (callback) => {
    //     setTimeout(callback,1);
    // }
    
    //开始滚动
    const step =  () => {
        //距离目标高度
        const distance = position - currentHeight;

        //本次滚动到的位置，用不断变小的distance除以速率就能实现一个由快变慢的效果
        currentHeight += distance/rate;

        if(Math.abs(distance) < 1) {
            //如果剩余距离小于1，直接滚过去
            if(dom) {
                dom.scrollTo(0, position)
            }else {
                window.scrollTo(0, position);
            }
            // flag = true;
        }else {
            //先把这次的滚了
            if(dom) {
                dom.scrollTo(0, currentHeight)
            }else {
                window.scrollTo(0, currentHeight);
            }
            //还不够，继续滚
            // requestAnimationFrame(step);
            window.requestAnimationFrame(step);//自动回调的动画API
        }
    }

    step();
}