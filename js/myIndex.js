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
function createList() {
	
}

//建立點選方格 a
function createList(parentElement, data, url, id, next, eventfunction) {
	
	var li, a, img, text1, h2, textnode;
	var str;
	li = document.createElement("li");
	li.setAttribute("class","ui-li-has-thumb");
	a = document.createElement("a");
	str = id+data['id'];
	a.setAttribute("id", str);
	a.setAttribute("href", "#"+next+"-page");
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

/*
doAjaxRequest('GET', webstr+'ajax/List_Group.php', '', false, function(responseText){
	var data = JSON.parse(responseText);
	for(var i = 0; i < data.length; i++){	
	}	
}, function(){
	
});
*/


var webstr = "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/04/";
window.onload = function () {
	setGroup();
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
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/group/", "group-", "category", "setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')") ;
			/*li = document.createElement("li");
			li.setAttribute("class","ui-li-has-thumb");
			a = document.createElement("a");
			str = "group-"+data[i]['id'];
			a.setAttribute("id", str);
			a.setAttribute("href", "#category-page");
			a.setAttribute("onclick", "setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')");
			a.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");
			a.setAttribute("data-transition", "none");
			img = document.createElement("img");
			img.setAttribute("src", "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/group/"+ data[i]['picture'])
			img.setAttribute("class","ui-li-thumb");
			img.setAttribute("style","width: 228px; height: 228px; ");
			h2 = document.createElement("h2");
			textnode = document.createTextNode(data[i]['name']);
			h2.appendChild(textnode);
			a.appendChild(img);
			a.appendChild(h2);
			li.appendChild(a);
			ul.appendChild(li);*/
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

//放置 小-分類
function setCategory(groupid, groupname) {	
	var div = document.getElementById("category-page-nav");
	var h1 = document.getElementById("category-page-nav-title-h2");
	div.removeChild(h1);
	h1 = document.createElement("h3");
	h1.setAttribute("id", "category-page-nav-title-h2");
	h1.setAttribute("style", "float:left; margin: 20px 0 20px 0;");
	h1.appendChild(document.createTextNode(groupname));
	div.appendChild(h1);
	doAjaxRequest('GET', webstr+'ajax/List_CategoryByGroup.php?groupid='+groupid, '', false, function(responseText){
		var data = JSON.parse(responseText);
		var ul = document.getElementById("category-page-nav-ul");
		var ulparent = document.getElementById("category-page-nav");
		ul.parentNode.removeChild(ul);
		ul = document.createElement("ul");
		ul.setAttribute("id", "category-page-nav-ul");
		ul.setAttribute("class", "ui-grid-d ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
		ul.setAttribute("role", "tablist");
		ulparent.appendChild(ul);
		var li, a, textnode;
		for(var i = 0; i < data.length; i++){
			li = document.createElement("li");
			a = document.createElement("a");
			li.setAttribute("class", "ui-state-default ui-corner-top ui-block-"+String.fromCharCode(97+i));
			a.setAttribute("href", "#category-page-div-id"+data[i]["id"]);
			a.setAttribute("data-theme", "a");
			a.setAttribute("data-ajax", "false");
			a.setAttribute("class", "ui-btn ui-corner-all");
			a.setAttribute("id", "category-page-li-id"+data[i]["id"]);
			a.setAttribute("data-transition", "none");
			a.setAttribute("onclick", "setProduct("+data[i]["id"]+")");
			textnode = document.createTextNode(data[i]["name"]);
			a.appendChild(textnode);
			li.appendChild(a);
			ul.appendChild(li);
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
	ul.setAttribute("class", "ui-listview ui-listview-inset ui-corner-all ui-shadow");
	ul.setAttribute("data-role", "listview");
	ul.setAttribute("data-role", "listview");
	ul.setAttribute("data-inset", "true");
	parentul.appendChild(ul);
	var li, a, img, text1, h2, textnode;
	var str;
	doAjaxRequest('GET', webstr+'ajax/List_ProductByCategory.php?categoryid='+categoryid, '', false, function(responseText){
		var data = JSON.parse(responseText);
		for(var i = 0; i < data.length; i++){	
			createList(ul, data[i], "http://fs.mis.kuas.edu.tw/~s1102137126/105_graduation/02/images/product/", "product-", "product", "setProductDetail("+data[i]["id"]+")") ; //setCategory("+data[i]["id"]+", '"+data[i]["name"]+"')
        }
    }, function(){
        console.log("Error");
    });
}

//放置 商品 明細
function setProductDetail(productid) {
	
}

function setProductById(productid) {
	doAjaxRequest('GET', webstr+'ajax/List_ProductById.php?productid='+productid, '', false, function(responseText){
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
			alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
		}, 
		function (error) {
			setMyLogs({"type":"errorScanner","msg":error});
			alert("掃描程式錯誤。\n請擷取畫面向開發人員通報。");
		}
	);
}