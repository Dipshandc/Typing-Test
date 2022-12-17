//Random Quote API URL
const quoteApiUrl = "https://api.quotable.io/random?minLength=150&maxLength=170";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

//variables
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display random quote
const newQuote = async () => {
    const response = await fetch(quoteApiUrl)
    let data = await response.json();
    quote = data.content
    console.log(quote)
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    })
    quoteSection.innerHTML += arr.join("");
}

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "none";
    // userInput.disabled = true;
    newQuote();
}

//start test
function startTest() {
    mistakes = 0;
    timer = "";
    document.getElementById("stop-test").style.display = "block"
    timerStart()
     userInput.addEventListener("keydown",function(e){
        if(e.code==="Enter"){
            displayResult()
        }
    })
}

//Comparing user input with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars")
    quoteChars = Array.from(quoteChars)

    let userInputChars = userInput.value.split("")
    quoteChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success")
        }
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success")
            }
            else {
                char.classList.remove("fail")

            }

        }
        else {
            if (!char.classList.contains("fail")) {
                mistakes++
                char.classList.add("fail")
            }
            document.getElementById("mistakes").innerHTML = mistakes

        }
        let check = quoteChars.every(element => {
            return element.classList.contains("success")
        })
        if (check) {
            displayResult()
        }
    })
})

function displayResult() {
    document.querySelector(".result").style.display = "block"
    document.getElementById("stop-test").style.display = "none"
    clearInterval(int);
    userInput.disabled = true;
}

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
const timerRef = document.getElementById("timer")
let int = null

function timerStart() {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
}
function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = `${m} : ${s}`;
    if (m = 0) {
        timeTaken = s/60;
    }
    else {
        timeTaken = m+s/60;
    }
    document.getElementById("wpm").innerText = (userInput.value.length/5/timeTaken).toFixed(2)+"wpm"
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length-mistakes)/userInput.value.length)*100)+"%"
}

