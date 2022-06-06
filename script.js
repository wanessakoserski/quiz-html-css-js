var scoreTotal = 0;
var question = 0;
var rights = 0;
var wrongs = 0;
var screenScore = document.querySelector("nav p span");
var screenRight = document.querySelector("#right");
var screenWrong = document.querySelector("#wrong");
var finalScore = document.querySelector("#finalScore");
var buttonNext = document.querySelector("#next");
var buttonRestart = document.querySelector("#restart");
var returnButtons = document.getElementsByClassName("return");
var navReturnButton = document.getElementById("returnNav");
var inputScore = document.querySelector("#score");
var finalPage = document.getElementById("final-page");
var container = document.querySelectorAll(".quiz-container");
var table = document.querySelector("table");
var displayTable = document.querySelector("#displayTable");
var newPlayer = document.getElementById("person");
var saveScore = document.getElementById("saveScore");

//Condition when start the page
buttonNext.style.display = 'none';
buttonRestart.style.display = 'none';
inputScore.style.display = 'none';
randomQuestion();
makeTable();


function final()
{
	buttonNext.style.display = 'none';
	buttonRestart.style.display = 'none';
	inputScore.style.display = 'none';
	finalScore.innerText = scoreTotal;
	screenRight.innerText = rights;
	screenWrong.innerText = wrongs;
}

function pauseAudioVideo(audio = document.querySelectorAll('audio'), video = document.querySelectorAll('video'))
{
	if (audio.length > 0)
	{
		for (let i = 0; i < audio.length; i++)
		{
			audio[i].pause();
		}
	}

	if (video.length > 0)
	{
		for (let i = 0; i < video.length; i++)
		{
			video[i].pause();
		}
	}

}

function nextQuestion() 
{	

	let questionNow = document.getElementById("p" + question);
	/*
	let audio = questionNow.getElementsByTagName('audio');
	let video = questionNow.getElementsByTagName('video');
	*/
	pauseAudioVideo();

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

	played = 0;
}


function resetVariable(eachQuestion = 1)
{
	question = eachQuestion;
	scoreTotal = 0;
	rights = 0;
	wrongs = 0;
	played = 0;
	screenScore.innerText = scoreTotal;
	screenRight.innertText = rights;
	screenWrong.innerText = wrongs;
}


function buttonsInitialState()
{
	const allButtons = document.querySelectorAll(".quiz-answer button");
	
	for (let i = 0; i < allButtons.length; i++)
	{
		allButtons[i].style.backgroundColor = "#EFEFEF";
		allButtons[i].style.borderColor = "white";
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
	pauseAudioVideo();
	
	
	//Return to the first question
	const questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	buttonNext.style.display = 'block';
	navReturnButton.style.display = 'block';
}


function verify(event)
{
	pauseAudioVideo();
	//Select only current page buttons
	const buttons = document.querySelectorAll("#p" + question + " .quiz-answer button");
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].disabled = true;
		if (buttons[i].value == "true")
		{
			buttons[i].style.backgroundColor = "#78c178";
			buttons[i].style.borderColor = "green";
		}	
	}
		
	if (event.target.value == "true")
	{
		scoreTotal += 25;
		rights++;
		/*
		const audioCorrect = document.querySelector("#correctSound");
		audioCorrect.play();
		*/
	}
	else 
	{		
		event.target.style.backgroundColor = "#e55d5d";
		event.target.style.borderColor = "red";
		wrongs++;
		/*
		const audioWrong = document.querySelector("#wrongSound");
		audioWrong.play();
		*/
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
	displayTable.style.display = 'none';
	newPlayer.disabled = false;
	newPlayer.value = '';
	newPlayer.placeholder = "Insira seu nome";
	
	nextQuestion(0);

	alert("Os áudios deste Quiz podem ser clicados apenas 2x");
}


