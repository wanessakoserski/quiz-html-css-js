var scoreTotal = 0;
var question = 0;
var screenScore = document.querySelector("nav p span");
var buttonNext = document.querySelector("#next");
var buttonRestart = document.querySelector("#restart");
var returnButtons = document.getElementsByClassName("return");
var navReturnButton = document.getElementById("returnNav");
var inputScore = document.querySelector("#score");
var finalPage = document.getElementById("final-page");
var container = document.querySelectorAll(".quiz-container");

//Condition when start the page
buttonNext.style.display = 'none';
buttonRestart.style.display = 'none';
inputScore.style.display = 'none';
randomQuestion();


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
		navReturnButton.style.display = 'none';
		finalPage.style.display = 'flex';
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
	randomQuestion();
	
	
	//Return to the first question
	const questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	buttonNext.style.display = 'block';
	navReturnButton.style.display = 'block';
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
	navReturnButton.style.display = 'block';
	question = 0;
	nextQuestion();
}


function returnHome()
{	
	resetVariable();
	randomQuestion();
	buttonsInitialState();
	final();
	finalPage.style.display = 'none';
	document.getElementById("p0").style.display = 'flex';
	
	for (let i = 0; i < container.length; i++)
	{
		container[i].style.display = 'none';
	}
	
	navReturnButton.style.display = 'none';
}

var players;
var scores;

function addPerson()
{	
	players = JSON.parse(localStorage.getItem("players"));
	scores = JSON.parse(localStorage.getItem("scores"));
	
	if (players == null)
	{
		players = [];
		scores = [];
	}
	
	let newPlayer = document.getElementById("person").value;
	players.push(newPlayer);
	scores.push(scoreTotal);
	
	localStorage.setItem("username", JSON.stringify(players));
	localStorage.setItem("username", JSON.stringify(scores));	

	const table = document.querySelector("table");
	
	
	for (let i = 0; i < players.length; i++)
	{
		let playLine = document.createElement("td");
		let scoreLine = document.createElement("td");
		let line = document.createElement("tr");
		
		playLine.innerText = players[i];
		scoreLine.innerText = scores[i];
		
		line.appendChild(playLine);
		line.appendChild(scoreLine);
		
		table.appendChild(line);
	}
}


function randomQuestion()
{
	const numberOfQuestions = 10;	
	let randomNumbers = new Array();
	
	// reset id
	for (let i = 0; i < container.length; i++)
	{
		container[i].removeAttribute("id");
	}	
	
	// Make random container index without repetition
	do
	{
		let numRandom = Math.floor(Math.random() * container.length);
		let repetition = 0;
	
		for (let i = 0; i < randomNumbers.length; i++)
		{
			if (numRandom == randomNumbers[i])
			{
				repetition++;
			}
		}
		
		if (repetition == 0)
		{
			randomNumbers.push(numRandom);
		}
	}
	while (randomNumbers.length < container.length);
	
	// shuffle the questions positions
	for (let i = 0; i < numberOfQuestions; i++)
	{
		let questionIndex = i + 1;
		container[randomNumbers[i]].id = "p" + questionIndex;
	}
}

var played = 0;

function playAudios(event)
{
	played++;
	if (played > 2)
	{
		played = 1;
	}
	
	if (played == 2)
	{
		event.target.style = "pointer-events: none";
	}
}


//Declare events in HTML elements
document.getElementById("start").addEventListener("click", start);

document.getElementById("saveScore").addEventListener("click", addPerson);

buttonNext.addEventListener("click", nextQuestion);

buttonRestart.addEventListener("click", restart);

for (let i = 0; i < returnButtons.length; i++)
{
	returnButtons[i].addEventListener("click", returnHome);
}

const answerButtons = document.querySelectorAll(".quiz-answer button");
for (let i = 0; i < answerButtons.length; i++)
{
	answerButtons[i].addEventListener("click", verify);
}

const audios = document.querySelectorAll(".quiz-container audio");
for (let i = 0; i < audios.length; i++)
{
	audios[i].addEventListener("play", playAudios)
	
	
}