$(document).ready(function(){
	
	       if ($("#main").width() <= 700 ){

	            var left_content = $("#navbarCollapse").children()
				var top_bar = $("#navbarCollapseL")
				top_bar.append(left_content.clone());


	       }

	       $("#navDrop").click(function() {
					if(!$(".bar-heading-holder").hasClass("bar-heading")){
						$(".bar-heading-holder").addClass("bar-heading")
					}
					else{
						$(".bar-heading-holder").removeClass("bar-heading")
					}
					
		   });


}); 