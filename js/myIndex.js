function doAjaxRequest(method, url, data, Synchronize, onComplete, onError){         //Ajax 傳送資料
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = myCallback;
    xhr.open(method, url, Synchronize);
    xhr.send(data);
    function myCallback() {
        if (xhr.readyState < 4) {
            return;// not ready yet
        }
        if (xhr.status !== 200) {
            onError();// the HTTP status code is not OK
        return;
        }
        onComplete(xhr.responseText);// all is fine, do the work
    }
}

//建立清單 Product page
function createProductPage(parentElement, data) {
	var img, h1, div_price, div_tag, div_space, div_heart, a_tag, a_heart;
	console.log(data[1].length);
	img = document.createElement("img");
	img.setAttribute("src", "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/" + data[0]["picture"]);
	
	h1 = document.createElement("h1");
	h1.appendChild(document.createTextNode(data[0]["name"]));
	
	div_price = document.createElement("div");
	div_price.setAttribute("class", "list-price nono");
	
	div_tag = document.createElement("div");
	div_tag.setAttribute("style", "float:right");
	
	div_space = document.createElement("div");
	div_space.setAttribute("style", "float:right");
	
	div_heart = document.createElement("div");
	div_heart.setAttribute("style", "float:right");
	
	a_tag = document.createElement("a");
	a_tag.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-tag ui-nodisc-icon ui-alt-icon");
	a_tag.setAttribute("href", "#");
	a_tag.setAttribute("onclick", "addNewList(" + data[0]["id"] + ")");
	
	
	a_heart = document.createElement("a");
	a_heart.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-heart ui-nodisc-icon ui-alt-icon");
	a_heart.setAttribute("href", "#");
	a_heart.setAttribute("onclick", "addNewLove(" + data[0]["id"] + ")");
	
	div_tag.appendChild(a_tag);
	div_space.appendChild(document.createTextNode("　"));
	//div_heart.appendChild(a_heart);
	
	div_price.appendChild(div_tag);
	div_price.appendChild(div_space);
	//div_price.appendChild(div_heart);
	
	var table, tbody, tr, th, td_price, td_check, a_check;
	table = document.createElement("table");
	table.setAttribute("class", "movie-list ui-responsive");
	table.setAttribute("style", "width:100%;");
	
	tbody = document.createElement("tbody");
	
	for(var i = 0;i < data[1].length;i++) {
		tr = document.createElement("tr");
		
		th = document.createElement("th");
		th.appendChild(document.createTextNode(data[1][i]["shopname"]));
		
		td_price = document.createElement("td");
		td_price.setAttribute("style", "width: 35%;")
		td_price.appendChild(document.createTextNode(data[1][i]["price"]));
		
		td_check = document.createElement("td");
		td_check.appendChild(document.createTextNode("尚未開放"));
		td_check.appendChild(document.createTextNode("　"));
		
		
		/*<div class="ui-flipswitch ui-shadow-inset ui-bar-inherit custom-label-flipswitch ui-corner-all">
			<a href="#" class="ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit">取消</a>
			<span class="ui-flipswitch-off">正確</span>
			<input type="checkbox" data-role="flipswitch" id="flip-1" data-on-text="取消" data-off-text="正確" data-wrapper-class="custom-label-flipswitch" class="ui-flipswitch-input" tabindex="-1">
			<input type="checkbox" data-role="flipswitch" id="flip-1" data-on-text="取消" data-off-text="正確" data-wrapper-class="custom-label-flipswitch">
		</div>
		var input_check, div_flip, a_flip, span_flip;
		div_flip = document.createElement("div");
		div_flip.setAttribute("class", "ui-flipswitch ui-shadow-inset ui-bar-inherit custom-label-flipswitch ui-corner-all");
		a_flip = document.createElement("a");
		a_flip.setAttribute("href", "#");
		a_flip.setAttribute("class", "ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit");
		a_flip.appendChild(document.createTextNode("取消"));
		span_flip = document.createElement("span");
		span_flip.setAttribute("class", "ui-flipswitch-off");
		span_flip.appendChild(document.createTextNode("正確"));
		input_check = document.createElement("input");
		input_check.setAttribute("type", "checkbox");
		input_check.setAttribute("data-role", "flipswitch");
		input_check.setAttribute("id", "flip-"+i);
		input_check.setAttribute("data-on-text", "取消");
		input_check.setAttribute("data-off-text", "正確");
		input_check.setAttribute("data-wrapper-class", "custom-label-flipswitch");
		input_check.setAttribute("onclick", "update(" + data[0]["id"] + ", " + i+1 + ")");
		input_check.setAttribute("class", "ui-flipswitch-input");
		input_check.setAttribute("tabindex", "-1");
		div_flip.appendChild(a_flip);
		div_flip.appendChild(span_flip);
		div_flip.appendChild(input_check);
		td_check.appendChild(div_flip);
		td_check.appendChild(input_check);*/
		
		a_check = document.createElement("a");
		a_check.setAttribute("class", "checkclass");
		a_check.appendChild(document.createTextNode("正確"));
		if (true) {
			a_check.setAttribute("style", "color: #33abff;");
		}
		td_check.appendChild(a_check)
		
		tr.appendChild(th);
		tr.appendChild(td_price);
		tr.appendChild(td_check);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	
	parentElement.appendChild(img);
	parentElement.appendChild(h1);
	parentElement.appendChild(div_price);
	parentElement.appendChild(table);
}

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
	//li.setAttribute("class","ui-li-has-thumb");//
	a_img = document.createElement("a");
	str = id+data['id'];
	a_img.setAttribute("id", str);
	//a_img.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");//
	a_img.setAttribute("data-transition", "none");//
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
	//div.appendChild(document.createTextNode("$ "));
	span_price = document.createElement("span");
	span_price.setAttribute("class", "price-new");
	span_price.appendChild(document.createTextNode("100"));
	//span_price.appendChild(document.createTextNode(data["price"]));
	span_note = document.createElement("span");
	span_note.setAttribute("class", "good-btn");
	span_note.appendChild(document.createTextNode("備註"));
	a_list = document.createElement("a");
	a_list.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-tag ui-nodisc-icon ui-alt-icon ui-btn-inline");
	a_list.setAttribute("onclick", "");
	a_list.setAttribute("href", "#");
	a_list.setAttribute("data-theme", "b");
	a_list.setAttribute("style", "background-color: #ffffff; border-color: #ffffff;");
	a_love = document.createElement("a");
	a_love.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-heart ui-nodisc-icon ui-alt-icon ui-btn-inline");
	a_love.setAttribute("onclick", "");
	a_love.setAttribute("href", "#");
	a_love.setAttribute("data-theme", "b");
	//div.appendChild(span_price);
	div.appendChild(span_note);
	div.appendChild(document.createTextNode("  "));
	div.appendChild(a_list);
	div.appendChild(document.createTextNode(" "));
	//div.appendChild(a_love);
	
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
	img.setAttribute("style","width: 228px;height: 228px;");
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
	//li.setAttribute("class", "ui-state-default ui-corner-top ui-block-"+String.fromCharCode(97+i));
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
		for(var i = 0;i < data.length;i++){	
		}	
	}, function(){
		
	});
