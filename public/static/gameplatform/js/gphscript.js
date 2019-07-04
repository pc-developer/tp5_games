/* -- gphscript javascript Document -- */

$(document).ready(function(){
    //鼠标略过头像显示
    $('.player_lr').hover(function(){
        $('.player_logout').css('display', 'block');
    }, function(){
        $('.player_logout').css('display', 'none');
    });
    
    //滑出滑入动画按钮
    $('.change_ico_btn:eq(0)').click(function(){
        $('.ico_angle').toggleClass('fa-angle-right fa-angle-down');
        $('.change_ico').slideToggle(500, function(){
            return;
        });
    });
    
    $('.upload_ico').hover(function(){
        $('.upload_tip').css('display', 'block');
    }, function(){
        $('.upload_tip').css('display', 'none');
    });
    
    $('.change_username_btn:eq(0)').click(function(){
        $('.username_angle').toggleClass('fa-angle-right fa-angle-down');
        $('.change_username').slideToggle(500, function(){
            return;
        });
    });
    
    $('.change_password_btn:eq(0)').click(function(){
        $('.password_angle').toggleClass('fa-angle-right fa-angle-down');
        $('.change_passwd').slideToggle(500, function(){
            return;
        });
    });
    
    $('.change_email_btn:eq(0)').click(function(){
        $('.email_angle').toggleClass('fa-angle-right fa-angle-down');
        $('.change_email').slideToggle(500, function(){
            return;
        });
    });
    
});


function change_check(){
    var str = '我是hsi人';
    console.log(str.length);
    return false;
}

