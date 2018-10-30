// ==UserScript==
// @name 彩云天气
// @author H1d3r
// @namespace caiyun weather
// @description 彩云天气
// @grant GM_xmlhttpRequest
// @include *://*
// @match  *://*
// @require https://code.jquery.com/jquery-1.9.1.min.js
// @version                1.0
// ==/UserScript==


document.body.appendChild(document.createElement('script')).src='https://code.jquery.com/jquery-1.9.1.min.js';
//document.body.appendChild(document.createElement('script')).src='https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js';





 $(function($){
   var NotificationHandler = {
	isNotificationSupported: 'Notification' in window,
	isPermissionGranted: function() {
		return Notification.permission === 'granted';
	},
	requestPermission: function() {
		if (!this.isNotificationSupported) {
			console.log('the current browser does not support Notification API');
			return;
		}
 
		Notification.requestPermission(function(status) {
			//status是授权状态，如果用户允许显示桌面通知，则status为'granted'
			console.log('status: ' + status);
 
			//permission只读属性
			var permission = Notification.permission;
			//default 用户没有接收或拒绝授权 不能显示通知
			//granted 用户接受授权 允许显示通知
			//denied  用户拒绝授权 不允许显示通知
 
			console.log('permission: ' + permission);
		});
	},
	showNotification: function(title,bodys) {
		if (!this.isNotificationSupported) {
			console.log('the current browser does not support Notification API');
			return;
		}
		if (!this.isPermissionGranted()) {
			console.log('the current page has not been granted for notification');
			return;
		}
 
		var n = new Notification(title, {
			icon: 'img/icon.png',
			body: bodys
		});
 
		//onshow函数在消息框显示时会被调用
		//可以做一些数据记录及定时操作等
		n.onshow = function() {
			console.log('notification shows up');
			//5秒后关闭消息框
			setTimeout(function() {
				n.close();
			}, 5000);
		};
 
		//消息框被点击时被调用
		//可以打开相关的视图，同时关闭该消息框等操作
		n.onclick = function() {
			alert(bodys);
			//opening the view...
			n.close();
		};
 
		//当有错误发生时会onerror函数会被调用
		//如果没有granted授权，创建Notification对象实例时，也会执行onerror函数
		n.onerror = function() {
			console.log('notification encounters an error');
			//do something useful
		};
 
		//一个消息框关闭时onclose函数会被调用
		n.onclose = function() {
			console.log('notification is closed');
			//do something useful
		};
	}
};
 
document.addEventListener('load', function() {
	//try to request permission when page has been loaded.
	NotificationHandler.requestPermission();

});

   
   
      var url = "https://api.caiyunapp.com/v2/96Ly7wgKGq6FhllM/113.934437,22.540434/weather.jsonp?hourlysteps=120&random=0.697860338553802&";
      $.ajax(url, {
        dataType: 'jsonp',
        crossDomain: true,
        headers:{
            "Referer": "http://caiyunapp.com/map/?#113.934437,22.540434"
        },
        success: function(data) {
          if(data && data.status == 'ok'){
            console.log(data.status);
          res = new Date().toLocaleString()+"\r\n"+ data.result.forecast_keypoint + "\r\n" + data.result.minutely.description + "\r\n" + data.result.hourly.description
          console.log(res);
          NotificationHandler.showNotification("天气预报",res);
          console.table(data.result.hourly.skycon);
          }
        else{
        console.log("Query Weather Error!")
        }

      }
      });
  })

setInterval(function(){
      var url = "https://api.caiyunapp.com/v2/96Ly7wgKGq6FhllM/113.934437,22.540434/weather.jsonp";
      $.ajax(url, {
        dataType: 'jsonp',
        crossDomain: true,
        headers:{
            "Referer": "http://caiyunapp.com/map/?#113.934437,22.540434"
        },
        success: function(data) {
          if(data && data.status == 'ok'){
            console.log(data.resultcode);
          }
          console.log(new Date().toLocaleString()+"\t"+ data.result.forecast_keypoint + "\r\n" + data.result.minutely.description + "\r\n" + data.result.hourly.description);
          console.log(new Date().toLocaleString()+"\r\n"+ data.result.forecast_keypoint );
          console.table(data.result.hourly.skycon);
          NotificationHandler.showNotification("天气预报",res);
        }
      });
  
},10*60*1000);
