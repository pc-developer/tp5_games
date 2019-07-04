  /* gpa javascript Document */
  
  $(document).ready(function(){
      //鼠标略过改变表一行的颜色
      $('.info_tab tr:gt(0)').mouseover(function(){
          $(this).find('td').addClass('info_color');
      });
      $('.info_tab tr').mouseout(function(){
          $(this).find('td').removeClass('info_color');
      });
      
  });
  
