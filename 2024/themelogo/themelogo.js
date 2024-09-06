$(document).ready(function(){

    $(".download_list").hide();

    $(".download_btn").click(function(){
        if($(this).siblings(".download_list").css("display") == "none"){
            $(this).siblings(".download_list").show(100);
        }else{
            $(this).siblings(".download_list").hide(100);
        }
    })

});