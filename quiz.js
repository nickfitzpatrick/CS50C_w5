// data array holding all the artictecure questions
// Questions and answers generated with the help of ChatGPT
const data = [
  {
    "number": 1,
    "question": "Who designed the Walt Disney Concert Hall?",
    "points": 10,
    "answers": ["Zaha Hadid", "Frank Gehry", "Frank Lloyd Wright", "Antoni Gaudí"],
    "correct": 1
  },
  {
    "number": 2,
    "question": "What is the tallest building in the world as of 2023?",
    "points": 10,
    "answers": ["Shanghai Tower", "Burj Khalifa", "Taipei 101", "One World Trade Center"],
    "correct": 1
  },
  {
    "number": 3,
    "question": "Which architect is known for the Guggenheim Museum in New York?",
    "points": 10,
    "answers": ["Frank Lloyd Wright", "Le Corbusier", "Ludwig Mies van der Rohe", "Richard Meier"],
    "correct": 0
  },
  {
    "number": 4,
    "question": "Which city is home to the iconic Sagrada Família?",
    "points": 10,
    "answers": ["Madrid", "Barcelona", "Rome", "Paris"],
    "correct": 1
  },
  {
    "number": 5,
    "question": "What is the architectural style of the Sydney Opera House?",
    "points": 10,
    "answers": ["Brutalism", "Postmodernism", "Expressionism", "Neo-Gothic"],
    "correct": 2
  },
  {
    "number": 6,
    "question": "Which architect is known for the 'Fallingwater' house?",
    "points": 10,
    "answers": ["Frank Lloyd Wright", "Louis Sullivan", "Renzo Piano", "Norman Foster"],
    "correct": 0
  },
  {
    "number": 7,
    "question": "Which famous architect was a pioneer of Modernist architecture and designed the Villa Savoye?",
    "points": 10,
    "answers": ["Walter Gropius", "Le Corbusier", "Ludwig Mies van der Rohe", "Alvar Aalto"],
    "correct": 1
  },
  {
    "number": 8,
    "question": "What material was primarily used in the construction of the Eiffel Tower?",
    "points": 10,
    "answers": ["Steel", "Iron", "Copper", "Concrete"],
    "correct": 1
  },
  {
    "number": 9,
    "question": "Which architect designed the glass pyramid at the Louvre in Paris?",
    "points": 10,
    "answers": ["I. M. Pei", "Rem Koolhaas", "Norman Foster", "Jean Nouvel"],
    "correct": 0
  },
  {
    "number": 10,
    "question": "Which of the following is considered an example of Gothic architecture?",
    "points": 10,
    "answers": ["The Colosseum", "The Parthenon", "Notre-Dame Cathedral", "The Pantheon"],
    "correct": 2
  }
]

// setup turn and point counters
var turn = 0;
var points = 0;

// // show first question after the page has fully loaded
showQuestion();

// function that can show the current question and its possible answers
function showQuestion() {
  // set the counter 
  $('#counter').text( turn + 1 );

  // set the points
  $('#points').text( points );

  // show question 
  $('#question').text( data[turn].question );

  // render buttons for answers 
  $('#answers').empty();

  for ( let index = 0; index < data[turn].answers.length; index++) {
    // create button and set text to answer text
    var button = $("<button>");
    button.text( data[turn].answers[index] );

    // append button element into html document model
    $('#answers').append( button );

    // event handler
    button.click(
      function() {
        checkAnswer(index);
      }
    );
  }
}

function checkAnswer(choice) {
    // handles how the user answers 
    // decide which answer is correct
    if ( choice == data[turn].correct ) {
      rightAnswer();
    } else {
      wrongAnswer()
    }
}

// show another if one is available
function nextQuestion() {
  turn++;
  if ( turn < data.length ) {
    showQuestion();
  } else {
    gameEnding()
  }
}

// Function that handles the message for the quiz's ending
function gameEnding() {
  $('#question').empty();
  $('#answers').empty();
  $('#counter').empty();
  $('#points').empty();
  let grade;
  let score = (points / (turn * 10)) * 100;

  // Conditional Statement for Grade assignment
  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }
  
  // End of game text and score
  $('#end').text(`Game Over! You Scored: ${points}/${turn * 10}, Your grade is: ${grade}`);

  let againButton = $("<button>").text("Play Again");
  $('#answers').append(againButton);

  // Handle what user dedides 
  againButton.click(function() {
    playAgain();
  });
}

// Function to handle when the question was answered correctly
// and give the user the option to go to the next question
function rightAnswer() {
  // Display if they answered correctly or not
  $('#question').text("Right answer!");
  points += data[turn].points;

  // Next question button
  let nextButton = $("<button>").text("Next Question");

  // Clear old buttons and add button for next question
  $('#answers').empty();
  $('#answers').append(nextButton);

  // Handle Next question button
  nextButton.click(function() {
    nextQuestion();
  });
}

// Function to handle when the question was answered incorrectly
// and give the user the option to try again
function wrongAnswer() {
  // Display if they answered correctly or not
  $('#question').text("Wrong Answer, Try Again?");
  
  // Create decision buttons
  let yesButton = $("<button>").text("Yes");
  let noButton = $("<button>").text("No");

  // Clear old buttons and add decision buttons
  $('#answers').empty();
  $('#answers').append(yesButton, noButton);

  // Handle what user dedides 
  yesButton.click(function() {
    showQuestion();
  });

  noButton.click(function() {
    nextQuestion();
  });
}

function playAgain(){
  $('#end').empty();
  turn = 0;
  points = 0;
  // $('#end').empty();
  showQuestion();
}