var values = JSON.parse('{"login-uri":"https://b.slateapp.es/login", "logout-uri":"https://b.slateapp.es/logout"}')

function login(){
    document.location.href=values["login-uri"]
}

function logout(){
    document.location.href=values["logout-uri"]
}