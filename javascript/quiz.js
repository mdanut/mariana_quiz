(function()
{
 var questions = [{
    choice:"multiple",
    question:" 1.Which is a reserved word in the Java programming language?",
    choices: ["method", "native","subclasses", "abstract","array"],
    correctAnswer:[3,1],
    points:[0,0.5,0,0.5,0],
    selections:[-1,-1,-1,-1,-1]
  }, {
    choice:"multiple",
    question: "2.Which is a valid keyword in java?",
    choices: ["class", "interface", "string", "float","unsigned"],
    correctAnswer:[0,1],
   points: [0.5,0.5,0,0,0],
   selections:[-1,-1,-1,-1,-1]

  }, {
    choice:"multiple",
    question: "3.Which is false about a method-local inner class?",
    choices: ["It must be marked final","It can be marked abstract.", "It can be marked public.", "It can be marked static.", "none of the above"],
    correctAnswer: [0,2,3],
    points: [0.33,0,0.33,0.34,0],
   selections:[-1,-1,-1,-1,-1]
     }, {
    choice:"single",
    question: "4.What is byte code in the context of Java?",
    choices: ["The type of code generated by a Java compiler", "The type of code generated by a Java Virtual Machine", "It is another name for a Java source file", "It is the code written within the instance methods of a class", "It is another name for comments written within a program."],
    correctAnswer: 1,
    points: [1,0,0,0,0],
 selections:[-1,-1,-1,-1,-1]
  }, {
    choice:"single",
    question: "5.Which of the following may be part of a class definition?",
    choices: ["instance variables", "instance methods", "constructors", "all of the above", "none of the above"],
    correctAnswer: 3,
    points: [0,0,0,1,0],
    selections:[-1,-1,-1,-1,-1]
  }, {
    choice:"single",
    question: "6.Which cannot directly cause a thread to stop executing?",
    choices: ["Calling the SetPriority() method on a Thread object.", "Calling the wait() method on an object.","Calling notify() method on an object.","Calling read() method on an InputStream object.","all of this"],
    correctAnswer: 2,
    points: [0,0,1,0,0],
    selections:[-1,-1,-1,-1,-1]
 }, {
    choice:"single",
    question: "7.Which class does not override the equals() and hashCode() methods, inheriting them directly from class Object?",
    choices: ["java.lang.String", "java.lang.Double", "java.lang.StringBuffer", "java.lang.Character", "none of the above"],
    correctAnswer: 2,
    points: [0,0,1,0,0],
    selections:[-1,-1,-1,-1,-1]
  }, {
    choice:"multiple",
    question: "8.What is the most restrictive access modifier that will allow members of one class to have access to members of another class in the same package?",
    choices: ["public", "protected", "abstract", "synchronized", "default access"],
    correctAnswer: 5,
    points: [0,0,0,0,1],
    selections:[-1,-1,-1,-1,-1]
  }, {
    choice:"single",
    question: "9.You need to store elements in a collection that guarantees that no duplicates are stored and all elements can be accessed in natural order. Which interface provides that capability?",
    choices: ["java.util.Map","java.util.Set", "java.util.List", "java.util.Collection","none of the above"],
    correctAnswer: 1,
    points: [0,1,0,0,0],
     selections:[-1,-1,-1,-1,-1]
  }, {
 
    choice:"single",
    question: "10.Which is the valid declarations within an interface definition?",
    choices: ["public double methoda();","public final double methoda();", "static void methoda(double d1);", "protected void methoda(double d1);", "none of the above"],
    correctAnswer: 0,
    points: [1,0,0,0,0],
   selections:[-1,-1,-1,-1,-1]
  }];

var quiz = $('#quiz');
var remainQuestion= 0;
var id;
var questionCounter= 0;
var type;
var finalResult = 0;
var count = 900;
var counter = setInterval(displayTimer, 1000);

displayQuestion(); 
displayListOfQuestions();

$('#endQuiz').on('click',function(e) 
{
  userOptionsSelected();
  displayNumberOfQuestionsUnchecked();
  
  count=0;
  if (remainQuestion > 0 )
      var optionSelected = confirm("Atentie!Nu ati raspuns la"+ remainQuestion + "intrebari");
  
  if( optionSelected == true || remainQuestion ==0) 
  {   
    userOptionsSelected();
    var backtoFirstPage = confirm("Nota obtinuta este :"+ displayScore()+".Iesiti din quiz?");
    
    if (backtoFirstPage == true)
      window.location.href="../index.html";
    else 
      $("#test").html(displayScore()); 
    }
});

// Click handler for the 'next' button
$('#next').on('click', function (e) 
{ e.preventDefault(); 
            //Suspend click listener during fade animation
   if(quiz.is(':animated'))
    {        
         return false;
    }
   userOptionsSelected();                // If no user selection, progress is stopped
   questionCounter++;
   displayQuestion(); 
});

// Click handler for the 'prev' button
$('#previous').on('click', function (e) 
{ e.preventDefault();
  if(quiz.is(':animated')) 
     {   return false;
     }
  userOptionsSelected();
  questionCounter--;
  displayQuestion();
});

  // Click handler for the 'Start Over' button
$('#start').on('click', function (e) 
{
  e.preventDefault();

  if(quiz.is(':animated')) 
  {
       return false;
  }
  questionCounter = 0;
  displayQuestion();
  $('#start').hide();
});

  // Animates buttons on hover
$('.buttons').on('click', function (e) 
{   e.preventDefault();
		$('#next').show();
	  $('#previous').show();
    userOptionsSelected();
		questionCounter = $(this).attr('id');
		if (questionCounter == 0)
		   $('#previous').hide();

	  if(questionCounter == 9)
       $('#next').hide();

	  displayQuestion();
  
});

function createQuestion(index)
  {
    var qElement=$('<div>').attr('id','question');
    var header =$('<h2 id="question">Intrebarea' + (+ index + 1)+':<h2>'); 
    qElement.append(header);
    var question =$('<p>').append(questions[index].question); 
    qElement.append(question);
    if (questions[index].choice == "multiple") 
      {
           id="chkBox";
           type="checkbox";
           var checkButtons = createCheckButtons(index);
           qElement.append(checkButtons); 
      }
    else 
       {
           id="radioB";
           type="radio";
           var radioButtons=createRadios(index);
           qElement.append(radioButtons);
         }
    return qElement;
  }

function createRadios(index)
 {
    var radioList=$('<ul>');
    var item;
    var input='';

    for(var i =0;i<questions[index].choices.length;i++)
          {
              item=$('<li>');
              input='<input id="radioB'+ i + '" type="radio" name ="answer" value=' + i +'/>'; 
              input += questions[index].choices[i];
              item.append(input);
              radioList.append(item);
          }

    return radioList;
 }

//hold what the user selects
function userOptionsSelected()
  {
   for(var i =0;i<questions[questionCounter].selections.length; i++)
       {
            if( $("#"+ id + i).is(":checked"))
                     questions[questionCounter].selections[i]=0;
            else
                if(questions[questionCounter].selections[i] == 0 && $("#"+ id + i).attr('checked', false))
                    {
                      questions[questionCounter].selections[i]=-1;
                    }
       }

 }
  
 function createCheckButtons(index)
  {
     var checkList=$('<ul>');
     var item;
     var input ='';
     for(var i =0;i<questions[index].choices.length;i++)
        {
              item =$('<li >');
              input ='<input id="chkBox' + i +'" type="checkbox" name ="answer" value='+ i +'/>';
              input += questions[index].choices[i];
              item.append(input);
              checkList.append(item);
        }
    return checkList;
  }


function displayQuestion()
  {
  	quiz.html("");
    $('#question').remove();
    if(questionCounter < questions.length)
          {
             var nextQuestion = createQuestion(questionCounter);
             quiz.append(nextQuestion).fadeIn();
             for(var i=0 ; i<5 ; i++)
                   if(questions[questionCounter].selections[i] == 0)
                         $("#"+id+i).attr('checked', true); 

             if(questionCounter == 9)
                 {$('#next').hide();}

             if(questionCounter == 1){
                 $('#previous').show();}
              
            else 
               if(questionCounter == 0)
                 {
                   $('#previous').hide();
                   $('#next').show();
                 }
    }else {
             $("#test").html(displayScore());
             $('#next').hide();
             $('#previous').hide();
             $('#start').show();
          }
  }

function displayScore() 
 {  
    var score=qElement=$('<p>').attr('id','question');
    var finalResult=0;

    for(var i=0; i<questions.length; i++)
          {
            var maxValue = Math.max(questions[i].points[0],questions[i].points[1],questions[i].points[2],questions[i].points[3],questions[i].points[4]);
            for(var j=0; j < questions[i].selections.length; j++)
              if(questions[i].selections[j] == 0 && questions[i].points[j] > 0 )
                        finalResult += questions[i].points[j];

              else
                if(questions[i].selections[j] == 0 && questions[i].points[j] == 0)
                      finalResult -= maxValue;
          }
    return finalResult; 
  }

function displayNumberOfQuestionsUnchecked() 
{ 
    remainQuestion=0;
    for(var i =0; i<questions.length; i++)
      {  ok=false;
         j=0;
        while(j<questions[i].selections.length && ok == false)
          {
             if(questions[i].selections[j] == 0)
                 ok=true;
             j++;
          }
        if (ok == false)
              remainQuestion++;
      }
 }

  function displayTimer()
 {
    count = count - 1;
    if (count == -1) 
      { clearInterval(counter)
      return;}
    var seconds = count % 60;
    var minutes = Math.floor(count / 60);
    minutes %= 60;
    if (minutes == 0 & seconds == 0 || count == 0)
        {
        	$('#displayTimer').html=("Testul s-a terminat!");
        }
    if(minutes <= 9 && seconds<=9)
        $("#time").html('0'+ minutes + " : " + '0'+seconds);

    if( minutes <= 9 && seconds>9)
        $("#time").html('0'+ minutes + " : " +seconds); 

    if( minutes > 9 && seconds<=9)
       $("#time").html( minutes + " : " +'0'+seconds); 
         
    if( minutes > 9 && seconds>9)
       $("#time").html(minutes + " : " + seconds); 
  }

  
 function displayListOfQuestions() 
  {  
    var output='<ul>';
    for(var j = 0; j< questions.length ; j++ )
      	output +='<li id="list" ><button class="buttons" id="' + j + '">Intrebarea'+ ( j + 1) +'</button></li>';
             
    output+="</ul>";
    $('#listOfQuestions').html(output);
  }


})();

