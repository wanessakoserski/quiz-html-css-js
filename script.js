var scoreTotal = 0;
var question = 0;
var screenScore = document.querySelector("nav p span");
var buttonNext = document.querySelector("#next");
var buttonRestart = document.querySelector("#restart");
var inputScore = document.querySelector("#score");
var finalPage = document.getElementById("final-page");

//Condition when start the page
buttonNext.style.display = 'none';
buttonRestart.style.display = 'none';
inputScore.style.display = 'none';


function final()
{
	buttonNext.style.display = 'none';
	buttonRestart.style.display = 'none';
	inputScore.style.display = 'none';
}


function nextQuestion() 
{	
	let questionNow = document.getElementById("p" + question);
	questionNow.style.display = 'none';	
	
	question++;
	if (question > 10)
	{	
		buttonNext.style.display = 'none';
		finalPage.style.display = 'block';
		final();
	}
	else
	{
		const questionNext = document.getElementById("p" + question);
		questionNext.style.display = 'block';
		buttonNext.disabled = true;	
	}
}


function resetVariable()
{
	question = 1;
	scoreTotal = 0;
	screenScore.innerText = scoreTotal;
}


function buttonsInitialState()
{
	const allButtons = document.querySelectorAll(".quiz-answer button");
	
	for (let i = 0; i < allButtons.length; i++)
	{
		allButtons[i].style.backgroundColor = "white";
		allButtons[i].disabled = false;
	}
}


function restart()
{
	if (question <= 10)
	{
		let questionLast = document.getElementById("p" + question);
		questionLast.style.display = 'none';
	}
	
	resetVariable();	
	buttonsInitialState();
	
	//Return to the first question
	const questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	//let buttonNext = document.querySelector("#next");
	buttonNext.style.display = 'block';
	
	
}


function verify(event)
{
	//Select only current page buttons
	const buttons = document.querySelectorAll("#p" + question + " .quiz-answer button");
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].disabled = true;
		if (buttons[i].value == "true")
		{
				buttons[i].style.backgroundColor = "green";
		}	
	}
		
	if (event.target.value == "true")
	{
		scoreTotal += 20;
	}
	else 
	{
		
		event.target.style.backgroundColor = "red";
	}

	buttonNext.disabled = false;
	screenScore.innerText = scoreTotal;
}


function start()
{
	buttonNext.style.display = 'block';
	buttonRestart.style.display = 'block';
	inputScore.style.display = 'block';
	nextQuestion();
}


function returnHome()
{	
	resetVariable();
	buttonsInitialState();
	finalPage.style.display = 'none';
	document.getElementById("p0").style.display = 'block';
	
}

//Declare events in HTML elements
document.getElementById("start").addEventListener("click", start);

document.getElementById("return").addEventListener("click", returnHome);

buttonNext.addEventListener("click", nextQuestion);

buttonRestart.addEventListener("click", restart);

const answerButtons = document.querySelectorAll(".quiz-answer button");
for (let i = 0; i < answerButtons.length; i++)
{
	answerButtons[i].addEventListener("click", verify);
}

