/* index javascript Document */

window.onload = function(){

    document.getElementsByClassName('in')[0].focus();  //鼠标定位在class为in的第一个输入框
    
    
    var verifyImg = $('.captcha');
    var verifyPath = verifyImg.attr('src');
    
    //点击刷新验证码
    verifyImg.click(function(){
        if(verifyPath.indexOf('?') > 0){
            $(this).attr('src', verifyPath + '&random=' + Math.random());
        }else{
            $(this).attr('src', verifyPath.replace(/\?.*$/, '') + '?' + Math.random());
        }
    });
}
