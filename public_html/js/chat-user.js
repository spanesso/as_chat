
function luckypiger(mail, pass) {
    this._id = "";
    this._turnos = "";
    this._win = false;
    this._win_user_ofert = "";
    this.nombres = "";
    this.apellidos = "";
    this.tipo_documento = "";
    this.documento = "";
    this.email = mail;
    this.password = pass;
    this.telefono = "";
    this.celular = "";
    this.sexo = "";
    this.fecha_nacimiento = "";
}
luckypiger.prototype.restar_data_session = function () {
    var loginData = {
        tipo: 1,
        mail: this.email,
        pass: this.password,
        today: today
    };
    $.ajax({
        url: SERVICE_URL + "usuario/loginUser",
        type: "POST",
        data: loginData,
        success: function (data) {

            var jsonParse = JSON.parse(data);

            console.log("data---->" + data);

            localStorage.setItem('session', data);

            sesionStorageParse = JSON.parse(localStorage.getItem('session'));

            $("#userTurnsLbl").html(sesionStorageParse.turnoUsuario);
            ID_USER = sesionStorageParse.idUsuario;
            TURNOS = sesionStorageParse.turnoUsuario;


            var publicidad = sesionStorageParse.publicidad;
            var publicidadArray = publicidad.split(";");

            IMG_PUBLICIDAD = DATA_PUBLICITY_IMAGE_CONTAINER + publicidadArray[0] + ".jpg";


            $("#publicityPanel").css("background-image", "url(" + IMG_PUBLICIDAD + ")");
            $("#publicityPanel").css("background-repeat", "no-repeat");
            $("#publicityPanel").css("background-size", "contain");




            lpUser = new luckyPigUser();

            lpUser.getZonesNCategories();


            $(".zoneSelectItem").change(function () {
                ID_ZONE = "'" + $(".zoneSelectItem option:selected").attr("data-id") + "'";

            });

            $(".linkCategoryItem").click(function () {

                var category = $(this).attr("data-id");
                $(".linkCategoryItem").each(function () {
                    if ($(this).attr("data-id") == category) {
                        $(this).find("span").css("font-weight", "bold");
                    } else {
                        $(this).find("span").css("font-weight", "normal");
                    }

                });

                if (category != "*") {
                    ID_CATEGORY = "'" + category + "'";
                    var bkground = "url(" + CATEGOYR_BACKGROUND_IMAGE_CONTAINER + category + ".png) ";
                    $("body").css("background-image", bkground);
                    $(".main-content").css("background-image", bkground);
                }
            });
        },
        error: function () {
            showModalOffLine();
        }
    });

};

luckypiger.prototype.validate_email = function () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
};

luckypiger.prototype.validate_password = function () {
    if (this.password.length >= 5)
        return true;
    else
        return false;
};