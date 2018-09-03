var buttons = document.getElementsByClassName("buttons")[0];
var result = document.getElementsByClassName("result")[0];

var clearAll = buttons.getElementsByTagName("div")[0];
var clear = buttons.getElementsByTagName("div")[1];
var percent = buttons.getElementsByTagName("div")[2];
var divide = buttons.getElementsByTagName("div")[3];
var multiply = buttons.getElementsByTagName("div")[7];
var substract = buttons.getElementsByTagName("div")[11];
var add = buttons.getElementsByTagName("div")[15];
var decimal = buttons.getElementsByTagName("div")[17];
var equal = buttons.getElementsByTagName("div")[18];

// Adding action class

clearAll.setAttribute("class", "action");
clearAll.setAttribute("id", "clearAll") // to select when clicked
clear.setAttribute("class", "action");
percent.setAttribute("class", "action");
divide.setAttribute("class", "action");
multiply.setAttribute("class", "action");
substract.setAttribute("class", "action");
add.setAttribute("class", "action");
decimal.setAttribute("class", "action");
decimal.setAttribute("id", "decimal"); // to select when clicked
equal.setAttribute("class", "action");



for (var i = 0; i < 19; i++) {
  buttons.getElementsByTagName("div")[i].addEventListener("click", actionType);
}

preOperationNumbersArray = [];

