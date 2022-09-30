var prevBtns = document.querySelectorAll('.btn-prev');
var nextBtns = document.querySelectorAll('.btn-next');
var progress = document.getElementById('progress');
var formSteps = document.querySelectorAll('.form-step');
var progressSteps  = document.querySelectorAll('.progress-step');



let formStepsNum = 0;

for (let index = 0; index < nextBtns.length; index++) {
  const element = nextBtns[index];

  // click sur un lien +1 à la variable 'formStepsNum' et on déclenche la fonction updateFormSteps() et updateProgressBar()
  element.addEventListener('click', function() {
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  })
}

for (let index = 0; index < prevBtns.length; index++) {
  const element = prevBtns[index];

  // click sur un lien -1 à la variable 'formStepsNum' et on déclenche la fonction updateFormSteps() et updateProgressBar()
  element.addEventListener('click', function() {
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  })
}

function updateFormSteps() {
  // chaque elt(formSteps) on select celui qui a la class 'form-step-active' et on lui la retire
  formSteps.forEach( function(formStep) {
    formStep.classList.contains('form-step-active') && formStep.classList.remove('form-step-active');
  })

  // on ajoute la class 'form-step-active' au formSteps[formStepsNum+1]
  formSteps[formStepsNum].classList.add('form-step-active');
}

// cet fontion anime elt contenant le chiffre du niveau d'étape
function updateProgressBar() {
  progressSteps.forEach(function (progressStep,idx) {
    idx < formStepsNum+1 ? progressStep.classList.add('progress-step-active') : progressStep.classList.remove('progress-step-active');
  })
  var progressActive  = document.querySelectorAll('.progress-step-active');
  progress.style.width = ((progressActive.length -1 ) / (progressSteps.length - 1) * 100+'%');
}

$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
      $(".file-upload").removeClass('active');
      $("#noFile").text("No file chosen..."); 
    }
    else {
      $(".file-upload").addClass('active');
      $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
    }
  });
  