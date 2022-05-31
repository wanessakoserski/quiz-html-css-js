var scoreTotal = 0;
var question = 1;
var screenScore = document.querySelector("nav p span");

function nextQuestion() 
{	
	let questionNow = document.getElementById("p" + question);
	questionNow.style.display = 'none';
	
	question++;
	if (question > 10)
	{
		const buttonNext = document.querySelector("#next");
		buttonNext.style.display = 'none';
	}
	else
	{
		const questionNext = document.getElementById("p" + question);
		questionNext.style.display = 'block';
	}
}

function restart()
{
	if (question <= 10)
	{
		let questionLast = document.getElementById("p" + question);
		questionLast.style.display = 'none';
	}
<<<<<<< HEAD
	//alert(scoreTotal);
=======
>>>>>>> 9faac0f67becb0593ef95ca4b6ae96446b2e0cbc
	question = 1;
	scoreTotal = 0;
	screenScore.innerText = scoreTotal;
	
	let questionFirst = document.getElementById("p1");
	questionFirst.style.display = 'block';
	let buttonNext = document.querySelector("#next");
	buttonNext.style.display = 'block';
	
	const allButtons = document.querySelectorAll(".quiz-answer button");
	
	for (let i = 0; i < allButtons.length; i++)
	{
		allButtons[i].style.backgroundColor = "white";
		allButtons[i].disabled = false;
	}
}

function verify()
{
	buttons = document.querySelectorAll("#p" + question + " .quiz-answer button");
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
	
	screenScore.innerText = scoreTotal;
}


document.querySelector("#next").addEventListener("click", nextQuestion);

document.querySelector("#restart").addEventListener("click", restart);

const answerButtons = document.querySelectorAll(".quiz-answer button");
for (let i = 0; i < answerButtons.length; i++)
{
	answerButtons[i].addEventListener("click", verify);
}

