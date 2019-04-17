$(document).ready(function() {
	function* matchAll(reg, text){
		var array1;
		while ((array1 = reg.exec(text)) !== null) {
			  yield array1;
			}
	}
	var codes = $(".code-block")
	var vars = ["char", "int", "bool", "string", "float"]
	// let coloring_dict = {"css-vars": vars, "css-strings": string}
	var mod_text;
	var text;
	var array1;
	var allMatches = [];
	var regex1;
	codes.each(function( index ) {
		text = $(this).text();
		vars.forEach(function(el){ // color vars
			// text = text.replace(new RegExp(`\\b${el}`, 'g'), `<span class="var var-${el}">$&</span>`)
		
			for (const array1 of matchAll(new RegExp(`\\b${el}`, 'g'), text)){
				console.log(`Found ${array1[0]}. Next starts at ${array1.index}.`);
				array1.class = `var var-${el}`;
				allMatches.push(array1)
			}
		})
		
		for (const array1 of matchAll(new RegExp(`\".*?\"`, 'g'), text)){
			console.log(`Found ${array1[0]}. Next starts at ${array1.index}.`);
			array1.class = "string";
			allMatches.push(array1)
		}
		// console.log(allMatches)

		allMatches = allMatches.sort((a,b) => a.index - b.index)


		console.log("Ordered:")
		console.log(allMatches)
		var new_text = 	text.substring(0, allMatches[0].index)
		allMatches.forEach((m) => {
		    new_text += text.substring(m.index).replace(m[0], `<span class="${m.class}">${m[0]}</span>`)
		})


		// text = text.replace(new RegExp(`\".*?\"`, 'g'), `<span class="string">$&</span>`)
		$(this).html(text)
			
	});


});