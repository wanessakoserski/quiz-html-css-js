var scoreTotal = 0;
var question = 1;
var screenScore = document.querySelector("nav p span");
var buttonNext = document.querySelector("#next");

//Condition when start the page
buttonNext.disabled = true;

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

function verify()
{
	if 
	//Select only current page buttons
	const buttons = document.querySelectorAll("#p" + question + " .quiz-answer button");
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].disabled = true;
		if (buttons[i].value == "true")
		{
			buttons[i].style.backgroundColor = "green";
			scoreTotal += 20;
		}
		else
		{
			buttons[i].style.backgroundColor = "red";
		}		
	}
	
	buttonNext.disabled = false;
	screenScore.innerText = scoreTotal;
}


//Declare events in HTML elements
buttonNext.addEventListener("click", nextQuestion);

document.querySelector("#restart").addEventListener("click", restart);

const answerButtons = document.querySelectorAll(".quiz-answer button");
for (let i = 0; i < answerButtons.length; i++)
{
	answerButtons[i].addEventListener("click", verify);
}

