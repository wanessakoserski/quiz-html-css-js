let scoreTotal = 0;
let question = 1;
let scoreValue = 1;

function nextQuestion() {
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
	if (question <= 10)
	{
		let questionLast = document.getElementById("p" + question);
		questionLast.style.display = 'none';
	}
	alert(scoreTotal);
	question = 1;
	scoreTotal = 0;
	
	let questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	let buttonNext = document.querySelector("#next");
	buttonNext.style.display = 'block';

}


document.querySelector("#next").addEventListener("click", nextQuestion);
document.querySelector("#restart").addEventListener("click", restart);
