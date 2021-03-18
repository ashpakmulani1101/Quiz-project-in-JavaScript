(function() {
    var questions = [{
      question: "What is ICMS?",
      choices: ["College of chutiya's", "mahaChutitya", "Khupch jast chutiya", "INSTITUDE OF CHUTIYA MANAGEMENT SYSTEM", "None of these"],
      correctAnswer: 3
    }, {
      question: "Who is Virus?",
      choices: ["samir mulani", "jagannath arjun", "rupnar chacha", "bhosdiwali bai", "shrungar madam"],
      correctAnswer: 1
    }, {
      question: "What is BCS ?",
      choices: ["bachlers of chutiya school", "bachlers of chutiya system", "all the above", "none of these", "i'm not chutiya ! ok "],
      correctAnswer: 2
    }, {
      question: "Who is a best friend of APK.",
      choices: ["yogesh","shekhar","sangram", "dj", "lakhan", "i'm your best friend"],
      correctAnswer: 5
    }, {
      question: "What is full form of HOD ?",
      choices: ["head of dentist", "head of doremon", "head of danger", "Mi ka sangu", "None of these"],
      correctAnswer: 3
    }];
    
    var questionCounter = 0; 
    var selections = [];
    var quiz = $('#quiz'); 
    
   
    displayNext();
 
    $('#next').on('click', function (e) {
      e.preventDefault();
      
     
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
     
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
  
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
        
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();