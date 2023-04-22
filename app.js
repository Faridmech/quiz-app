const changeQuestionContainer = (html) => {
   questionsContainer.innerHTML = html;
}

const questions = [
    {
        id: 5,
        questionText: "How old is Farid?",
        variants: [
         {
            id: 1,
            text: 25,
            is_true: false
         },
         {
            id: 2,
            text: 28,
            is_true: true
         },
         {
            id: 4,
            text: 28,
            is_true: false
         },
         {
            id: 5,
            text: 28,
            is_true: false
         }
        ],
     },
     {
        id: 10,
        questionText: "How old is Samir?",
        variants: [
         {
            id: 1,
            text: 25,
            is_true: false
         },
         {
            id: 2,
            text: 28,
            is_true: true
         },
         {
            id: 4,
            text: 28,
            is_true: false
         },
         {
            id: 5,
            text: 28,
            is_true: false
         }
        ],
     },
];

let answers = [];
// let correctAnswers = 0;

const questionsContainer = document.getElementById("questions");

let questionsIndex = 0;

const changeQuestion = (questions,questionsIndex) => {

   const question = questions[questionsIndex];
   const questionContainer = `
      <div id="question" data-id="${question.id}" class="question" >
      <h1 class="intro"></h1>
      <p>${question.questionText ?? ""}</p>
      
      <div id="answer">
         ${question.variants.map((v) => {
            return `
              <input value="${v.id}" type="radio" name="answers">
              <label for="html">${v.text ?? ""}</label><br>
            `;
         }).join("")}
      </div>
      </div>
   `;

   changeQuestionContainer(questionContainer);
};

const sumCorrectAnswers = () => {
   let correctAnswers = 0;

   return function(){
      return correctAnswers++;
   }
};

const sumCorrectAnswersFunc = sumCorrectAnswers();

const getAnswers = (answers) => {

   const q = document.getElementById("question"),
   q_id = +q.getAttribute('data-id'),
   a_id = +document.querySelector('input[name="answers"]:checked')?.value || null;

   questions.forEach(quest => {
      if(quest.id === q_id) {
         quest.variants.forEach(ans => {
            if(ans.id === a_id && ans.is_true) {
               console.log("true");
               sumCorrectAnswersFunc();
            }
         });
      }
   });

   answers.push({
      question_id: q_id,
      answer_id: a_id,
   });
};


const finishedTest = (answers) => {
   let correctAnswers = sumCorrectAnswersFunc();
   changeQuestionContainer(`Congratulations, you finished your test! correct ans:${correctAnswers}`)
   document.getElementById("nextContainer").remove();
};

changeQuestion(questions,questionsIndex);

const nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", function() {
   getAnswers(answers);

   if(questions.length - 1 === questionsIndex) {
      finishedTest(answers);
      return;
   }

   questionsIndex++;
   changeQuestion(questions,questionsIndex);
});