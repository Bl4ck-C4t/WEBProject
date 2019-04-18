$(document).ready(function() {

	

	/*function replaceAllMatches2(allMatches, text){ // Legacy
		var new_text = 	""
		var match = 0;
		for (var i = 0; i < text.length; i++) {
			var m = allMatches[match]
			if (i == m.index){

 
				new_text += `<span class="${m.class}">${m[0]}</span>`
				console.log(new_text, m)
				i += m[0].length-1 // maybe -1
				match += 1
				if(match == allMatches.length){
					new_text += text.substring(i+1)
					console.log(new_text, m)
					break;
				}
			}
			else{
				new_text += text[i]
			}	
			
		}
		return new_text
	}*/

	function* matchAll(reg, text){
		var array1;
		while ((array1 = reg.exec(text)) !== null) {
			  yield array1;
			}
	}

	function replaceAllMatches(allMatches, text){
		var new_text = 	""
		var match = 0;
		var last_pos = 0
		for (const m of allMatches) {
			new_text += text.substring(last_pos, m.index)
			new_text += `<span class="${m.class}">${m[0]}</span>`
			last_pos = m.index + m[0].length			
		}
		new_text += text.substring(last_pos)
		return new_text
	}
		


	function matchType(reg, text, class_type){
		var matches = []
		for (const array1 of matchAll(new RegExp(reg, 'g'), text)){
				// console.log(`Found ${array1[0]}. Next starts at ${array1.index}.`);
				array1.class = class_type;
				matches.push(array1)
		}
		return matches
	}

	function matchTypes(arr, class_t, connected=false){
		var allMatches = [];
		arr.forEach(function(el){ // color vars
			var reg = `\\b${el}\\b`
			if(connected){
				el = el.split('')
				.map((c) => "\\"+c)
				.join('')

				reg = `${el}`
			}

			allMatches = allMatches.concat(matchType(reg, text, `${class_t} ${class_t}-${el}`))
			
		})
		return allMatches;
	}

	function isIndexin(allMatches, index, pos){
		if(pos == 0){
			return true;
		}
		for (var i = 0; i < pos; i++) {
			var m = allMatches[i]
			// console.log(`Comparing index ${index} with ${m}`)
			if(index >= m.index && index < m.index+m[0].length){
				// console.log("Index is false")
				return false;
			}
		}
		// console.log("Index is true")
		return true;
	}

	var vars = ["char", "int", "bool", "string", "float"]
	var res_words = ["if", "else", "while", "for", "elseif", "return", "func", "in"]
	var def_functions = ["print", "input", "map", "filter", "push"]
	var operators = ["&&", "||",  "<=", ">=", "==", "!=", "--", "++", "+=", "-=", "/=", "*=",
	 "!", "+", "=", "-", "*", "/", "^", "%", "<", ">", "."]
	// var punctuation = ",;(){}[]".split('')
	var punctuation = "()[]".split('')

	var codes = $(".code-block")
	var text;
	var allMatches;
	codes.each(function() {
		allMatches = [];
		text = $(this).text();
			
			
		allMatches = allMatches.concat(matchTypes(punctuation, "punctuation", true))
		allMatches = allMatches.concat(matchTypes(vars, "var"))
		allMatches = allMatches.concat(matchTypes(res_words, "reserved"))
		// allMatches = allMatches.concat(matchTypes(def_functions, "function"))
		allMatches = allMatches.concat(matchType("\\b[a-zA-Z_][a-zA-Z_0-9]*(?= *\\()", text, "function"))
		
		allMatches = allMatches.concat(matchType("\\b(?:True|False)\\b", text, "boolean"))

		allMatches = allMatches.concat(matchType("\\b[a-zA-Z_][a-zA-Z_0-9]*", text, "symbol"))	
		allMatches = allMatches.concat(matchTypes(operators, "operator", true))
		allMatches = allMatches.concat(matchType("\\b-?\\d+(?:\\.\\d+)?", text, "number"))
		allMatches = allMatches.concat(matchType(`'\\w'`, text, "character"))
		allMatches = allMatches.concat(matchType(`".*?"`, text, "string"))

		allMatches = allMatches.sort((a,b) => a.index - b.index) // sort matches by index ascending
		allMatches = allMatches.filter((match, index) => isIndexin(allMatches, match.index, index)); // remove equal or overlapping elements


		console.log("Ordered:", allMatches)
		new_text = replaceAllMatches(allMatches, text) // apply all ordered matches
		$(this).html(new_text)
			
	});


});