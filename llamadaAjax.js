window.onload = function() {
    openTrivia();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
/* Función implementada con AJAX (se llama al recargar la página y al darle a: Volver a jugar!) */
function openTrivia() {
    document.getElementById("resultado").style.display = 'none';
    numQuestion = 0;
    correctAnswers = 0;
    results = {}; // Parte del JSON devuelto que contiene las preguntas...

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=18", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            results = respuesta.results;
            console.log(results);
            question(results);
        }
    }
    ajax.send();
}

function question(preguntas) {
    let divPreguntas = document.getElementById('preguntas');
    document.getElementById("preguntas").style.display = 'block';
    for (let i = 0; i < preguntas.length; i++) {
        if (numQuestion == i) {
            if (preguntas[i].type == "boolean") {
                let questionArray = [`<button class="btn btn-primary btn-lg btn-block" id="true" onclick="checkquestion(true); return false;" value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>`, `<button class="btn btn-primary btn-lg btn-block" id="false" onclick="checkquestion(false); return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>`];
                questionArray.sort(function() { return 0.5 - Math.random() });
                divPreguntas.innerHTML = `<h3>` + preguntas[i].question + `</h3>`
                for (let z = 0; z < questionArray.length; z++) {
                    divPreguntas.innerHTML += questionArray[z]
                }
                divPreguntas.innerHTML += `<button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            } else {
                let questionArray = [`<button class="btn btn-primary btn-lg btn-block" id="true" onclick="checkquestion(true)"; return false;value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>`, `<button class="btn btn-primary btn-lg btn-block" id="false1" onclick="checkquestion(false)"; return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>`, `<button class="btn btn-primary btn-lg btn-block" id="false2" onclick="checkquestion(false); return false;" value="` + preguntas[i].incorrect_answers[1] + `">` + preguntas[i].incorrect_answers[1] + `</button>`, `<button class="btn btn-primary btn-lg btn-block" id="false3" onclick="checkquestion(false); return false;" value="` + preguntas[i].incorrect_answers[2] + `">` + preguntas[i].incorrect_answers[2] + `</button>`];
                questionArray.sort(function() { return 0.5 - Math.random() });
                divPreguntas.innerHTML = `<h3>` + preguntas[i].question + `</h3>`
                for (let z = 0; z < questionArray.length; z++) {
                    divPreguntas.innerHTML += questionArray[z]
                }
                divPreguntas.innerHTML += `<button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            }
        }
        let nextquestion = document.getElementById('nextQuestion');
        nextquestion.onclick = function() {
            if (numQuestion == 10) {
                document.getElementById("resultado").style.display = 'block';
                divPreguntas.style.display = 'none';
                document.getElementById('quantityCorrect').innerText = "Respuestas correctas: " + correctAnswers;
                document.getElementById('playAgain').onclick = function() {
                    openTrivia();
                }
            } else {
                question(preguntas);
            }
        }
    }

}

function checkquestion(iscorrect) {
    if (iscorrect == true) {
        correctAnswers++
        document.getElementById("true").className = "btn btn-success btn-lg btn-block";
        document.getElementById("true").disabled = "disabled";
        if (document.getElementById("false") != null) {
            document.getElementById("false").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false").disabled = "disabled";
        } else {
            document.getElementById("false1").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false2").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false3").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false1").disabled = "disabled";
            document.getElementById("false2").disabled = "disabled";
            document.getElementById("false3").disabled = "disabled";
        }
    } else {
        if (document.getElementById("false") != null) {
            document.getElementById("false").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("true").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("true").disabled = "disabled";
            document.getElementById("false").disabled = "disabled";
        } else {
            document.getElementById("false1").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false2").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false3").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false1").disabled = "disabled";
            document.getElementById("false2").disabled = "disabled";
            document.getElementById("false3").disabled = "disabled";
            document.getElementById("true").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("true").disabled = "disabled";
        }
    }
    numQuestion++;
}