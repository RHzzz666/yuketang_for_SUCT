// ==UserScript==
// @name         长江雨课堂for_SCUT
// @namespace    https://www.shegou.com/
// @version      1.0.2
// @description  长江雨课堂for_SCUT_仅限学术论文课
// @author       RHzzz
// @match        https://changjiang.yuketang.cn/v2/web/*
// @icon         https://www.google.com/s2/favicons?domain=yuketang.cn
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){


        let zk_btn = $("span.blue.ml20");
        zk_btn.click();
        let reg = new RegExp("[2-3].[0-9]")
        // function is_video(){
        //     $("svg.icon > use")
        // }
        setTimeout(function(){
            let a = $("section.leaf_list__wrap:first");
            let a_list = a.find("section.activity__wrap");
            //let type_list = a_list.find("icon");
            for(let i=0; i<a_list.length; i++){
                // 观看进行中与未开始的视频
                console.log(i+'---'+a_list[i].lastChild.innerText);
                console.log(i+'---'+a_list[i].firstChild.innerText);
                console.log(a_list[i].firstChild.innerText.match("Video"))
                console.log('正则数字匹配'+a_list[i].firstChild.innerText.match(/[2-3]\.[0-9]/) != null )
                //console.log("标题为数字小于4" + Number(a_list[i].firstChild.innerText) )
                //console.log("type的属性" + type_list[i])
                // let type = type_list[i].children.attributes
                if(a_list[i].lastChild.innerText.indexOf("进行中")>-1 || (a_list[i].lastChild.innerText === "未开始" && (a_list[i].firstChild.innerText.match("Video") != null || a_list[i].firstChild.innerText.match(/[2-3]\.[0-9]/) != null ))){
                    
                    a_list[i].click();
                    setTimeout(function(){
                        let title = $("div.title-fl span")[0].innerText;  // 标题
                        //let timeout = 3000;  // 控制计时器间隔
                        let reg = /[0-9]+.[0-9]+/g;  // 正则匹配进度
                        setTimeout(function(){
                            let pause_btn = $("xt-bigbutton.pause_show");  // 暂停按钮
                            if(pause_btn.length == 1){  // 判断按钮是否显示
                                console.log("视频未播放---自动点击播放视频");
                                pause_btn.click();
                            }
                        },3000);

                        // 计时器监听进度
                        let jsq = setInterval(function(){
                            let w = $("span.text:eq(1)")[0];  // 进度元素
                            console.log(title+'---'+w.innerText);
                            console.log(w.innerText);
                            let progress = Number(w.innerText.match(reg)[0]);  // 匹配进度转为数字
                            console.log(title+'---进度：'+progress+'%');
                            console.log('progress是否大于90:'+ progress)
                            if(progress>90){
                                console.log("视频已看完")
                                clearInterval(jsq);
                                window.history.back(-1);
                                setTimeout(function(){
                                    window.parent.location.reload();
                                },1500);
                            }
                            //if(w.innerText=="完成度：100%"){
                                
                            //}
                        },3000);
                    },3000);
                    return false;
                }
                // 读未读的图文
                if(a_list[i].lastChild.innerText == "未读"){
                    console.log(i+'---'+a_list[i].lastChild.innerText);
                    a_list[i].click();
                    setTimeout(function(){
                        let title = $("div.title-fl span")[0].innerText;
                        setTimeout(function(){
                            window.history.back(-1);
                            setTimeout(function(){
                                window.parent.location.reload();
                            },1500);
                        },1000);
                    },2000);
                    return false;
                }
                // 判断如果最后一条并且为已完成或已读 结束任务
                if(i==a_list.length-1 && (a_list[i].lastChild.innerText == "已完成" || a_list[i].lastChild.innerText == "已读")){
                    // window.history.back(-1);
                    console.log("全部完成");
                    alert("已完成！");
                    return false;
                }
            }
        },500);

    },1000);

})();