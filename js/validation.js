function validateForm() {
    var ids = document.getElementById("finmsg");
    ids.innerHTML = "</br>";
    var res = true;
    res = usech() && res;
    res = passch() && res;
    res = passwordch() && res;
    res = telech() && res;
    return res;
}
function logch() {
    var ids = document.getElementById("euse");
    ids.innerHTML = "</br>";
}
function telech() {
    var ids = document.getElementById("telemsg");
    var thing = document.getElementById("tele");
    ids.style.color = "red";
    ids.innerHTML = "</br>";
    if (thing.value.length == 0) {
        ids.innerHTML = "</br>";
        return false;
    }
    else if (!(/^\d+$/.test(thing.value))) {
        ids.innerHTML = "error, telephone must only contain numbers";
        thing.style.color = 'red';
        return false;
    }
    else if (!(thing.value.length == 10)) {
        ids.innerHTML = "error, telephone may only contain 10 numbers";
        thing.style.color = 'red';
        return false;
    }
    else {
        thing.style.color = 'black';
        return true;
    }
}

function passch() {
    var ids = document.getElementById("passmsg");
    var thing = document.getElementById("pass");
    ids.style.color = "red";
    ids.innerHTML = "</br>";
    if (thing.value.length == 0) {
        ids.innerHTML = "</br>";
        return false;
    }
    else if (!(/[A-Z]/.test(thing.value))) {
        ids.innerHTML = "error, password must include an uppercase letter";
        thing.style.color = 'red';
        return false;
    }
    else if ((thing.value.length > 30)) {
        ids.innerHTML = "error, password must be under 30 characters";
        thing.style.color = 'red';
        return false;
    }
    else if (!(thing.value.length > 7)) {
        ids.innerHTML = "error, password must be over 7 characters";
        thing.style.color = 'red';
        return false;
    }
    else {
        thing.style.color = 'black';
        return true;
    }
}

function usech() {
    var ids = document.getElementById("usemsg");
    var thing = document.getElementById("use");
    ids.style.color = "red";
    ids.innerHTML = "</br>";
    if (thing.value.length == 0) {
        ids.innerHTML = "</br>";
        return false;
    }
    else if (!(/^[A-Za-z]+$/.test(thing.value))) {
        ids.innerHTML = "error, username can not include numbers";
        thing.style.color = 'red';
        return false;
    }
    else if (thing.value.length > 20) {
        ids.innerHTML = "error, username must be under 20 characters";
        thing.style.color = 'red';
        return false;
    }
    else {
        thing.style.color = 'black';
        return true;
    }
}

function passwordch() {
    var ids = document.getElementById("passwordmsg");
    var thing = document.getElementById("password");
    var thingsa = document.getElementById("pass");
    ids.style.color = "red";
    ids.innerHTML = "</br>";
    if (thing.value.length == 0) {
        ids.innerHTML = "</br>";
        return false;
    }
    else if (!(thing.value == thingsa.value)) {
        ids.innerHTML = "error, password is not the same";
        thing.style.color = 'red';
        return false;
    }
    else {
        thing.style.color = 'black';
        return true;
    }
}
