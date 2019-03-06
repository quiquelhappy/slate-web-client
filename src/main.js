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
        url: "https://b.slateapp.es/login/token/exchange?token=" + token, success: function (result) {
            var data = JSON.parse(result)
            console.log(data);
            if (data.exchanged) {
                console.log("-- TOKEN OK")
                saveCredentials(data.user.uuid, data.user.hash)
                onLogin()
            } else {
                console.log("-- TOKEN ERROR (" + token + "):")
                console.log("Exchanged: " + data.exchanged)
                console.log("Illegal: " + data.illegal)
                alert("El inicio de sesión ha devuelto un valor inválido, vuelva a intentarlo, por favor.")
            }
        }
    });
}

if (localStorage.getItem("uuid") != null) {

    onLogin()

}

function saveCredentials(uuid, hash) {
    console.log("-- SAVING CREDENTIALS")
    localStorage.setItem("uuid", uuid);
    localStorage.setItem("hash", hash);
}