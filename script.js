/* eslint no-multiple-empty-lines:"off" */
/* eslint no-sequences:"off" */
/* eslint default-case:"off" */
/* eslint eqeqeq:"off" */
/* eslint no-lonely-if:"off" */
/* eslint no-param-reassign:"off" */
/* eslint no-plusplus:"off" */
insertElements("- -", "- -", "- -");
function showResult(event) {
  const date = new Date();
  const actuelDate = date.getDate() + ((date.getMonth() + 1) * 100) + (date.getFullYear() * 10000);
  const userDate = (parseInt((document.getElementById("year").value) * 10000)) + (parseInt((document.getElementById("month").value) * 100)) + parseInt((document.getElementById("day").value));
  let correctDate = true;

  const userYear = parseInt((document.getElementById("year").value) * 10000);
  if (document.querySelector(".year").querySelector("span")) {
    document.querySelector(".year").querySelector("span").remove()
  }
  if (userYear <= 0 || Number.isInteger(userYear) == false) {
    let empty = false;
    if (userYear === 0) {
      empty = true;
    }
    document.querySelector(".year").innerHTML += createErrorElement("year", empty);
    correctDate = false;
  }

  let userMonth = parseInt((document.getElementById("month").value) * 100);
  if (document.querySelector(".month").querySelector("span")) {
    document.querySelector(".month").querySelector("span").remove()
  }
  if (userMonth > 0 && userMonth < 1200) {
    if (Number.isInteger(userMonth) == false) {
      document.querySelector(".month").innerHTML += createErrorElement("month", false);
      correctDate = false;
    }
  } else {
    let empty = false;
    if (userMonth === 0) {
      empty = true;
    }
    document.querySelector(".month").innerHTML += createErrorElement("month", empty);
    correctDate = false;
  }

  const userDay = parseInt((document.getElementById("day").value));
  if (document.querySelector(".day").querySelector("span")) {
    document.querySelector(".day").querySelector("span").remove()
  }
  if (userDay <= 0 || Number.isInteger(userDay) == false) {
    let empty = false;
    if (Number.isNaN(userDay)) {
      empty = true;
    }
    document.querySelector(".day").innerHTML += createErrorElement("day", empty);
    correctDate = false;
  }




  if (isDateBigger(userDate)) {
    if (userYear > (date.getFullYear()) * 10000) {
      if (document.querySelector(".year").querySelector("span")) {
        document.querySelector(".year").querySelector("span").remove()
      }
      document.querySelector(".day").innerHTML += createErrorElement("day", false);
      document.querySelector(".month").innerHTML += createErrorElement("month", false);
      document.querySelector(".year").innerHTML += createErrorElement("year", false);
      correctDate = false;
    }


    if (userMonth > ((date.getMonth() + 1) * 100)) {
      if (document.querySelector(".month").querySelector("span")) {
        document.querySelector(".month").querySelector("span").remove()
      }
      document.querySelector(".month").innerHTML += createErrorElement("month", false);
      correctDate = false;
    }


    if (userDay > date.getDate()) {
      if (document.querySelector(".day").querySelector("span")) {
        document.querySelector(".day").querySelector("span").remove()
      }
      document.querySelector(".day").innerHTML += createErrorElement("day", false);
      correctDate = false;
    }
  } else { /* leap year check */
    if (userMonth == 100 || userMonth == 300 || userMonth == 500 || userMonth == 700 || userMonth == 800 || userMonth == 1000 || userMonth == 1200) {
      if (userDay > 31) {
        if (document.querySelector(".day").querySelector("span")) {
          document.querySelector(".day").querySelector("span").remove()
        }
        document.querySelector(".day").innerHTML += createErrorElement("date", false);
        correctDate = false;
      }
    } else if (userMonth == 400 || userMonth == 600 || userMonth == 900 || userMonth == 1100) {
      if (userDay > 30) {
        if (document.querySelector(".day").querySelector("span")) {
          document.querySelector(".day").querySelector("span").remove()
        }
        document.querySelector(".day").innerHTML += createErrorElement("date", false);
        correctDate = false;
      }
    } else if ((userYear / 10000) % 100 !== 0 || (userYear / 10000) % 400 !== 0) {
      if (userDay > 28) {
        if (document.querySelector(".day").querySelector("span")) {
          document.querySelector(".day").querySelector("span").remove()
        }
        document.querySelector(".day").innerHTML += createErrorElement("date", false);
        correctDate = false;
      } else if (userDay > 29) {
        if (document.querySelector(".day").querySelector("span")) {
          document.querySelector(".day").querySelector("span").remove()
        }
        document.querySelector(".day").innerHTML += createErrorElement("date", false);
        correctDate = false;
      }
    }
  }

  if (correctDate === true) { // calculating age
    colorBack();
    let year;
    year = date.getFullYear() - (userYear / 10000);

    if (userDate - actuelDate == 0) {
      insertElements("0", "0", "0");
    } else {
      let month = (date.getMonth() + 1) - userMonth / 100;
      if (month <= 0) {
        year -= 1;

        month = 12 + month;
      }
      let day = (date.getDate()) - userDay;

      const actuelMonth = date.getMonth() + 1;
      const actuelYear = date.getFullYear();
      if (day < 0) {
        month -= 1;

        if (actuelMonth == 1 || actuelMonth == 3 || actuelMonth == 5 || actuelMonth == 7 || actuelMonth == 8 || actuelMonth == 10 || actuelMonth == 12) {
          day += 31;
        } else if (actuelMonth == 4 || actuelMonth == 6 || actuelMonth == 9 || actuelMonth == 11) {
          day += 30
        } else if ((actuelYear / 10000) % 100 !== 0 || (actuelYear / 10000) % 400 !== 0) {
          day += 28;
        } else {
          day += 29;
        }
      }
      if (month == 12) {
        month = 0;
        year += 1;
      }
      if(day==30){
        month+=1;
        day=0;
      }
      insertElements(year, month, day);
    }
  } else {
    insertElements("- -", "- -", "- -");
  }

  event.preventDefault()
}

function isDateBigger(submitedDate) {
  const date = new Date();
  const actuelDate = date.getDate() + ((date.getMonth() + 1) * 100) + (date.getFullYear() * 10000);

  if (actuelDate >= submitedDate) {
    return false;
  } else {
    return true
  }
}

function createErrorElement(errorPlace, inserted) {
  let error;
  if (inserted === false) {
    error = `
    <span class="error">Must be a valid ${errorPlace}</span>
    `;
  } else {
    error = `
    <span class="error">This field is required</span>
    `;
  }
  const labelList = document.querySelectorAll(".label");
  labelList.forEach((label) => { label.classList.add("form__label--error") })

  return error
}

function insertElements(year, month, day) {
  const element = `
  <div><span>${year}</span><p>years</p></div>
  <div><span>${month}</span><p>months</p></div>
  <div><span>${day}</span><p>days</p></div>
  `;
  document.querySelector(".wraper__result").innerHTML = element;
}

function colorBack() {
  const labelList2 = document.querySelectorAll(".label");
  labelList2.forEach((label) => { label.classList.remove("form__label--error") })
}
