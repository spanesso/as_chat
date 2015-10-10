
//****************************************************************  
//*********        VARIABLES GLOBALES                  ***********  
//**************************************************************** 
var myApp = new Framework7({
    template7Pages: true
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main');

//****************************************************************  
//*********        FUNCIONES GLOBALES                  ***********  
//**************************************************************** 






//*****************************************************************  
//*********                LOGIN                      ************ 
//***************************************************************** 

myApp.onPageInit('login-panel', function (page) {
    
    
    

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







 