var scoreTotal = 0;
var question = 0;
var screenScore = document.querySelector("nav p span");
var buttonNext = document.querySelector("#next");
var buttonRestart = document.querySelector("#restart");
var inputScore = document.querySelector("#score");

//Condition when start the page
buttonNext.style.display = 'none';
buttonRestart.style.display = 'none';
inputScore.style.display = 'none';

function start()
{
	buttonNext.style.display = 'block';
	buttonRestart.style.display = 'block';
	inputScore.style.display = 'block';
	nextQuestion();
}

function nextQuestion() 
{	
	let questionNow = document.getElementById("p" + question);
	questionNow.style.display = 'none';	
	
	question++;
	if (question > 10)
	{	
		buttonNext.style.display = 'none';
		//Inserir função para declarar o que acontece no final do quiz
	}
	else
	{
		const questionNext = document.getElementById("p" + question);
		questionNext.style.display = 'block';
		buttonNext.disabled = true;	
	}
}

function restart()
{
	if (question <= 10)
	{
		let questionLast = document.getElementById("p" + question);
		questionLast.style.display = 'none';
	}
	
	//Reset variables
	question = 1;
	scoreTotal = 0;
	screenScore.innerText = scoreTotal;
	
	//Return to the first question
	const questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	let buttonNext = document.querySelector("#next");
	buttonNext.style.display = 'block';
	
	//Return the buttons to the initial state
	const allButtons = document.querySelectorAll(".quiz-answer button");
	
	for (let i = 0; i < allButtons.length; i++)
	{
		allButtons[i].style.backgroundColor = "white";
		allButtons[i].disabled = false;
	}
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


//Declare events in HTML elements
document.getElementById("start").addEventListener("click", start);

buttonNext.addEventListener("click", nextQuestion);

buttonRestart.addEventListener("click", restart);

const answerButtons = document.querySelectorAll(".quiz-answer button");
for (let i = 0; i < answerButtons.length; i++)
{
	answerButtons[i].addEventListener("click", verify);
}