*/

$(window).on("orientationchange",function(event){	
	if(event.orientation == "landscape"){
		imgheight = windowheight;
	}else{ //portrait
		imgheight = windowwidth;
	}
});
var mapid, mapname, location_data;
var webstr = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/04/";
var x;
var isInDataBarcode;
var QRdata;
var search_data;
var windowwidth = $(window).width()* 0.5;
var windowheight = $(window).height()* 0.5;
var imgheight = 210;
window.onload = function () {
	//setGroup();
	setShop();
	setDM();
			setNews();
	x = document.getElementById("map-content-h");
	$("#overlayPanel").css("background-color", "#e3eff7");
	location.href="#login-page";
}

//放置 大-分類
function setGroup() {
	$("#Group-content").html("");
	var ul = document.getElementById("Group-content");
	var textnode;
	var str;
	var p;
	var id;
	doAjaxRequest('GET', webstr+'ajax/List_Group.php', '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0;i < data.length;i++){				
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/group/", 
						"group-", "#category-page", "setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')") ;
			p = document.createElement("p");
			textnode = document.createTextNode(data[i]["content"]);
			str = "group-" + data[i]["id"];
			p.appendChild(textnode);
			document.getElementById(str).appendChild(p);
        }
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
		for(var i = 0;i < data.length;i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/", 
						"group-", "#map-page", "googlemapapi("+data[i]["id"]+", '"+data[i]["name"]+"')") ;
        }
    }, function(){
        console.log("Error");
    });
}
//顯示商家分店
function showshopMap() {
	doAjaxRequest('GET', webstr+'ajax/MAP.php?shopid='+mapid, '', true, function(responseText){
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

//顯示最新
function setNews() {
	$("#News").html("");
	var ul = document.createElement("ul");
	ul.setAttribute("id", "News-content");
	ul.setAttribute("class", "goods-list clear");
	ul.setAttribute("data-theme", "b");
	$("#News")[0].appendChild(ul);
	doAjaxRequest('GET', webstr+'ajax/List_News.php', '', false, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0;i < data.length;i++){	
			createProduct(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "news-", "news", "setNewsProductDetail("+data[i]["id"]+")") ;
		}
	}, function(){
		
	});
}

//顯示DM商加選單
function setDM() {
	var ul = document.getElementById("DM-content");
	doAjaxRequest('GET', webstr+'ajax/List_DM.php', '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0;i < data.length;i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/", 
						"DM-", "#dm-page", "showDM("+data[i]["dmURL"]+"', '"+data[i]["name"]+"')") ;
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
		var ulparent = document.getElementById("category-page-nav").children[1];
		ulparent.setAttribute("style", "background-color: #9dcef0; border-color: #9dcef0;");
		$("#category-page-nav-ul").remove();
		ul = document.createElement("ul");
		ul.setAttribute("id", "category-page-nav-ul");
		//ul.setAttribute("class", "ui-grid-d ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
		//ul.setAttribute("role", "tablist");
		ul.setAttribute("data-role", "listview");
		ulparent.appendChild(ul);
		var li, a, textnode;
		for(var i = 0;i < data.length;i++){
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
	ul.setAttribute("class", "goods-list clear");
	//ul.setAttribute("class", "ui-listview ui-listview-inset ui-corner-all ui-shadow");
	//ul.setAttribute("data-role", "listview");
	//ul.setAttribute("data-inset", "false");
	parentul.appendChild(ul);
	var li, a, img, text1, h2, textnode;
	var str;
	doAjaxRequest('GET', webstr+'ajax/List_ProductByCategory.php?categoryid='+categoryid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0;i < data.length;i++){	
			createProduct(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "product-", "product", "setProductDetail("+data[i]["id"]+")") ;//setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
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
	for(var i = 0;i < search_data.length;i++){	
		if (parseInt(search_data[i]["groupid"]) == num){
			createProduct(ul, search_data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "search-product-", "search-product", "setSearchProductDetail("+search_data[i]["id"]+")") ;//setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
		}
    }    
}


//放置 商品 明細 (最新-商品)
function setNewsProductDetail(productid) {
	$("#news-Product").remove();
	var div_product_content = document.createElement("div");
	div_product_content.setAttribute("id", "news-Product");
	div_product_content.setAttribute("data-role", "main");
	div_product_content.setAttribute("class", "ui-content");
	document.getElementById("news-product-tabs").appendChild(div_product_content);
	doAjaxRequest('GET', webstr+'ajax/List_ProductById.php?productid='+productid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		createProductPage(div_product_content, data);
    }, function(){
        console.log("Error");
    });
}

//放置 商品 明細 (條碼-商品)
function setCodeProductDetail(barcode) {
	$("#barcode-Product").remove();
	var div_product_content = document.createElement("div");
	div_product_content.setAttribute("id", "barcode-Product");
	div_product_content.setAttribute("data-role", "main");
	div_product_content.setAttribute("class", "ui-content");
	document.getElementById("barcode-product-tabs").appendChild(div_product_content);
	doAjaxRequest('GET', webstr+'ajax/List_ProductByBarcode.php?barcode='+barcode, '', true, function(responseText){
		var data = JSON.parse(responseText);
		createProductPage(div_product_content, data);
    }, function(){
        console.log("Error");
    });
}

//放置 商品 明細 (搜尋-商品)
function setSearchProductDetail(productid) {
	$("#search-Product").remove();
	var div_product_content = document.createElement("div");
	div_product_content.setAttribute("id", "search-Product");
	div_product_content.setAttribute("data-role", "main");
	div_product_content.setAttribute("class", "ui-content");
	document.getElementById("search-product-tabs").appendChild(div_product_content);
	doAjaxRequest('GET', webstr+'ajax/List_ProductById.php?productid='+productid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		createProductPage(div_product_content, data);
    }, function(){
        console.log("Error");
    });
}

//放置 商品 明細 (類別-商品)
function setProductDetail(productid) {
	$("#Product").remove();
	var div_product_content = document.createElement("div");
	div_product_content.setAttribute("id", "Product");
	div_product_content.setAttribute("data-role", "main");
	div_product_content.setAttribute("class", "ui-content");
	document.getElementById("product-tabs").appendChild(div_product_content);
	doAjaxRequest('GET', webstr+'ajax/List_ProductById.php?productid='+productid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		createProductPage(div_product_content, data);
    }, function(){
        console.log("Error");
    });
}

