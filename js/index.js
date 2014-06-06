var facts;

var images = [
  "img/image0.jpg",
  "img/image1.jpg",
  "img/image2.jpg",
  "img/image3.jpg",
  "img/image4.jpg"
];

var count = 0; 
var imageIndex = 0;

Ext = {
  define:function(bla, bla2) {
    facts = bla2.data;
    
    $(window).ready(function() {
	  
	  $(".next").on('click', function() {
	    if (count<facts.length-1) {
		  count+=1;
		}
		else {
		  count=0;
		}
		generateText(count);
	  });

	  $(".prev").on('click', function() {
		if (count>0) {
		  count-=1;
		}
		else {
		  count=facts.length-1;
		}
		generateText(count);
	  });
	  
	  $(".random").on('click', function() {
		count = Math.floor(Math.random() * facts.length);
		generateText(count);
	  });

	  $(".select").on('click', function() {
		var number = prompt("Please choose a movie (1-413)");

		if (isNaN(number)) {
			alert("Must input numbers");
			return false;
		} else {
		  if (number<1 || number >413){
		    alert("Must input a number between 1 and 413");
			return false;
		  }
		  else {
		    count=number-1;
		    generateText(count);
		  }
		}
      });
      
	  $(".language").on('click', function() {
	  	var nrRo = 0;
		var nrEn = 0;
	    for (var i = 0; i < facts.length; i++) {
			if (facts[i].language == 'R') {
			  nrRo = nrRo + 1;
			} else {
			  nrEn = nrEn + 1;
			}
		}
		alert('Statistic by language:\n\nFacts in romanian language = ' + nrRo + '\nFacts in english language = ' + nrEn);
	  });
	  
	  $(".user").on('click', function() {
		var a = {};
		var mapLength = 0;
		var msg;
		
	    for (var i = 0; i < facts.length; i++) {	
			if (facts[i].author in a) {
				a[facts[i].author] = a[facts[i].author] + 1;
				
			} else {
				a[facts[i].author] = 1;
				mapLength++;
			}
		}
		var skip = 0;
		for (var key in a) {
			if(skip == 0) {
				msg = 'Statistic by Author\n\nThe author ' + key + ' has ' + a[key] + " facts\n";
			} else {
				msg = msg + 'The author ' + key + ' has ' + a[key] + " facts\n";
			}
			skip++;
		}
		alert(msg);
	  });
	  
	  $(".length").on('click', function() {
	  	var nrMax = facts[0].fact.length;
		var nrMin = facts[0].fact.length;
		var strMax = facts[0].fact;
		var strMin = facts[0].fact;
		
	    for (var i = 1; i < facts.length; i++) {
			if (facts[i].fact.length > nrMax ) {
			  nrMax = facts[i].fact.length;
			  strMax  = facts[i].fact;
			}
			if (facts[i].fact.length < nrMin ) {
			  nrMin = facts[i].fact.length;
			  strMin =  facts[i].fact;
			}
		}
		alert('Statistic by length:\n\nThe fact with the maximum length is: ' + nrMax + ' (' + strMax + 
			  ')\nThe fact with the minimum length is: ' + nrMin +  ' (' + strMin + ')');
	  });
	  
	  count = Math.floor(Math.random() * facts.length);
      generateText(count);
    });
  }
};

function generateText(count) {

  var titles = facts[count];
  var parts = disect(titles.fact);
  console.log("Hello", titles);

  $(".title").css("backgroundImage", 'url(' + images[imageIndex] + ')');
  if (imageIndex < 4) {
	imageIndex = imageIndex + 1;
  } else {
    imageIndex = 0;
  }
  $(".setup").text(parts.setup);
  $(".punch").text(parts.punch);
}

function disect(text) {
  text = text.trim();

  // Discard trailing "."
  if (text.lastIndexOf(".") == text.length -1) {
    text = text.slice(0, -1);
  }

  var lastDot = Math.max(text.lastIndexOf("."), text.lastIndexOf("?"));

  // Both . and ? are missing

  if (lastDot < 0) {
    lastDot = text.lastIndexOf(",");
  }
  
  if (lastDot < 0) {
    lastDot = text.lastIndexOf(" ");
  }

  return {setup:text.slice(0, lastDot + 1), punch:text.slice(lastDot + 1)};
};