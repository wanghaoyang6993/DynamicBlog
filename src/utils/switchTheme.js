import store from "@/store";

/**
 * 根据locastorage中的主题设置css变量，并更改vuex中保存的主题
 * 为了实现变量的响应式，将第dispatch修改vuex中的主题方法调用放在修改css变量之后
 */
export function setTheme() {
    if(window.localStorage.getItem("theme")==='light') {
        document.body.style.setProperty("--infocard-bg-color", 'rgba(255, 251, 240)');
        document.body.style.setProperty("--infocard-active-color", 'rgb(255, 255, 255)');
        document.body.style.setProperty("--infocard-underground-color", 'rgba(255, 251, 240, .3)')
        document.body.style.setProperty("--font-color", 'rgb(0, 0, 0)');
        document.body.style.setProperty("--underlying-bg", 'url("http://blog.theluckyone.top/08a1bec0-8254-4f6b-8752-2667b741c011.jpg")');
        document.body.style.setProperty("--underlying-bg-reverse", 'url("http://blog.theluckyone.top/09c038f9-0376-4fdc-a82a-e29f5cc53f1e.png")');
        document.body.style.setProperty("--title-color", 'rgb(14,98,134)');
        document.body.style.setProperty("--infocard-bg-active-color-reverse", 'rgb(38,38,38)');
        store.dispatch('setTheme', 'light');
    }else {
        document.body.style.setProperty("--infocard-bg-color", '#2c3137');
        document.body.style.setProperty("--infocard-active-color", 'rgb(38,38,38)');
        document.body.style.setProperty("--infocard-underground-color", 'rgba(44,49,55,.3)')
        document.body.style.setProperty("--font-color", 'rgb(238,241,248)');
        document.body.style.setProperty("--underlying-bg-reverse", 'url("http://blog.theluckyone.top/08a1bec0-8254-4f6b-8752-2667b741c011.jpg")');
        document.body.style.setProperty("--underlying-bg", 'url("http://blog.theluckyone.top/09c038f9-0376-4fdc-a82a-e29f5cc53f1e.png")');
        document.body.style.setProperty("--title-color", 'rgb(255,255,255)');
        document.body.style.setProperty("--infocard-bg-active-color-reverse", 'rgb(255, 255, 255)');
        store.dispatch('setTheme', 'dark');
    }
}

/**
 * 更改主题，并保存至localStorage中
 */
export function changeTheme() {
    if(window.localStorage.getItem("theme")==='light') {
        window.localStorage.setItem("theme", "dark");
    }else {
        window.localStorage.setItem("theme", "light");
    }
}