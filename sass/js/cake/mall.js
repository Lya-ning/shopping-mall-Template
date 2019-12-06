var base_url = "https://sport.kcallme.com/mall_admin";
var public_url = "https://today.kcallme.com/JdMall/jd";
var base_pageUrl = 'https://sport.kcallme.com';
var loginPageId = "https://login.kcallme.com/Login/login";
var jd_url = 'https://today.kcallme.com/dist/#'; //京东前台链接
var perform_url = 'https://perform.kcallme.com/perform';
//var public_url = "http://www.zjaipsp.com/JdMall/jd";


//获取url中"?"符后的字串   
var urlData = new Object();
if (location.search.indexOf("?") != -1) {   
    var str = decodeURI(location.search.substr(1));   
    strs = str.split("&");   
    for(var i = 0; i < strs.length; i ++) {   
        urlData[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
    }   
}

//setPageUrl(location.pathname + location.search);
function setPageUrl(pageUrl) {
	$.ajax({
        url: "https://login.kcallme.com/Login/login/setPageUrl.do",
        dataType: "json", 
        type: "POST", 
        data: {"pageUrl": pageUrl},
        success: function(data){
            if(data.result == 1){
                location.href = 'https://login.kcallme.com/Login/login/index.do?model=mall&pageId='+data.data;
            }
        }
    })
}

function getPageUrl(pageUrlId, userId){
	$.ajax({
        url: base_url + "bbs/user/getPageUrl.do",
        dataType: "json", 
        type: "POST", 
        data: {"pageUrlId":pageUrlId},
        success: function(data){
        	if(data.result == 1){
        		localStorage.setItem('userId',userId);
        		location.href = base_pageUrl + data.data;
        	}
        }
    })
}

var kcallme = {
	showMask: function(){
		$("body").append("<div class='loading-mask' style='display: block;'>"+
		"</div>");
		
	},
	hideMask: function(){
		$(".loading-mask").fadeOut(200, function(){
			$(".loading-mask").hide();
		});
		
	},
	showLoading: function(){
		$("body").append("<div class='loading-mask' style='display: block;'>"+
			"<div class='loading-toast' style='display: block;'>"+
				"<i class='loading-icon loading-icon-toast'></i>"+
				"<div class='loading-text'>加载中</div>"+
			"</div>"+
		"</div>");
		
	},
	hideLoading: function(){
		$(".loading-mask").fadeOut(200, function(){
			$(".loading-mask").hide();
		});
		
	},
	showDialog: function(data){
		var title = data.title;
		var content = data.content;
		var cancelText = data.cancelText;
		var successText = data.successText;
		var cancel = data.cancel;
		var success = data.success;
		$("body").append("<div class='dialog-mask'>"+
			"<div class='dialog-block bounceIn animated' style='display: block;'>"+
				"<div class='dialog-title'>"+title+"</div>"+
				"<div class='dialog-content'>"+content+"</div>"+
				"<div class='dialog-control'>"+
					"<div class='dialog-cancel'>"+cancelText+"</div>"+
					"<div class='dialog-confirm'>"+successText+"</div>"+
				"</div>"+
			"</div>"+
		"</div>");
		$(".dialog-mask").show();
		$(".dialog-block").show().addClass("bounceIn").addClass("animated");
		$(".dialog-cancel").on("tap", function(){
			$(".dialog-block").addClass("bounceOut").addClass("animated").delay(1000).hide(1, function(){
				$(".dialog-mask").hide();
				$(".dialog-block").removeClass("bounceOut").removeClass("animated")
				$(".dialog-mask").remove();
			});
			if(cancel!=null) cancel();
		});
		$(".dialog-confirm").on("tap", function(){
			$(".dialog-block").addClass("bounceOut").addClass("animated").delay(1000).hide(1, function(){
				$(".dialog-mask").hide();
				$(".dialog-block").removeClass("bounceOut").removeClass("animated")
				$(".dialog-mask").remove();
			});
			if(success!=null) success();
		});
	},
	ajax: function(datas){
		var success = datas.success;
		var async = true;
		if(datas.async!=null) async = datas.async;
		$.ajax({
		    url : datas.url,
		    dataType: "json",
		    type: "POST", 
		    data: datas.data,
		    async: async,
		    success: function(data){
		    	if(data.result==1){
		    		success(data);
		    	}else{
		    		mui.toast(data.exception);
		    	}
		    }
		});
	}
}

String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
}

Date.prototype.format = function(fmt) { //author: meizz 
	var o = { 
			"M+" : this.getMonth()+1,                 //月份 
			"d+" : this.getDate(),                    //日 
			"H+" : this.getHours(),                   //小时 
			"m+" : this.getMinutes(),                 //分 
			"s+" : this.getSeconds(),                 //秒 
			"q+" : Math.floor((this.getMonth()+3)/3), //季度 
			"S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
		fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
		if(new RegExp("("+ k +")").test(fmt)) 
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}