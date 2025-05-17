//website
//- index dropdowns
let dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (code in countryList) {
    let newopt = document.createElement("option");
    let countryName = currencyToCountry[code];
    newopt.innerText = `${code} - ${countryName}`;
    newopt.value = code;
    if (select.name == "from" && code == "USD") {
      newopt.selected = "selected";
    } else if (select.name == "to" && code == "INR") {
      newopt.selected = "selected";
    }
    select.appendChild(newopt);
  }
}

//exchanging from & to
let exicon = document.querySelector(".exchange-icon");
let from = dropdowns[0];
let to = dropdowns[1];

let fromflag = document.querySelector(".from img");
let toflag = document.querySelector(".to img");
exicon.addEventListener("click", () => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;

  flagchange();
});

for (select of dropdowns) {
  select.addEventListener("change", flagchange);
}

function flagchange() {
  fromflag.setAttribute(
    "src",
    `https://flagsapi.com/${countryList[from.value]}/flat/64.png`
  );
  toflag.setAttribute(
    "src",
    `https://flagsapi.com/${countryList[to.value]}/flat/64.png`
  );
}

// Getting exchange rate

let amount = document.querySelector(".amount input");
let submitbtn = document.querySelector("#submit");

amount.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault(); // Prevent the browser’s default behavior is to submit the form (like refreshing)
    submit();
  }
});

submitbtn.addEventListener("click", submit);

function submit() {
  let errormsg = document.querySelector("#error-msg");
  if (from.value == to.value) {
    errormsg.classList.remove("hidden");
    errormsg.classList.add("errmsg");
  } else {
    errormsg.classList.add("hidden");
    // API URL
    let url = `https://v6.exchangerate-api.com/v6/17be347605739b4546e84327/pair/${from.value}/${to.value}/${amount.value}`;
    getExchangeRate(url);
  }
}

function changeConversionRate(exrate) {
  let convmsg = document.querySelector(".conversion h2");
  convmsg.innerText = `${amount.value} ${from.value} = ${exrate.data.conversion_result} ${to.value}`;

  let convrate = document.querySelector("#rate");
  convrate.innerText = `1 ${from.value} = ${exrate.data.conversion_rate} ${to.value}`;
}

async function getExchangeRate(url) {
  try {
    let exrate = await axios.get(url);
    changeConversionRate(exrate);
  } catch (err) {
    console.log(err);
  }
}
