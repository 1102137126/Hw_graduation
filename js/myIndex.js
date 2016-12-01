function doAjaxRequest(method, url, data, Synchronize, onComplete, onError){         //Ajax 傳送資料
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = myCallback;
    xhr.open(method, url, Synchronize);
    xhr.send(data);
    function myCallback() {
        if (xhr.readyState < 4) {
            return; // not ready yet
        }
        if (xhr.status !== 200) {
            onError(); // the HTTP status code is not OK
        return;
        }
        onComplete(xhr.responseText); // all is fine, do the work
    }
}

//建立清單 li
/*function createList() {
	
}*/

function createProduct(parentElement, data, url, id, next, eventfunction) {
	/*
	<li>
		a_img<a target="_blank" href="jump/66939495">
			<img src="http://s1.juancdn.com/bao/140307/e/4/53198186beb1a_580x380.jpg_290x190.jpg" />
			<h1>男士全棉中筒运动袜（5双）  【包邮】</h1>
		</a>
		<div class="list-price end">
			￥<span class="price-new">9.9</span>
			<span class="good-btn">抢光了</span>
			<a class="ui-btn ui-corner-all ui-btn-icon-notext ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-inline"></a>
			<a class="ui-btn ui-corner-all ui-btn-icon-notext ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-inline"></a>
		</div>
	</li>
	*/
	var li, a_img, a_list, a_love, img, h1, div, span_price, span_note;
	var str;
	li = document.createElement("li");
	//li.setAttribute("class","ui-li-has-thumb");		//
	a_img = document.createElement("a");
	str = id+data['id'];
	a_img.setAttribute("id", str);
	//a_img.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");  //
	a_img.setAttribute("data-transition", "none");  //
	a_img.setAttribute("onclick", eventfunction);
	//a_img.setAttribute("target", "_blank");
	a_img.setAttribute("href", "#"+next+"-page");
	//a_img.setAttribute("data-theme", "b");
	img = document.createElement("img");
	img.setAttribute("src", url + data['picture']);
	img.setAttribute("class","ui-li-thumb");
	img.setAttribute("style","height: " +  imgheight + "px");
	
	h1 = document.createElement("h1");
	h1.appendChild(document.createTextNode(data['name']));
	a_img.appendChild(img);
	a_img.appendChild(h1);
	
	div = document.createElement("div");
	div.setAttribute("class", "list-price buy");
	div.appendChild(document.createTextNode("$ "));
	span_price = document.createElement("span");
	span_price.setAttribute("class", "price-new");
	span_price.appendChild(document.createTextNode("100    "));
	//span_price.appendChild(document.createTextNode(data["price"]));
	span_note = document.createElement("span");
	span_note.setAttribute("class", "good-btn");
	span_note.appendChild(document.createTextNode("備註"));	
	a_list = document.createElement("a");
	a_list.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-tag ui-nodisc-icon ui-alt-icon ui-btn-inline");	
	a_list.setAttribute("onclick", "");
	a_list.setAttribute("href", "#");
	a_list.setAttribute("data-theme", "b");
	a_love = document.createElement("a");
	a_love.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-heart ui-nodisc-icon ui-alt-icon ui-btn-inline");
	a_love.setAttribute("onclick", "");
	a_love.setAttribute("href", "#");
	a_love.setAttribute("data-theme", "b");
	div.appendChild(span_price);
	div.appendChild(span_note);
	div.appendChild(document.createTextNode("  "));
	div.appendChild(a_list);
	div.appendChild(document.createTextNode("  "));
	div.appendChild(a_love);
	
	li.appendChild(a_img);
	li.appendChild(div);
	parentElement.appendChild(li);
	
}

//建立點選方格 a
function createList(parentElement, data, url, id, href, eventfunction) {
	
	var li, a, img, h2, textnode;
	var str;
	li = document.createElement("li");
	li.setAttribute("class","ui-li-has-thumb");
	a = document.createElement("a");
	str = id+data['id'];
	a.setAttribute("id", str);
	a.setAttribute("href", href);
	a.setAttribute("onclick", eventfunction);
	a.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");
	a.setAttribute("data-transition", "none");
	img = document.createElement("img");
	img.setAttribute("src", url + data['picture'])
	img.setAttribute("class","ui-li-thumb");
	img.setAttribute("style","width: 228px; height: 228px; ");
	h2 = document.createElement("h2");
	textnode = document.createTextNode(data['name']);
	h2.appendChild(textnode);
	a.appendChild(img);
	a.appendChild(h2);
	li.appendChild(a);
	parentElement.appendChild(li);
}

