// add excute function
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof oldonload !== 'function') {
        window.onload = func;
    } else {
        oldonload();
        func();
    }
}

function validateForm(whichForm) {
    var textarea = whichForm.getElementsByTagName("textarea")[0];
    if (textarea.value.trim().length <= 0) {
        alert("Message is empty!");
        return false;
    }
    return true;
}

function submitFormWithAjax(whichform, thetarget) {
    var request = new XMLHttpRequest();
    if (!request) return false;

    // get textarea message value
    var sourceData = whichform.getElementsByTagName("textarea")[0].value;
    var data = encodeURIComponent(sourceData);

    request.open('POST', whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var matches = request.responseText.match(/<p>([\s\S]+)<\/p>/);
                if(matches && matches.length > 0) {
                    thetarget.innerHTML = matches[0];
                    // add message to list
                    var ul = document.getElementById("messages");
                    var message_li = document.createElement("li");
                    var message_textnode = document.createTextNode(sourceData);
                    message_li.appendChild(message_textnode);
                    ul.appendChild(message_li);
                } else {
                    thetarget.innerHTML = "<p>Message Submit Error</p>";
                }
            }
        }
    };

    request.send(data);
    return true;
}

function prepareForm() {
    var thisform = document.forms[0];
    thisform.onsubmit = function () {
      if (!validateForm(this)) return false;
      var thetarget = document.getElementById("tip");
      if (submitFormWithAjax(thisform, thetarget)) return false;
      return true;
    };
}

addLoadEvent(prepareForm);
