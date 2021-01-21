let checkbox = document.querySelector('input[name="theme"]');
checkbox.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

function calc(a) {
  calform.display.value += a;
}

function equal() {
  calform.display.value = eval(calform.display.value);
}

function del() {
  var currentValue = calform.display.value;
  calform.display.value = currentValue.substr(0, currentValue.length - 1);
}


function ac() {
    calform.display.value = "";
}