function actionType(event){
  if(event.target.className != "action"){
    var inputNumber = event.target.textContent;
    result.innerHTML += inputNumber;
  }
  else {
    if(event.target.id == "clearAll"){
      result.innerHTML = "";
    }
    else if (event.target.textContent == "C"){
      var previousResult = result.textContent;
      var numberPreviousresult = parseFloat(previousResult);
      var textPreviousResult = numberPreviousresult.toString();
      var previousResultLength = textPreviousResult.length;
      var newResult = textPreviousResult.substring(0,previousResultLength-1);
      result.innerHTML = newResult;
    }
    else if (event.target.textContent == "."){
      result.innerHTML = result.textContent + ".";
    }
    else if (event.target.textContent == "+"){
      var preOperationNumber = result.innerHTML;
      result.innerHTML = "";

      for (var i = 0; i < 19; i++) {
        buttons.getElementsByTagName("div")[i].addEventListener("click", add);
      }

      function add(){

          equal.addEventListener("click", addition);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", add);
          }

        function addition(){
          result.innerHTML = parseFloat(preOperationNumber) + parseFloat(result.textContent);
          equal.removeEventListener("click", addition);
        }
      }
    }
    else if(event.target.textContent == "-"){
      var preOperationNumber = result.innerHTML;
      preOperationNumbersArray.push(preOperationNumber);
      result.innerHTML = "";

      if(preOperationNumbersArray.length < 2){
        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].addEventListener("click", substract);
        }
        function substract(){
          equal.addEventListener("click", simpleSubstraction);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", substract);
          }
        }

        function simpleSubstraction(){
          result.innerHTML = parseFloat(preOperationNumber) - parseFloat(result.textContent);
          equal.removeEventListener("click", simpleSubstraction);
        }

      }else {
        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].removeEventListener("click", substract);
        }
          equal.removeEventListener("click", simpleSubstraction);


        var beforeLast = preOperationNumbersArray.length -2;
        var last = preOperationNumbersArray.length - 1;
        var preoperationResult = parseFloat(preOperationNumbersArray[beforeLast]) - parseFloat(preOperationNumbersArray[last]);
        preOperationNumbersArray.push(preoperationResult);

        for (var i = 0; i < 19; i++) {
        buttons.getElementsByTagName("div")[i].addEventListener("click", multipleSubstract);
        }

        function multipleSubstract(){
          equal.addEventListener("click", complexSubstraction);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", multipleSubstract);
          }
        }

          function multipleSubstraction(){
            var beforeLast = preOperationNumbersArray.length -2;
            var last = preOperationNumbersArray.length - 1;
            result.innerHTML = parseFloat(preOperationNumbersArray[last]) - parseFloat(preOperationNumbersArray[beforeLast]);
            equal.removeEventListener("click", complexSubstraction);
            preOperationNumbersArray.length = 0;
          }
      }
    }

    else if(event.target.textContent == "x"){
      var preOperationNumber = result.textContent;
      result.innerHTML = "";

      for (var i = 0; i < 19; i++) {
        buttons.getElementsByTagName("div")[i].addEventListener("click", multiply);
      }

      function multiply(){
        equal.addEventListener("click", multiplication);

        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].removeEventListener("click", multiply);
        }
      }

      function multiplication(){
        result.innerHTML = parseFloat(preOperationNumber) * parseFloat(result.textContent);
        equal.removeEventListener("click", multiplication);
      }
    }

    else if (event.target.textContent == "/"){
      var preOperationNumber = result.textContent;
      preOperationNumbersArray.push(preOperationNumber);
      result.innerHTML = "";

      if(preOperationNumbersArray.length < 2){

        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].addEventListener("click", divide);
        }

        function divide(){
          equal.addEventListener("click", division);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", divide);
          }
        }

        function division(){

          result.innerHTML = parseFloat(preOperationNumber) / parseFloat(result.innerHTML);
          equal.removeEventListener("click", division);
          preOperationNumbersArray.splice(0,1);
        }
      }else{
        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].removeEventListener("click", divide);
        }

        equal.removeEventListener("click", division);

        var beforeLast = preOperationNumbersArray.length -2;
        var last = preOperationNumbersArray.length - 1;
        var preoperationResult = parseFloat(preOperationNumbersArray[beforeLast]) / parseFloat(preOperationNumbersArray[last]);
        preOperationNumbersArray.push(preoperationResult);


        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].addEventListener("click", multipleDivide);
        }

        function multipleDivide(){
          equal.addEventListener("click", multipleDivision);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", multipleDivide);
          }
        }

        function multipleDivision(){
          var beforeLast = preOperationNumbersArray.length -2;
          var last = preOperationNumbersArray.length - 1;
          result.innerHTML = parseFloat(preOperationNumbersArray[last]) / parseFloat(preOperationNumbersArray[beforeLast]);
          equal.removeEventListener("click", multipleDivision);
          preOperationNumbersArray.length = 0;
        }
      }
    }

    else if (event.target.textContent == "%"){
      var preOperationNumber = result.textContent;
      preOperationNumbersArray.push(preOperationNumber);
      result.innerHTML = "";

      if(preOperationNumbersArray.length < 2){

        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].addEventListener("click", modulo);
        }

        function modulo(){
          equal.addEventListener("click", modulation);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", modulo);
          }
        }

        function modulation(){
          result.innerHTML = parseFloat(preOperationNumber) % parseFloat(result.textContent);
          equal.removeEventListener("click", modulation);
          preOperationNumbersArray.splice(0,1);
        }
      } else {

        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].removeEventListener("click", modulo);
        }

        equal.removeEventListener("click", modulation);

        var beforeLast = preOperationNumbersArray.length -2;
        var last = preOperationNumbersArray.length - 1;
        var preoperationResult = parseFloat(preOperationNumbersArray[beforeLast]) % parseFloat(preOperationNumbersArray[last]);
        preOperationNumbersArray.push(preoperationResult);


        for (var i = 0; i < 19; i++) {
          buttons.getElementsByTagName("div")[i].addEventListener("click", multipleModulo);
        }

        function multipleModulo(){
          equal.addEventListener("click", multipleModulation);

          for (var i = 0; i < 19; i++) {
            buttons.getElementsByTagName("div")[i].removeEventListener("click", multipleModulo);
          }
        }

        function multipleModulation(){
          var beforeLast = preOperationNumbersArray.length -2;
          var last = preOperationNumbersArray.length - 1;
          result.innerHTML = parseFloat(preOperationNumbersArray[last]) % parseFloat(preOperationNumbersArray[beforeLast]);
          equal.removeEventListener("click", multipleDivision);
          preOperationNumbersArray.length = 0;
        }
      }
    }
  }
}