//確認 是否有此 barcode
function isInData(barcode) {
																			//false 不可更改
	doAjaxRequest('GET', webstr+'ajax/isInDataBarcode.php?barcode='+barcode, '', false, function(responseText){
		var data = JSON.parse(responseText);
		if (data == 1){			
			isInDataBarcode = true;
		} else {
			isInDataBarcode = false;
		}
	}, function(){
		
	});
}

//新增 barcode
function saveNewBarcode() {
	var xhr = new XMLHttpRequest();
    xhr.open("POST", webstr+'ajax/saveNewBarcode.php', true);
    var data = new FormData();
    
    var fileInput = document.getElementById("new-barcode-input-picture");
    var file = fileInput.files[0];
	
    var name = document.getElementById("new-barcode-input-name");
    var barcode = document.getElementById("new-barcode-input-barcode");
    var shop = document.getElementById("new-barcode-input-shop");
    var price = document.getElementById("new-barcode-input-price");
    var userid = document.getElementById("userid");
    data.append("uploadFile[]", file);
    data.append("name", name.value);
    data.append("barcode", barcode.value);
    data.append("shop", shop.value);
    data.append("price", price.value);
    data.append("userid", userid.value);
	
    name.value = null;
    barcode.value = null;
    shop.value = null;
    price.value = null;
    fileInput.value = null;
    
    xhr.send(data);
}

