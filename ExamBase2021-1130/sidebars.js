$( document ).ready(function() {
    console.log( "ready!" );

    // 侧边栏选择提示
    $("#sidebar-ul li a").hover(
      function(){
        $(this).removeClass("text-white");
        $(this).addClass("active");
      },
      function(){
        if(!$(this).hasClass("selected")){
          $(this).removeClass("active");
          $(this).addClass("text-white");
        }
      }
    );

    // 侧边栏选中提示
    $("#sidebar-ul li a").click(
      function(){
        if(!$(this).hasClass("selected")){
          $("#sidebar-ul li a").each(
            function(){
              if($(this).hasClass("selected")){
                $(this).removeClass("selected");
                $(this).removeClass("active");
                $(this).addClass("text-white");
              }
            }
          );
          $(this).addClass("selected");
        }
      }
    );

});