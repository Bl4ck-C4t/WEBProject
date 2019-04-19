function resizer(){
	if ($("html").width() <= 576){
           $(".bar-heading-holder").css("background", "none");
			$("#NavBar").removeClass("navbar-left").addClass("fixed-top navbar")
			$("#navbarCollapse").removeClass("navbar-nav").addClass("navbar-collapse collapse")
    }
    else if($("#NavBar").hasClass("fixed-top")){
    	$(".bar-heading-holder").css("background", "#2980b9");
			$("#NavBar").removeClass("fixed-top navbar").addClass("navbar-left")
			$("#navbarCollapse").removeClass("navbar-collapse collapse").addClass("navbar-nav")
    }
}

$(document).ready(resizer); 
$(window).resize(resizer);