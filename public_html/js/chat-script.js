
//****************************************************************  
//*********        VARIABLES GLOBALES                  ***********  
//**************************************************************** 
var myApp = new Framework7({
    template7Pages: true
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main');
var obj_firebase;
//****************************************************************  
//*********        FUNCIONES GLOBALES                  ***********  
//**************************************************************** 

function get_plantilla(autor, mensaje, fecha, is_local) {
    var html = "<div class='message message-received message-with-avatar'>" +
            "<div class='message-name'>" + autor + "</div>" +
            "<div class='message-text'>" + mensaje +
            "<div class='message-date'>" + fecha + "</div>" +
            "</div>" +
            "<div style='background-image:url(http://lorempixel.com/output/people-q-c-200-200-7.jpg)' class='message-avatar'></div>" +
            "</div>";

    return html;
}



//*****************************************************************  
//*********                LOGIN                      ************ 
//***************************************************************** 

myApp.onPageInit('login-panel', function (page) {




});

//*****************************************************************  
//*********                MESSAGE -PANEL              ************ 
//***************************************************************** 

myApp.onPageInit('message-panel', function (page) {

    obj_firebase = new Firebase("https://chatusbas.firebaseio.com/");

    obj_firebase.on("child_added", function (data) {
        var registro = data.val();
        var plantilla = get_plantilla(registro.autor, registro.mensaje, false);
        var plantilla;
        if (registro.autor !== "sebastian")
            plantilla = get_plantilla(registro.autor, registro.mensaje, registro.fecha, false);
        else
            plantilla = get_plantilla(registro.autor, registro.mensaje, registro.fecha, true);
        $(".messages").append(plantilla);
    });

    $(".send-message").click(function () {
        var txt_nombre = "sebastian";
        var txt_msg = $("#message_text").val();

        obj_firebase.push({
            autor: txt_nombre,
            fecha: "03-10-2015",
            mensaje: txt_msg
        });

        $("#message_text").val('');
    });


});
//*****************************************************************  
//*********                SPLASH                      ************ 
//***************************************************************** 

var ASCHAT_PAGE_SPLASH = myApp.onPageInit('splash', function (page) {
    //myApp.formDeleteData('session');
    setTimeout(function () {
        var storedData = myApp.formGetData('chat_user_session');
        if (storedData !== undefined) {

            obj_firebase = new Firebase("https://chatusbas.firebaseio.com/");


            mainView.router.load({url: 'main-panel.html'});
        }
        else {
            mainView.router.load({url: 'login-panel.html'});
        }
    }, 2000);
});
ASCHAT_PAGE_SPLASH.trigger();







 