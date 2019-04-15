$(document).ready(function() {

	       if ($("html").width() <= 576){
               $(".bar-heading-holder").css("background", "none");
				$("#NavBar").removeClass("navbar-left").addClass("fixed-top navbar")
				$("#navbarCollapse").removeClass("navbar-nav").addClass("navbar-collapse collapse")
	       }
}); 