//
function createListbar(parentElement, data, i, id, href, eventfunction) {
	var li, a, textnode;
	li = document.createElement("li");
	a = document.createElement("a");
	li.setAttribute("class", "ui-state-default ui-corner-top ui-block-"+String.fromCharCode(97+i));
	li.setAttribute("role", "tab");
	li.setAttribute("tabindex", "-1");
	
	a.setAttribute("href", href);
	a.setAttribute("data-theme", "a");
	a.setAttribute("data-ajax", "false");
	a.setAttribute("class", "ui-btn ui-corner-all");
	a.setAttribute("id", id);
	a.setAttribute("data-transition", "none");
	a.setAttribute("onclick", eventfunction);
	textnode = document.createTextNode(data["name"]);
	a.appendChild(textnode);
	li.appendChild(a);
	parentElement.appendChild(li);
}

/*
doAjaxRequest('GET', webstr+'ajax/List_Group.php', '', false, function(responseText){
	var data = JSON.parse(responseText);
	for(var i = 0; i < data.length; i++){	
	}	
}, function(){
	
});
*/

var mapid, mapname, location_data;
var webstr = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/04/";
var x;
var search_data;
var imgheight = $(window).width()* 0.5;
window.onload = function () {
	setGroup();
	setDM();
	setShop();
	x = document.getElementById("map-content-h");
	//alert("Scanning failed: " );
}

//放置 大-分類
function setGroup() {
	//$.getJSON(url, data, success);
	var ul = document.getElementById("Group-content");
	var li, a, img, text1, h2, textnode;
	var str;
	doAjaxRequest('GET', webstr+'ajax/List_Group.php', '', false, function(responseText){
	//doAjaxRequest('GET', 'ajax/List_Group.php', '', false, function(responseText){
		var data = JSON.parse(responseText);
		//textnode = document.createTextNode(responseText);
		//ul.appendChild(textnode)
		for(var i = 0; i < data.length; i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/group/", 
						"group-", "#category-page", "setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')") ;

        }
    }, function(){
        console.log("Error");
    });
	var p;
	var id;
	doAjaxRequest('GET', webstr+'ajax/List_Category.php', '', false, function(responseText){
	//doAjaxRequest('GET', 'ajax/List_Category.php', '', false, function(responseText){
		var data = JSON.parse(responseText);
		str = "";
		id = data[0]['groupid'];
		for(var i=0; i < data.length; i++){		
			if (id == data[i]['groupid']) {
				str += data[i]['name'] + " ";
			} else {
				p = document.createElement("p");
				textnode = document.createTextNode(str);
				str = "group-" + id;
				p.appendChild(textnode);
				document.getElementById(str).appendChild(p);
				
				str = data[i]['name'] + " ";
				id = data[i]['groupid'];
			}
        }
		p = document.createElement("p");
		textnode = document.createTextNode(str);
		str = "group-" + id;
		p.appendChild(textnode);
		document.getElementById(str).appendChild(p);
		
    }, function(){
        console.log("Error");
    });
}

//放置商家地圖選單
function setShop() {
	var ul = document.getElementById("Map-content");
	var theclose = {
		"id": 0,
		"name": "最近",
		"picture": "close.jpg"
	};
	doAjaxRequest('GET', webstr+'ajax/List_Shop.php', '', true, function(responseText){
		var data = JSON.parse(responseText);
		createList(ul, theclose, "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/", 
						"group-", "#map-page", "googlemapapi("+theclose["id"]+", '"+theclose["name"]+"')") ;
		for(var i = 0; i < data.length; i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/", 
						"group-", "#map-page", "googlemapapi("+data[i]["id"]+", '"+data[i]["name"]+"')") ;
        }
    }, function(){
        console.log("Error");
    });
}
//顯示商家分店
function showshopMap() {
	doAjaxRequest('GET', webstr+'ajax/MAP.php?shopid='+mapid, '', false, function(responseText){
		location_data = JSON.parse(responseText);
	}, function(){
		
	});
}
//顯示最近地圖
function showcloseMap(lat, lon) {
	doAjaxRequest('GET', webstr+'ajax/closeMAP.php?lat='+lat+"&lon="+lon , '', false, function(responseText){
		location_data = JSON.parse(responseText);
	}, function(){
		
	});
}


