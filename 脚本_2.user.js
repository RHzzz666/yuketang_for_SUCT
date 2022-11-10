// ==UserScript==
// @name         脚本_2
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  scnu 华南师范大学 长江雨课堂 网课自动化脚本
// @author       hqzqaq
// @icon         https://statics.scnu.edu.cn/statics/images/favicon.ico
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @match        changjiang.yuketang.cn/*
// @run-at       document-end
// @license      MIT
// @require https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js
// ==/UserScript==

(function () {
    "use strict";
    // 多长时间刷新一下页面，单位 分钟
    const reloadTime = 10;
    // 视频播放速率,可选值 [1,1.25,1.5,2],默认为二倍速
    const rate = 2;

    window.onload = function () {


        // 静音
        function claim() {
            $(
                "#video-box > div > xt-wrap > xt-controls > xt-inner > xt-volumebutton > xt-icon"
            ).click();
        }

        function fun(className, selector)
        {
            var mousemove = document.createEvent("MouseEvent");
            mousemove.initMouseEvent("mousemove", true, true, unsafeWindow, 0, 10, 10, 10, 10, 0, 0, 0, 0, 0, null);
            document.getElementsByClassName(className)[0].dispatchEvent(mousemove);
            document.querySelector(selector).click();
        }

        // 加速
        function speed() {
            let keyt = '';
            if(rate === 2 || rate === 1){
                keyt = "[keyt='" + rate + ".00']"
            }else{
                keyt = "[keyt='" + rate + "']"
            }
            fun("xt_video_player_speed", keyt);
        }



        let video;
        const videoPlay = setInterval(function () {
            // 获取播放器
            video = document.getElementsByClassName("xt_video_player")[0];
            if (!video) {
                return;
            }
            setTimeout(function () {
                // 视频开始5s之后再开启倍速(已加速)
                speed()
            },10);
            claim();
            window.clearInterval(videoPlay);
        }, 500);

        // 是否播放完成的检测
        const playTimeOut = setInterval(function () {
            if (!video) {
                return;
            }
            // 没有静音
            if (video.volume != 0) {
                claim();
            }

            video.play();




        }, 1000);

    };
})();
