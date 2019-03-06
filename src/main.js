var values = JSON.parse('{"login-uri":"https://b.slateapp.es/login", "logout-uri":"https://b.slateapp.es/logout"}')

function login() {
    document.location.href = values["login-uri"]
}

function logout() {
    document.location.href = values["logout-uri"]
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName("token") != null) {
    redeemToken(getParameterByName("token"));
}

function redeemToken(token) {
    $.ajax({
        method: "POST",
        url: "https://b.slateapp.es/login/token/exchange",
        data: { token: token }
    }).done(function (msg) {
        var data = JSON.parse(msg)
        if(data.exchanged){
            console.log("-- TOKEN OK")
            saveCredentials(data.user.uuid,data.user.hash)
        } else {
            console.log("-- TOKEN ERROR:")
            console.log("Exchanged: " + data.exchanged)
            console.log("Illegal: " + data.illegal)
            alert("El inicio de sesión ha devuelto un valor inválido, vuelva a intentarlo, por favor.")
        }
    });
}

function saveCredentials(uuid,hash){
    console.log("-- SAVING CREDENTIALS")
    localStorage.setItem("uuid",uuid);
    localStorage.setItem("hash",hash);
}