//顯示DM商加選單
function setDM() {
	var ul = document.getElementById("DM-content");
	doAjaxRequest('GET', webstr+'ajax/List_DM.php', '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0; i < data.length; i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/", 
						"group-", "#dm-page", "showDM("+data[i]["dmURL"]+"', '"+data[i]["name"]+"')") ;
        }
    }, function(){
        console.log("Error");
    });
}
//顯示DM
function showDM(dmURL) {
	$("#dm-page-nav-title-h2").html("DM - " + name);
	document.getElementById("my-dm-iframe").setAttribute("src", dmURL);
}

//放置 小-分類
function setCategory(groupid, groupname) {	
	var div = document.getElementById("category-page-nav-div");
	var h1 = document.getElementById("category-page-nav-title-h2");
	//div.removeChild(h1);
	$("#category-page-nav-title-h2").remove();
	h1 = document.createElement("h3");
	h1.setAttribute("id", "category-page-nav-title-h2");
	h1.setAttribute("class", "hstyle");
	h1.appendChild(document.createTextNode(groupname));
	div.appendChild(h1);
	doAjaxRequest('GET', webstr+'ajax/List_CategoryByGroup.php?groupid='+groupid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		var ul = document.getElementById("category-page-nav-ul");
		var ulparent = document.getElementById("category-page-nav");
		$("#category-page-nav-ul").remove();
		ul = document.createElement("ul");
		ul.setAttribute("id", "category-page-nav-ul");
		ul.setAttribute("class", "ui-grid-d ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
		ul.setAttribute("role", "tablist");
		ulparent.appendChild(ul);
		var li, a, textnode;
		for(var i = 0; i < data.length; i++){
			createListbar(ul, data[i], i, "category-page-li-id"+data[i]["id"], "#category-page-div-id"+data[i]["id"], "setProduct("+data[i]["id"]+")");
		}
		setProduct(data[0]["id"]);
	}, function(){
		
	});
}

//放置 全商品
function setProduct(categoryid) {	
	var parentul = document.getElementById("Category");
	var ul = document.getElementById("Category-content");
	parentul.removeChild(ul);
	ul = document.createElement("ul");
	ul.setAttribute("id", "Category-content");
	//ul.setAttribute("class", "ui-listview ui-listview-inset ui-corner-all ui-shadow");
	ul.setAttribute("class", "goods-list clear");
	//ul.setAttribute("data-role", "listview");
	//ul.setAttribute("data-inset", "false");
	parentul.appendChild(ul);
	var li, a, img, text1, h2, textnode;
	var str;
	doAjaxRequest('GET', webstr+'ajax/List_ProductByCategory.php?categoryid='+categoryid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0; i < data.length; i++){	
			//createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "product-", "product", "setProductDetail("+data[i]["id"]+")") ; //setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
			createProduct(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "product-", "product", "setProductDetail("+data[i]["id"]+")") ; //setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
        }
    }, function(){
        console.log("Error");
    });
}

//依搜尋結果的類別放置Product
function setProductBySearch(num) {
	var parentul = document.getElementById("Search");
	var ul = document.getElementById("Search-content");
	parentul.removeChild(ul);
	ul = document.createElement("ul");
	ul.setAttribute("id", "Search-content");
	ul.setAttribute("class", "goods-list clear");
	parentul.appendChild(ul);
	for(var i = 0; i < search_data.length; i++){	
		if (parseInt(search_data[i]["groupid"]) == num){
			createProduct(ul, search_data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "product-", "product", "setProductDetail("+search_data[i]["id"]+")") ; //setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
		}
    }    
}

/**/
//放置 商品 明細
function setProductById(productid) {
	doAjaxRequest('GET', webstr+'ajax/List_ProductById.php?productid='+productid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0; i < data.length; i++){
			
		}
    }, function(){
        console.log("Error");
    });	
}

