$(document).ready(function(){

	       if ($("html").width() <= 700 ){
	       		$("#navDrop").show()
				$("#NavBar").removeClass("navbar-left").addClass("fixed-top navbar")
				$("#navbarCollapse").removeClass("navbar-nav").addClass("navbar-collapse collapse")
	       }
	       else{
	       	$("#navDrop").hide()
	    
	       	// if($('#navbar').hasClass("fixed-top")){
	       	// 	$('#navbar').removeClass("fixed-top")
		       // 	$('#navbar').removeClass("navbar")
		       // 	$('#navbar').addClass("navbar-left")
		       
	       	// }

	       }

	       

	      

}); 