let infoGetters = document.getElementsByClassName("info-getters");
let valid = true;
const currentDate = new Date();
let OddMonths = [4, 6, 9, 11];
let alertElements = document.getElementsByClassName("alert");
let ageDisplayers = document.getElementsByClassName("age-displayers");

//  function to check if the inputs are empty/
function required() {
    valid = true;

    Array.from(infoGetters).forEach( function(getter, index) {
        if (getter.value === "") {
            if (alertElements[index]) {
                alertElements[index].innerHTML = "This field is required";
            }
            getter.classList.add("invalid");
            valid = false;
        } else {
            if (alertElements[index]) {
                alertElements[index].innerHTML = "";
            }
            getter.classList.remove("invalid");
        }
    });

    return valid;
}

// function to remove the alert messages if the inputs value are not empty

Array.from(infoGetters).forEach(getter => {
    getter.addEventListener('input', () => {
        const alertElement = getter.nextElementSibling;
        if (alertElement) {
            alertElement.innerHTML = "";
        }
        getter.classList.remove("invalid")
    });
});

//  function to check for date month and year validity 
function checkDayValidity() {
    let CurrentYear = currentDate.getFullYear();
    let day = Number(infoGetters[0].value);
    let month = Number(infoGetters[1].value);
    let year = Number(infoGetters[2].value);

    if (day < 1 || day > 31) {
        alertElements[0].innerHTML = "Invalid day";
        infoGetters[0].classList.add("invalid");
        for(x of ageDisplayers){
            x.innerHTML = "--";
        }
        valid = false;
    }else if ((month === 2 && day > 29) || (OddMonths.includes(month) && day > 30)) {
        alertElements[0].innerHTML  = "Must be  a valid date";
        infoGetters[0].classList.add("invalid");
         for(x of ageDisplayers){
            x.innerHTML = "--";
        }
        valid = false;
    } else if( month > 12){
        alertElements[1].innerHTML ="Must be a valid month";
        infoGetters[1].classList.add("invalid");
        for (x of ageDisplayers) {
            x.innerHTML = "--";
        }
        valid = false ;
    }else if (year >= CurrentYear) {
        alertElements[2].innerHTML = "Must  be in  the past year";
        infoGetters[2].classList.add("invalid");
        for (x of ageDisplayers) {
            x.innerHTML = "--";
        }
        valid = false;
    } 
}

// function to return the age in years month and says 

function ageCalculator() {

        let YearOfBirth, Birthday, Birthmonth, Birthyear;
            Birthday = infoGetters[0].value;
            Birthmonth = infoGetters[1].value;
            Birthyear = infoGetters[2].value;
            YearOfBirth = Birthmonth + "/" + Birthday + "/" + Birthyear;
        const mainBirthYear = new Date(YearOfBirth);
        let mainAge = currentDate - mainBirthYear;
        let MainYear = Math.floor(mainAge / 1000 / 60 / 60 / 24 / 365.25);
        let MainMonth = Math.floor(mainAge / 1000 / 60 / 60 / 24 / 30.4375) % 12;
        let mainDay = Math.floor(mainAge / 1000 / 60 / 60 / 24) % 30;
        for(x of ageDisplayers){
            x.innerHTML = "";
        };
        ageDisplayers[0].innerHTML = MainYear;
        ageDisplayers[1].innerHTML = MainMonth;
        ageDisplayers[2].innerHTML = mainDay;
    }

    // function checker and to display the age values 
    
let ageChecker = document.getElementById("check-age");
ageChecker.addEventListener('click', function () {
        required();
        checkDayValidity();
        if(valid){
            ageCalculator();
        }
});


