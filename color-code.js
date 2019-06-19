var matcher = { text: "", allMatches: [],

	matchAll: function*(reg){
		var text = matcher.text;
		var array1;
		while ((array1 = reg.exec(text)) !== null) {
			  yield array1;
			}
	},

	replaceAllMatches(){
		var allMatches = matcher.allMatches;
		var new_text = 	""
		var text = matcher.text
		var last_pos = 0
		for (const m of allMatches) {
			new_text += text.substring(last_pos, m.index)
			new_text += `<span class="${m.class}">${m[0]}</span>`
			last_pos = m.index + m[0].length			
		}
		new_text += text.substring(last_pos)
		return new_text
	},
		
	matchType(reg, class_type){
		var text = matcher.text;
		for (const array1 of matcher.matchAll(new RegExp(reg, 'g'), text)){
				// console.log(`Found ${array1[0]}. Next starts at ${array1.index}.`);
				array1.class = class_type;
				matcher.allMatches.push(array1)
		}
		
	},

	matchTypes(arr, class_t, connected=false){
		var allMatches = [];
		var text = matcher.text;
		arr.forEach(function(el){ // color vars
			var reg = `\\b${el}\\b`
			if(connected){
				el = el.split('')
				.map((c) => "\\"+c)
				.join('')

				reg = `${el}`
			}
			matcher.matchType(reg, `${class_t} ${class_t}-${el}`)
			
		})

	},

	isIndexin(index, pos){
		var allMatches = matcher.allMatches;
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
	},

	prepareMatches() {
		matcher.allMatches = matcher.allMatches.sort((a,b) => a.index - b.index) // sort matches by index ascending
		matcher.allMatches = matcher.allMatches.filter((match, index) => matcher.isIndexin(match.index, index)); // remove equal or overlapping elements
	}

}

var vars = ["char", "int", "bool", "string", "float", "arr", "any"]
// var def_classes = ["List"]
var res_words = ["if", "else", "while", "for", "elseif", "return", "func", "in"]
var def_functions = ["print", "input", "map", "filter", "push"]
var operators = ["&&", "||", "->", "<=", ">=", "==", "!=", "--", "++", "+=", "-=", "/=", "*=",
 "!", "+", "=", "-", "*", "/", "^", "%", "<", ">", "."]
// var punctuation = ",;(){}[]".split('')
var punctuation = "()[]".split('')

$(document).ready(function() {
	var codes = $(".code-block")
	var text;
	// var allMatches;
	codes.each(function() {
		matcher.allMatches = [];
		matcher.text = $(this).text();

		matcher.matchTypes(vars, "var");
		matcher.matchTypes(punctuation, "punctuation", true)
		matcher.matchTypes(res_words, "reserved")
		matcher.matchTypes(def_functions, "def-function")
		// matcher.matchTypes(def_classes, "def-class")

		matcher.matchType("\\b[a-zA-Z_][a-zA-Z_0-9]*(?= *\\()", "function")
		matcher.matchType("\\b(?:True|False)\\b", "boolean")
		matcher.matchType("\\b[a-zA-Z_][a-zA-Z_0-9]*", "symbol")	
		// matcher.matchType("\\b<(?=[a-zA-Z_][a-zA-Z_0-9]*>)", "generic")	
		// matcher.matchType("(?<=[a-zA-Z_][a-zA-Z_0-9]*>)>", "generic")	
		matcher.matchType("(\\/\\*(.*\\n)*?.*\\*\\/)|\\/\\/.*\\n*\\s*", "comment")
		matcher.matchTypes(operators, "operator", true)
		matcher.matchType("\\b-?\\d+(?:\\.\\d+)?", "number")
		matcher.matchType(`'\\w'`, "character")
		matcher.matchType(`".*?"`, "string")

		matcher.prepareMatches(); // sorts and filters matches

		console.log("Ordered:", matcher.allMatches)
		new_text = matcher.replaceAllMatches() // apply all ordered matches
		$(this).html(new_text)
			
	});
});