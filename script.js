let scoreTotal = 0;
var question = 1;

function nextQuestion(scoreValue) {
	scoreTotal += scoreValue;
	
	let questionNow = document.getElementById("p" + question);
	questionNow.style.display = 'none';
	
	question++;
	if (question > 10)
	{
		let buttonNext = document.querySelector("#next");
		buttonNext.style.display = 'none';
	}
	else
	{
		let questionNext = document.getElementById("p" + question);
		questionNext.style.display = 'block';
	}	
}

function restart(){
/*
	console.log("oiiii");
	let questionNow = document.getElementById("p" + question);
	questionNow.style.display = 'none';
	question = 1;
	let questionNext = document.getElementById("p" + question);
	questionNext.style.display = 'block';
	scoreTotal = 0;
	nextQuestion();
*/
}

document.querySelector("#next").addEventListener("click", nextQuestion);
//document.querySelector("#restart").addEventListener("click", restart);
