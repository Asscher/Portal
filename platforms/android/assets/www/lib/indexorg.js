function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;

}
var newsStartIndex =0;
var newsItems=10;
var baseUrl = 'https://portal.abc-groep.be/abc-portal-services/';
function checkPreAuth() {
    var form = $("#loginForm");
    if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait
    //$("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    var deviceID = device.uuid;
    var encrypted = getEncription(u, p, deviceID);
    navigator.notification.activityStart("", "inloggen");

    if (u != '' && p != '') {
        $.ajax({
            url: baseUrl+ 'api/v1/authenticate',
            headers: { 'ABCPortalServicesCredentials': encrypted },


            success: function (res, status, xhr) {
                if(xhr.getResponseHeader('ABCPortalServicesToken') != null){
                    console.log("log response "+ res);
                    console.log("log status "+ status);
                    console.log("log token "+  xhr.getResponseHeader('ABCPortalServicesToken'));
                    navigator.notification.activityStop();
                    window.localStorage["username"] = u;        //store
                    window.localStorage["password"] = p;
                    window.localStorage["token"] =  xhr.getResponseHeader('ABCPortalServicesToken');


                    $.mobile.changePage("#newsPage");
                    getNews();

                }
                else{
                    //TODO not secure network show in notification
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                navigator.notification.activityStop();
                navigator.notification.alert("Your login failed " + textStatus + errorThrown, function () {
                });
            }

        });
    } else {
        navigator.notification.alert("You must enter a username and password", function () {});
        $("#submitButton").removeAttr("disabled");
    }

    return false;
}
function getEncription(username, password, deviceID) {
    var key = "!dzAe71nN?p7qIl1";
    var requestheader = username + ":" + password + ":" + deviceID;
    var encryptionKey = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.AES.encrypt(requestheader, encryptionKey, {  mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

    return encrypted.toString();
}
function getNews(){
    navigator.notification.activityStart("", "");
    $.ajax({
        url: baseUrl+ 'api/v1/news?startIndex='+ newsStartIndex +'&items='+newsItems,
        headers: { 'ABCPortalServicesToken': window.localStorage["token"] },
        crossDomain:true,
        success: function (newsItems) {
            navigator.notification.activityStop();

            for (var index in newsItems)
            {
                var title = "<h3>"+newsItems[index].title+"</h3><br>";
                var body = newsItems[index].body;
                $('#newsFeedContainer').append(title+body);

            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            navigator.notification.activityStop();

            navigator.notification.alert("Getting news feed fails " + textStatus + errorThrown, function () {
            });
        }
    });
}

$(".news").on("click", function () {

});
$(".birthday").on("click", function () {

});
$(".notification").on("click", function () {

});
$(".settings").on("click", function () {

});
function deviceReady() {
    console.log("deviceReady");
    $("#loginPage").on("pageinit", function () {
        console.log("pageinit run");
        $("#loginForm").on("submit", handleLogin);
        checkPreAuth();
    });
    navigator.notification.alert("changing page", function () { });
    $.mobile.changePage("#loginPage");
    navigator.notification.alert("page changed", function () { });
}