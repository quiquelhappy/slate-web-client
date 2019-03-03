Userback = window.Userback || {};
Userback.access_token = '5204|7234|taVQG5us9EN5eQF2QjAu7I0TGtDMI1cgQ3bTiS9cAqFNsfMhG5';

(function (id) {
    if (document.getElementById(id)) { return; }
    var s = document.createElement('script');
    s.id = id;
    s.async = 1;
    s.src = 'https://static.userback.io/widget/v1.js';
    var parent_node = document.head || document.body;
    parent_node.appendChild(s);
})('userback-sdk');

var values = JSON.parse('{"login-uri":"https://b.slateapp.es/login", "logout-uri":"https://b.slateapp.es/logout"}')

function login(){
    document.location.href=values["login-uri"]
}

function logout(){
    document.location.href=values["logout-uri"]
}