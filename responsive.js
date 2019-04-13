$(document).ready(function(){
	
	       if ($("#main").width() <= 700 ){

	            var left_content = $("#navbarCollapse").children()
				var top_bar = $("#navbarCollapseL")
				top_bar.append(left_content.clone());
	       }

	       $("#navDrop").click(function() {
	       			var head_div = $(".bar-heading-holder");
					if(!head_div.hasClass("bar-heading")){
						head_div.addClass("bar-heading")
					}
					else{
						head_div.removeClass("bar-heading")
					}
					
		   });


}); 