function returnHome()
{	
	resetVariable(0);
	randomQuestion();
	buttonsInitialState();
	final();
	finalPage.style.display = 'none';
	displayTable.style.display = 'none';
	confettiCanvas.classList.remove('active');
	document.getElementById("p0").style.display = 'flex';
	
	for (let i = 0; i < container.length; i++)
	{
		container[i].style.display = 'none';
	}
	
	navReturnButton.style.display = 'none';

	pauseAudioVideo();
}


var players;
var scores;

function takeLocalStorage()
{
	players = JSON.parse(localStorage.getItem("players"));
	scores = JSON.parse(localStorage.getItem("scores"));

	// Verify if there is an array
	if (players == null)
	{
		players = [];
		scores = [];
	}
}

function sendLocalStorage()
{
		// Send array to local storage
		localStorage.setItem("players", JSON.stringify(players));
		localStorage.setItem("scores", JSON.stringify(scores));	
}


function makeTable() 
{
	takeLocalStorage();

	let highPlayer = new Array();
	let highScore = new Array();

	for (let i = 0; i < 10; i ++)
	{
		let recordScore = 0;
		let recordPlayer = '';
		for (let i = 0; i < scores.length; i++)
		{		
			if (scores[i] >= recordScore)
			{
				if(!(highPlayer.includes(players[i])))
				{
					recordScore = scores[i];
					recordPlayer = players[i];
				}
			}
		}
		highScore.push(recordScore);
		highPlayer.push(recordPlayer);
	}

	let lines = '';

	let headerPlayer = document.createElement("th");
	let headerScore = document.createElement("th");
	let firstLine = document.createElement("tr");

	headerPlayer.innerText = "Jogador";
	headerScore.innerText = "Score";

	firstLine.appendChild(headerPlayer);
	firstLine.appendChild(headerScore);

	lines += firstLine.outerHTML;
	
	// append all array in a html table
	for (let i = 0; i < highPlayer.length; i++)
	{	
		if (highPlayer[i] != '')
		{
			let playLine = document.createElement("td");
			let scoreLine = document.createElement("td");
			let line = document.createElement("tr");
			
			playLine.innerText = highPlayer[i];
			scoreLine.innerText = highScore[i];
			
			line.appendChild(playLine);
			line.appendChild(scoreLine);
			
			lines += line.outerHTML;
		}
	}
	
	table.innerHTML = lines;
}

let confettiCanvas = document.querySelector('#my-canvas');
var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

function confettiEffect()
{
	confettiCanvas.classList.add('active');
}


function enableButton(event)
{
	if (event.keyCode == '13' && event.target.value != '')
	{
		addPerson();
	}
	if (event.target.value != '')
	{
		saveScore.disabled = false;
	}
}


function addPerson(event)
{		
	// Add username and score
	players.push(newPlayer.value);
	scores.push(scoreTotal);

	sendLocalStorage();
	
	makeTable();
	displayTable.style.display = 'block';
	saveScore.disabled = true;
	newPlayer.value = '';
	newPlayer.placeholder = "Obrigada por jogar! <3";
	newPlayer.disabled = true;

	const audioWoaw = document.querySelector("#woawSound");
	audioWoaw.play();

	confettiEffect();
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

var showOrNot = true;

function showScore()
{
	if (showScore)
	{
		displayTable.style.display = 'block';
		showScore = false;
	}
	else
	{
		displayTable.style.display = 'none';
		showScore = true;
	}
}

function buttonEffect()
{
	const audioButton = document.querySelector("#buttonSound");
	audioButton.play();
}


//Declare events in HTML elements
document.getElementById("start").addEventListener("click", start);

document.getElementById("melhoresScores").addEventListener("click", showScore)

buttonNext.addEventListener("click", nextQuestion);

buttonRestart.addEventListener("click", restart);

newPlayer.addEventListener("keyup", enableButton);

saveScore.addEventListener("click", addPerson);

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

/*
const anyButton = document.querySelectorAll("button");
for (let i = 0; i < anyButton.length; i++)
{
	anyButton[i].addEventListener("click", buttonEffect);
}
*/