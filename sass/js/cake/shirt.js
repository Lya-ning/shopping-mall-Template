//var base_url = "https://192.168.1.190:8082/perform";
//var public_url = "https://192.168.1.191:8080/JdMall/jd";
//var public_url = "https://www.zjaipsp.com/JdMall/jd";

//获取url中"?"符后的字串   
var urlData = new Object();
if (location.search.indexOf("?") != -1) {   
    var str = decodeURI(location.search.substr(1));   
    strs = str.split("&");   
    for(var i = 0; i < strs.length; i ++) {   
        urlData[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
    }   
}

var kcallme = {
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
	}
}

String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
}


function car(){
	$(".fast-left").on("tap", function(){
		if ($(this).find("span").attr("class")=="show") {
			$(".page-nav-fast").removeClass("nav-mark");
			$(this).find("span").removeClass("show");
			$(this).find("span").css("background-image", "url(../../../img/jd/icon_nav_left.png)");
			$(this).find(".fast-left-title").html("快速<br />导航").css("padding-top","16%");
			$(this).animate({right:"0"},268);
			$(this).next().find(".fast-right").animate({right:"-5.1rem"},268);
		} else{
			$(".page-nav-fast").addClass("nav-mark");
			$(this).find("span").addClass("show");
			$(this).find("span").css("background-image", "url(../../../img/jd/icon_nav_right.png)");
			$(this).find(".fast-left-title").html("收起").css("padding-top","28%");
			$(this).animate({right:"5.1rem"},328);
			$(this).next().find(".fast-right").animate({right:"0"},328);
		}
	});
	
	$(".fast-all").on("tap", function(){
		$(".page-nav-fast").removeClass("nav-mark");
		$(".fast-left").find("span").removeClass("show");
		$(".fast-left").find("span").css("background-image", "url(../../../img/jd/icon_nav_left.png)");
		$(".fast-left").find(".fast-left-title").html("快速<br />导航").css("padding-top","16%");
		$(".fast-left").animate({right:"0"},268);
		$(this).find(".fast-right").animate({right:"-5.1rem"},268);
	});
	
	
		$(".fast-right ul li").on("tap",function(){
			console.log(111);
			if($(this).index()<6 && $(this).index()!=3 &&  $(this).index()!=4){
				var data_Id = $(this).attr("data-id");
				var data_url = $(this).attr("data-url");
				mui.openWindow({
					id: data_Id,
					url: data_url
				});
			}
			
		});

	
	
	//商城首页
	$(".YSP_shopping").on("tap", function(){
		if(!userId){
			setPageUrl(location.href);
		}else{
			mui.openWindow({
           		id:'mall-index',
           		url:'../../../index.html'
           	})
		}
	});
	
	$(".perform").on("tap", function(){
		if(!userId){
			setPageUrl(location.href);
		}else{
			mui.openWindow({
           		id:'perform-index',
           		url:'../../perform/index.html'
           	})
		}
	});
		  //点击收藏页
	 $(".goodsFavor").on("tap",function(){
 		if(!userId){
	        setPageUrl(location.href)
	    }else{
	   		mui.openWindow({
           		id:'self-favor',
           		url:'../../mall/self/favor.html'
           	})
	    }
	})
	
	//个人中心goMine
	  $(".goMine").on("tap",function(){
	  		if(!userId){
		        setPageUrl(location.href)
		    }else{
			   	mui.openWindow({
	           		id:'self-index',
	           		url:'../../mall/self/index.html'
	           	})
		    }
		})
}

function countAll(){
	$.ajax({
		url : jd_url + "/cart/cartCount.do",
	    dataType: "json",
	    type: "post", 
	    data: {
	    	userId:localStorage.getItem("userId")
	    },
	    success:function(data){
		    var	countAll = data.cartCount;
			if (countAll == "") {
				$(".fast-right li:nth-child(2) p").css("display","none");
			} else{
				$(".fast-right li:nth-child(2) p").css("display","block");
				$(".car p").html(countAll); 
			}
	    }   
	})
}