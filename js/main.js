function GetElement(elementName) {
    return document.querySelector(elementName);
};
var canvas = GetElement('#canvas');
var ctx = canvas.getContext('2d');
var image = new Image();
//var newImg = new Image();
GetElement('#browse').onchange = function () {
    var file = GetElement("#browse").files[0];
    var read = new FileReader();
    read.readAsDataURL(file)
    read.onloadend = function () {
        image.src = read.result;
    }
}
GetElement('#save').onclick = function () {
    var path = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    location.href = path;
//    var data = canvas.toDataUrl('image');
//    GetElement('#save').href = data;
}
var action = GetElement('#action');
var url = GetElement('#url');
action.onclick = function () {
    console.log(url.value);
    newImg.src = url.value;
}
image.onload = function () {
   
    ctx.drawImage(image, 0, 0,image.naturalWidth,image.naturalHeight);
}
GetElement('#crop').onclick = function () {
    if (croppie.style.display === 'block') {
        GetElement('.croppie').style.display = 'none';
        GetElement('#crop').nodeValue = 'off';
        GetElement('#crop').style.color = 'red';
    }
    else {
        croppie.style.display = 'block';
        GetElement('#crop').nodeValue = 'on';
        GetElement('#crop').style.color = 'green';
    }
}
var resizeHandle = document.getElementById('handle');
var croppie = GetElement('.croppie');
resizeHandle.addEventListener('mousedown', initialiseResize, false);

function initialiseResize(e) {
    window.addEventListener('mousemove', startResizing, false);
    window.addEventListener('mouseup', stopResizing, false);
}

function startResizing(e) {
    croppie.style.width = (e.clientX - croppie.offsetLeft) + 'px';
    croppie.style.height = (e.clientY - croppie.offsetTop) + 'px';
}

function stopResizing(e) {
    window.removeEventListener('mousemove', startResizing, false);
    window.removeEventListener('mouseup', stopResizing, false);
}
var cursor = GetElement('#cursor');
var selected = null
    , x_pos = 0
    , y_pos = 0
    , x_elem = 0
    , y_elem = 0;
cursor.onmousedown = function () {
    selected = croppie;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}
cursor.onmousemove = function (e) {
    x_pos = document.all ? canvas.event.clientX : e.pageX;
    y_pos = document.all ? canvas.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
        if (parseFloat(selected.style.left) <= 300) {
            selected.style.left = 300 + 'px';
            //             console.log(e.cancelable(cursor.onmousemove));
        }
        else if (parseFloat(selected.style.left) >= 1100 - parseFloat(selected.clientWidth)) {
            selected.style.left = (1100 - parseFloat(selected.clientWidth) + 'px');
            //e.preventDefault();
        }
        if (parseFloat(selected.style.top) >= 599 - parseFloat(selected.clientHeight)) {
            selected.style.top = (599 - parseFloat(selected.clientHeight) + 'px');
        }
        else if (parseFloat(selected.style.top) <= 0) {
            selected.style.top = 0 + 'px';
        }
    }
}
cursor.onmouseup = function () {
    selected = null;
}
var go = GetElement('#go');
go.onclick = function (e) {
    console.log(croppie.style.left)
    var x = parseFloat(croppie.style.left)-298;
    var y = parseFloat(croppie.style.top);
    var wid = parseFloat(croppie.clientWidth);
    var hei = parseFloat(croppie.clientHeight);
    console.log(hei);
    console.log(wid);
    console.log(x);
    console.log(y);
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(image, x, y, wid, hei, x, y, wid, hei);
}


var undo = GetElement('#undo');

undo.onclick = function(){
    ctx.drawImage(image,0,0,image.naturalWidth,image.naturalHeight);
}


//var paste = GetElement('#paste');
//
//paste.onclick = function(){
//    
//}