//QRcode scanner
function openScanner() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {	//回傳QRcode掃描內容
			//檢查result是否為指定的內容
			//根據result的參數執行對應的動作(action)
			//如果是商品條碼
			if(result.format=="EAN_13") {
				//alert(result.text);
				location.href="#product-page";
			} else if (result.format="QR_CODE") {
				showQRDetail(result.text);
			} else {
				alert("掃描程式錯誤。\n請擷取畫面向開發人員通報。");
			}
			/*alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
		}, 
		function (error) {
			setMyLogs({"type":"errorScanner","msg":error});
			alert("掃描程式錯誤。\n請擷取畫面向開發人員通報。");
		}
	);
}

//search 
function searchsomething(id) {
	var str = document.getElementById(id).value;
	//document.getElementById(id).value = "";
	doAjaxRequest('GET', webstr+'ajax/List_search.php?str='+str, '', true, function(responseText){
		var data = JSON.parse(responseText);
		var ul = document.getElementById("search-page-nav-ul");
		var ulparent = document.getElementById("search-page-nav");
		$("#search-page-nav-ul").remove();
		ul = document.createElement("ul");
		ul.setAttribute("id", "search-page-nav-ul");
		ul.setAttribute("class", "ui-grid-d ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
		ul.setAttribute("role", "tablist");
		ulparent.appendChild(ul);		
		//搜尋到幾類
		for(var i = 0; i < data[0].length; i++){
			createListbar(ul, data[0][i], i, "search-page-li-id"+data[0][i]["id"], "#search-page-div-id"+data[0][i]["id"], "setProductBySearch("+data[0][i]["id"]+")");			
		}
		//搜尋到商品
		search_data = data[1];
		setProductBySearch(+data[0][0]["id"])
    }, function(){
        console.log("Error");
    });	
}


function showQRDetail(text) {	
	var type = "2";
    var number = text.substr(0, 10);
    var date = 1911+parseInt(text.substr(10,3))+"/"+text.substr(13, 2)+"/"+text.substr(15, 2);
    var random = text.substr(17, 4);
    $.ajax({
        type: "POST",
        data: {
            'type': type,
            'number': number,
            'date': date,
            'random': random
        },
        //url: "https://www.cetustek.com.tw/common/invoice/queryInv.php",
        url: webstr+"ajax/catchphp.php",
        dataType: "json",            
        success: function (data) {
            var msg = authCode(data.code);
            if (msg == "查詢成功")
            {				
				location.href="#qr-page";
                var qr_page = document.getElementById("qr-page");
                $("#QR-content").remove();
				var div_qr = document.createElement("div");
				var table = document.createElement("table");
				var tbody = document.createElement("tbody");
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				var td2 = document.createElement("td");
				var td3 = document.createElement("td");
				var td4 = document.createElement("td");
				var td5 = document.createElement("td");
				var input;
				div_qr.setAttribute("id", "QR-content");
				table.setAttribute("class", "movie-list ui-responsive");
				table.setAttribute("style", "width: 100%");
				td2.setAttribute("style", "width: 57%");
				td3.setAttribute("style", "width: 10%");
				td4.setAttribute("style", "width: 12%");
				td5.setAttribute("style", "width: 12%");
				td2.appendChild(document.createTextNode("品名"));
				td3.appendChild(document.createTextNode("數量"));
				td4.appendChild(document.createTextNode("單價"));
				td5.appendChild(document.createTextNode("小計"));
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				tbody.appendChild(tr);
				table.appendChild(tbody);
				div_qr.appendChild(table);
				qr_page.appendChild(div_qr);
                if (data.details.length > 0) {
                    for (var i = 0; i < data.details.length; i++) {
						input = document.createElement("input");
						input.setAttribute("type", "checkbox");
						input.setAttribute("name", "qr_item");
						input.setAttribute("id", i);
						tr = document.createElement("tr");
						td1 = document.createElement("td");
						td2 = document.createElement("td");
						td3 = document.createElement("td");
						td4 = document.createElement("td");
						td5 = document.createElement("td");
						td1.setAttribute("align", "center");
						td1.appendChild(input);
						td2.appendChild(document.createTextNode(data.details[i].description));
						td3.appendChild(document.createTextNode(data.details[i].quantity));
						td4.appendChild(document.createTextNode(data.details[i].unitPrice));
						td5.appendChild(document.createTextNode(data.details[i].amount));						
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
						tr.appendChild(td4);
						tr.appendChild(td5);
						tbody.appendChild(tr);
                    }
                }
                var a = document.createElement("a");
				a.setAttribute("class", "ui-btn ui-nodisc-icon ui-alt-icon");
				a.setAttribute("href", "#");
				a.appendChild(document.createTextNode("送出"));
				div_qr.appendChild(a);
            } else {
				location.href="#indext-page";
                alert(msg);
            }
            $("#formlodding").fadeOut(0);
        },
        error: function (e) {
            $("#formlodding").fadeOut(0);
        },
        beforeSend: function () {
            $("#formlodding").fadeIn(500);
        }
    });	
}

function authCode(code) {
    var auth = "";
    switch (code)
    {
        case "200":
            auth = "查詢成功";
            break;
        case "500":
            auth = "系統執行錯誤";
            break;
        case "901":
            auth = "無此期別資料";
            break;
        case "902":
            auth = "期別錯誤";
            break;
        case "903":
            auth = "參數錯誤";
            break;
        case "904":
            auth = "錯誤的查詢種類";
            break;
        case "905":
            auth = "註冊失敗";
            break;
        case "906":
            auth = "該號碼&電子郵件已註冊";
            break;
        case "907":
            auth = "捐贈失敗，愛心碼不存在";
            break;
        case "908":
            auth = "捐贈失敗，本發票已捐贈";
            break;
        case "909":
            auth = "歸戶失敗，本卡片已被歸戶";
            break;
        case "911":
            auth = "綁定失敗，銀行代號/帳號資料有誤";
            break;
        case "912":
            auth = "綁定失敗，此載具已綁定另一個銀行帳戶，若資料填寫有誤需更新應載入UpdateAcc欄位";
            break;
        case "913":
            auth = "設定失敗，身分證字號不符合規定";
            break;
        case "914":
            auth = "查無此發票詳細資料";
            break;
        case "950":
            auth = "超過最大查詢次數";
            break;
        case "951":
            auth = "連線逾時";
            break;
        case "952":
            auth = "卡片(QR碼)有效存續時間已過（過期憑證）";
            break;
        case "953":
            auth = "卡片檢查碼有誤（偽造卡片）";
            break;
        case "954":
            auth = "簽名有誤（偽造之訊息、傳遞不完整）";
            break;
        case "997":
            auth = "UUID不符合規定（黑名單）";
            break;
        case "998":
            auth = "appID不符合規定（可能是被停權或是從未申請該appID）";
            break;
        case "999":
            auth = "未知錯誤";
            break;
        default:
            auth = "查詢失敗，請稍後再試一次。";
            break;
    }
    return auth;
}

//關於定位
function initialize() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;	
	
    mapholder = document.getElementById('map-content');
	if(mapid==0) {
		showcloseMap(lat, lon);	
		console.log("close");
	} else {
		showshopMap();
	}

    var latlon = {};
	latlon[0] = new google.maps.LatLng(lat, lon);
	for(var i = 0; i < location_data.length; i++){
		latlon[i+1] = new google.maps.LatLng(location_data[i]["positionX"], location_data[i]["positionY"]);
	}
    var myOptions = {
		center: latlon[0],zoom:14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
    };
    var map = new google.maps.Map(mapholder, myOptions);
    var marker = {};
	var img = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/p.png";
	marker[0] = new google.maps.Marker({
								position: latlon[0], 
								map: map, 
								icon: img,
								title: "現在位子" });
    for(var i = 0; i < location_data.length; i++){
		img = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/" + location_data[i]["shopname"]+".png";
		marker[i+1] = new google.maps.Marker({
								position: latlon[i+1],
								map: map,
								icon: img,
								title: location_data[i]["name"]});
	}
	//location.href="#map-page";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "超時 The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function googlemapapi(id, name) {
	//location_data = null;
	mapid = id;
	mapname = name;
	$("#map-page-nav-title-h2").html("地圖 - " + mapname);
	////var script = document.createElement('script');
	//script.type = 'text/javascript';
	//script.src = 'https://maps.googleapis.com/maps/api/js?callback=initialize';
	//document.body.appendChild(script);
	initialize();
}



