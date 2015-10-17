
//****************************************************************  
//*********        VARIABLES GLOBALES                  ***********  
//**************************************************************** 
var myApp = new Framework7({
    template7Pages: true
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main');
var obj_firebase;
var chat_user;
//****************************************************************  
//*********        FUNCIONES GLOBALES                  ***********  
//**************************************************************** 

function get_plantilla(autor, name, img, mensaje, fecha) {
    var html = "";
    if (autor == chat_user.id) {

        html = "<div class='message message-sent message-with-avatar message-first'>" +
                "<div class='message-text'>" +
                mensaje +
                "<div class='message-date'>" + fecha + "</div>" +
                "</div>" +
                "<div style='background-image:url(" + img + ")' class='message-avatar'></div>" +
                "</div>";
    } else {
        html = "<div class='message message-received message-with-avatar'>" +
                "<div class='message-name'>" + name + "</div>" +
                "<div class='message-text'>" + mensaje +
                "<div class='message-date'>" + fecha + "</div>" +
                "</div>" +
                "<div style='background-image:url(" + img + ")' class='message-avatar'></div>" +
                "</div>";
    }

    return html;
}





//*****************************************************************  
//*********                LOGIN                      ************ 
//***************************************************************** 

myApp.onPageInit('login-panel', function (page) {


    $("#fb_login").click(function () {

        obj_firebase.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {


                var user_id = authData.facebook.id;
                var user_name = authData.facebook.displayName;
                var user_image = authData.facebook.profileImageURL;

                chat_user = new chatuser(user_id, user_name, user_image);

                mainView.router.loadPage('message-panel.html');

            }
        });
    });
    $("#tw_login").click(function () {

        obj_firebase.authWithOAuthPopup("twitter", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {

                var user_id = authData.twitter.id;
                var user_name = authData.twitter.username;
                var user_image = authData.twitter.profileImageURL;

                chat_user = new chatuser(user_id, user_name, user_image);


                mainView.router.loadPage('message-panel.html');

            }
        });
    });

});

//*****************************************************************  
//*********                MESSAGE -PANEL              ************ 
//***************************************************************** 

myApp.onPageInit('message-panel', function (page) {



    obj_firebase.on("child_added", function (data) {
        var registro = data.val();
        var plantilla = get_plantilla(registro.autor, registro.name, registro.img, registro.mensaje, registro.fecha);
        $(".messages").append(plantilla);



        $('.messages-auto-layout').scrollTop($('.messages-auto-layout')[0].scrollHeight);
    });

    $(".send-message").click(function () {
        var txt_nombre = "sebastian";
        var txt_msg = $("#message_text").val();

        var d = new Date();

        var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        obj_firebase.push({
            autor: chat_user.id,
            name: chat_user.name,
            img: chat_user.img,
            fecha: hour,
            mensaje: txt_msg
        });

        $("#message_text").val('');
        $('.messages-auto-layout').scrollTop($('.messages-auto-layout')[0].scrollHeight);
    });


});
//*****************************************************************  
//*********                SPLASH                      ************ 
//***************************************************************** 

var ASCHAT_PAGE_SPLASH = myApp.onPageInit('splash', function (page) {
    obj_firebase = new Firebase("https://chatusbas.firebaseio.com/");
    setTimeout(function () {
        var storedData = myApp.formGetData('chat_user_session');
        if (storedData !== undefined) {

            mainView.router.load({url: 'main-panel.html'});
        }
        else {
            mainView.router.load({url: 'login-panel.html'});
        }
    }, 2000);
});
ASCHAT_PAGE_SPLASH.trigger();







 