//QRcode scanner
function openScanner() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {	//回傳QRcode掃描內容
			//檢查result是否為指定的內容
			//根據result的參數執行對應的動作(action)
			//如果是商品條碼
			if(result.format=="EAN_13" || result.format=="UPC_E" || result.format=="EAN_8") {
				isInDataBarcode = false;
				isInData(result.text);
				if(isInDataBarcode){
					setCodeProductDetail(result.text);
					location.href="#barcode-product-page";
				} else {
					//alert("查無此商品");
					location.href="#check-new-barcode-page";
					$("#check-new-barcode-isYes").click(function() {
						$("#new-barcode-input-barcode").val(result.text);
					});
				}
				//location.href="#product-page";
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

//送出 QR 更新
function sendQRList() {	
	var _url = webstr+'ajax/sendQRList.php';
	var checkbox = $('input[name="qr_item[]"]:checked');
	var userid = $('#userid').val();
	var point = $('#user-input-point').val();
	var checkboxValue = {};
	var dataChecked = {};
	location.href="#index-page";
	for(var i=0; i<checkbox.length; i++) {
		dataChecked[i] = QRdata.details[parseInt(checkbox[i].value)]; 
	}	
	$.ajax({
		url: _url,
		cache: false,
		dataType: 'json',
		type:'POST',
		data: {
			shopname: QRdata.sellerName, 
			dataChecked: dataChecked,
			date: QRdata.invDate,
			point: point,
			userid: userid
		},
		error:function(){ },
		success: function(res){}
    });
}

//search 
function searchsomething(id) {
	var str = document.getElementById(id).value;
	document.getElementById(id).value = "";
	//document.getElementById(id).value = "";
	doAjaxRequest('GET', webstr+'ajax/List_search.php?str='+str, '', true, function(responseText){
		var data = JSON.parse(responseText);
		var ul = document.getElementById("search-page-nav-ul");
		var ulparent = document.getElementById("search-page-nav").children[1];
		ulparent.setAttribute("style", "background-color: #9dcef0; border-color: #9dcef0;");
		$("#search-page-nav-ul").remove();
		ul = document.createElement("ul");
		ul.setAttribute("id", "search-page-nav-ul");
		//ul.setAttribute("class", "ui-grid-d ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
		//ul.setAttribute("role", "tablist");
		ul.setAttribute("data-role", "listview");
		ulparent.appendChild(ul);
		//搜尋到幾類
		if(data[0].length == 0) {
			alert("null");
			return;
		}			
		for(var i = 0;i < data[0].length;i++){
			createListbar(ul, data[0][i], i, "search-page-li-id"+data[0][i]["id"], "#search-page-div-id"+data[0][i]["id"], "setProductBySearch("+data[0][i]["id"]+")");
		}
		//搜尋到商品
		search_data = data[1];
		setProductBySearch(+data[0][0]["id"])
    }, function(){
        console.log("Error");
    });
}

//顯示 發票 明細
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
				var tr1 = document.createElement("tr");
				var tr2 = document.createElement("tr");
				var td0 = document.createElement("td");
				var td1 = document.createElement("th");
				var td2 = document.createElement("th");
				var td3 = document.createElement("th");
				var td4 = document.createElement("th");
				var td5 = document.createElement("th");
				var h = document.createElement("h2");
				var centerH = document.createElement("center");
				var input;
				div_qr.setAttribute("id", "QR-content");
				table.setAttribute("class", "movie-list ui-responsive");
				table.setAttribute("style", "width: 100%");
				tr1.setAttribute("style", "height: 42px");
				td0.setAttribute("colspan", "5");
				td2.setAttribute("style", "width: 47%");
				td3.setAttribute("style", "width: 13%");
				td4.setAttribute("style", "width: 15%");
				td5.setAttribute("style", "width: 15%");
				h.appendChild(document.createTextNode(data.sellerName));
				td2.appendChild(document.createTextNode("品名"));
				td3.appendChild(document.createTextNode("數量"));
				td4.appendChild(document.createTextNode("單價"));
				td5.appendChild(document.createTextNode("小計"));
				td0.appendChild(centerH);
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				tr2.appendChild(td0);
				tbody.appendChild(tr1);
				tbody.appendChild(tr2);
				tbody.appendChild(tr);
				table.appendChild(tbody);
				centerH.appendChild(h);
				//div_qr.appendChild(centerH);
				div_qr.appendChild(table);
				qr_page.appendChild(div_qr);
                if (data.details.length > 0) {
                    for (var i = 0;i < data.details.length;i++) {
						input = document.createElement("input");
						input.setAttribute("type", "checkbox");
						input.setAttribute("name", "qr_item[]");
						input.setAttribute("value", i);
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
				QRdata = data;
				a.setAttribute("onclick", "sendQRList()");
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

//QR 錯誤訊息
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
	$('#map-content').html('<center><object data="images/loader.svg" type="image/svg+xml"><img src="images/loader.gif" style="width:50%"></object></center>');
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    mapholder = document.getElementById('map-content');
	location_data = null
	if(mapid==0) {
		showcloseMap(lat, lon);
	} else {
		showshopMap();
	}	
	setTimeout(function(){
		$('#map-content').html("");
		var latlon = {};
		latlon[0] = new google.maps.LatLng(lat, lon);
		for(var i = 0;i < location_data.length;i++){
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
		for(var i = 0;i < location_data.length;i++){
			img = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/shop/" + location_data[i]["shopname"]+".png";
			marker[i+1] = new google.maps.Marker({
									position: latlon[i+1],
									map: map,
									icon: img,
									title: location_data[i]["name"]});
		}
	}, 3000 );
	
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

//關於 帳號
//建立 使用者
function createAccount() {
	var account = $("#account-input-account").val();
	var password = $("#account-input-password").val();
	var name = $("#account-input-name").val();
	if (account == "" || password == "" || name == "") {
		$("#createMessage").html("不可空白!!");
		return;
	}
	var str = "?account=" + account + "&password=" + password + "&name=" + name ;//+ "&cellphone=" + cellphone;
	$("#account-create").unbind("click", createAccount);
	doAjaxRequest('GET', webstr+'ajax/createAccount.php' + str, '', true, function(responseText){
		var data = JSON.parse(responseText);
		if (data == 1) {
			$("#createMessage").html("註冊成功!!");
			$("#account-input-account").val("");
			$("#account-input-password").val("");
			$("#account-input-name").val("");
			$("#account-create").removeAttr("href");
			location.href="#login-page";
		} else {			
			$("#createMessage").html("註冊失敗，有問題請洽相關單位!!");
		}
	}, function(){
		
	});
}

//確認 帳號 不重複
function checkAccount() {
	var account = $("#account-input-account").val();
	$("#account-create").unbind("click", createAccount);//
	if (account.length < 8){
		$("#accountMessage").html("帳號長度須大於八字元");
		return;
	}
	doAjaxRequest('GET', webstr+'ajax/checkAccount.php?account='+account, '', true, function(responseText){
		var data = JSON.parse(responseText);
		if (data == 0) {
			$("#accountMessage").html("這個帳號可以使用!!");
			$("#account-create").click(createAccount);
		} else {
			$("#accountMessage").html("帳號重復!!");
		}
	}, function(){
		
	});
}
//登入
function login() {
	var account = $("#login-input-account").val();
	var password = $("#login-input-password").val();
	doAjaxRequest('GET', webstr+'ajax/login.php?account='+account+'&password='+password, '', true, function(responseText){
		var data = JSON.parse(responseText);
		if (data[0] == 1) {
			$("#account-login").removeAttr("href");
			$("#loginMessage").html("登入成功!!");
			$("#user-input-name").val(data[1]["name"]);
			$("#user-input-account").val(data[1]["account"]);
			$("#user-input-point").val(data[1]["point"]);
			$("#userid").val(data[1]["id"]);
			$("#login-input-account").val("");
			$("#login-input-password").val("");
			
			location.href="#index-page";
		} else {			
			$("#loginMessage").html("登入失敗!!");
		}		
	}, function(){
		
	});
}
//登出
function logout() {
	$("#userid").removeAttr("value");
	$("#user-input-name").removeAttr("value");
	$("#user-input-account").removeAttr("value");
	$("#userid").val("");
	$("#user-input-name").val("");
	$("#user-input-account").val("");
}
//修改密碼
function updateUser() {
	var account = $("#user-input-account").val();
	var password = $("#user-input-old-password").val();
	var newpassword = $("#user-input-new-password").val();
	var userid = $("#userid").val();
	if (password == newpassword) {
		$("#updateMessage").html("新舊密碼需不一樣!!");
		return;
	} else if(password == "" || newpassword == "") {
		$("#updateMessage").html("不可空白!!");
		return;
	}
	doAjaxRequest('GET', webstr+'ajax/login.php?account='+account+'&password='+password, '', true, function(responseText){
		var data = JSON.parse(responseText);
		if (data[0] == 1) {			
			doAjaxRequest('GET', webstr+'ajax/updateUser.php?account='+account+'&password='+newpassword+'&userid='+userid, '', true, function(XresponseText){
				var Xdata = JSON.parse(XresponseText);
				if (Xdata == 1) {
					$("#user-input-old-password").removeAttr("value");
					$("#user-input-new-password").removeAttr("value");
					$("#user-input-old-password").val("");
					$("#user-input-new-password").val("");
					$("#updateMessage").html("密碼修改成功!!");
				} else {			
					$("#updateMessage").html("密碼修改失敗!!");
				}		
			}, function(){
				
			});
		} else {			
			$("#updateMessage").html("舊密碼輸入錯誤!!");
		}		
	}, function(){
		
	});
}

//資料
function setRecord() {
	var userid = $("#userid").val();
	var div = $("#record");
	div.html("");
	div = div[0];
	doAjaxRequest('GET', webstr+'ajax/List_record.php?userid='+userid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		var tr, td1, td2, td3, td4, td5;
		table.setAttribute("style", "width: 100%");
		table.setAttribute("align", "center");
		tr = document.createElement("tr");
		tr.setAttribute("style", "font-size: 12px; height: 27px");
		td1 = document.createElement("th");
		td2 = document.createElement("th");
		td3 = document.createElement("th");
		td4 = document.createElement("th");
		td5 = document.createElement("th");
		td1.setAttribute("style", "width: 15%");
		td2.setAttribute("style", "width: 44%");
		td3.setAttribute("style", "width: 15%");
		td4.setAttribute("style", "width: 20%");
		td5.setAttribute("style", "width: 6%");
		td1.appendChild(document.createTextNode("賣場"));
		td2.appendChild(document.createTextNode("商品名"));
		td3.appendChild(document.createTextNode("價格"));
		td4.appendChild(document.createTextNode("狀態"));
		td5.appendChild(document.createTextNode("點數"));		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tbody.appendChild(tr);
		for(var i = 0;i < data.length;i++){	
			tr = document.createElement("tr");
			tr.setAttribute("style", "font-size: 10px; ");
			td1 = document.createElement("td");
			td2 = document.createElement("td");
			td3 = document.createElement("td");
			td4 = document.createElement("td");
			td5 = document.createElement("td");
			td1.appendChild(document.createTextNode(data[i]['shopname']));
			td2.appendChild(document.createTextNode(data[i]['name']));
			td3.appendChild(document.createTextNode(data[i]['price']));
			td4.appendChild(document.createTextNode(data[i]['state']));
			td5.appendChild(document.createTextNode(data[i]['point']));
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		div.appendChild(table);
	}, function(){
		
	});
}

function setAccount() {
	var userid = $("#userid").val();
	doAjaxRequest('GET', webstr+'ajax/getAccount.php?userid='+userid, '', true, function(responseText){
		var data = JSON.parse(responseText);
		$("#user-input-name").val(data["name"]);
		$("#user-input-account").val(data["account"]);
		$("#user-input-point").val(data["point"]);
	}, function(){
		
	});
}
