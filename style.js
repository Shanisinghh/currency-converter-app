const fromCountryOption = document.getElementById("fromCountryOption");
const toCountryOption = document.getElementById("toCountryOption");
const fromContainer = document.getElementById("fromContainer");
const toContainer = document.getElementById("toContainer");
const input = document.getElementById("input");
const convertCurrencybutton = document.getElementById("convertCurrencybutton");
const fromImage = document.getElementsByClassName("fromImage");
const from_Input = document.getElementById("fromInput");
const to_Input = document.getElementById("toInput");
const renderData = document.getElementById("renderData");

const API_KEY = "82dc7d302ea2e587d6e19b71";

async function convertCurrency() {
    const gettingData =" Geting Exchange Rate....."
   renderData.innerHTML = `
        <p class="text-green-700  m-auto md:text-[21px] text-[20px]">${gettingData}</p>
     `
    
  const from = from_Input.value;
  const to = to_Input.value;


  const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
  let response = await fetch(URL);
  let data = await response.json();
//   console.log(data)

    const fromValue = parseFloat(data.conversion_rates[from] * input.value).toFixed(2)
    const toValue = parseFloat(data.conversion_rates[to]*input.value).toFixed(2)
  console.log(fromValue, from, toValue, to);

  renderData.innerHTML = ` 
        <p class="m-auto md:text-[21px] text-[20px]">${fromValue} ${from} = ${toValue} ${to}</p>
    `;
}

function getFormValue(inputValue, image) {
  fromContainer.innerHTML = `<img
              src="https://flagsapi.com/${image}/flat/64.png"
              class="w-[45px] fromImage"
              alt=""
            />
            <input
              type="text"
              value="${inputValue}"
              disabled
              class="fromInput text-xl font-semibold w-[45px] outline-none block"
            />
              <i class="fa-solid fa-chevron-down text-lg pt-3"></i>`;
              from_Input.value =inputValue
}
function getToValue(inputValue, image) {
  console.log(inputValue);
  toContainer.innerHTML = `<img
              src="https://flagsapi.com/${image}/flat/64.png"
              class="w-[45px] fromImage"
              alt=""
            />
            <input
              type="text"
              value="${inputValue}"
              disabled
              class="fromInput text-xl font-semibold w-[45px] outline-none block"
            />
              <i class="fa-solid fa-chevron-down text-lg pt-3"></i>`;
              to_Input.value =inputValue
}

function getingSymbols() {
  let formDiv = "";
  let toDiv = "";
  for (const country in countryList) {
    // console.log(countryList[country]);

    fromImage.innerHTML = ` <img
              src="https://flagsapi.com/${countryList[country]}/flat/64.png"
              class="w-[45px] fromImage"
              alt=""
            />`;

    formDiv += `  <div onclick = getFormValue("${country}","${countryList[country]}") class="h-10 flex items-center gap-2 mb-0.5">
                 <img
              src="https://flagsapi.com/${countryList[country]}/flat/64.png"
              class="w-[40px]"
              alt=""
            />
            <p class="text-md font-semibold">${country}</p>
            </div>
           <div class=" w-29  h-0.5 border">
            </div>`;
    toDiv += `  <div onclick = getToValue("${country}","${countryList[country]}") class="h-10 flex items-center gap-2 mb-0.5">
                 <img
              src="https://flagsapi.com/${countryList[country]}/flat/64.png"
              class="w-[40px]"
              alt=""
            />
            <p class="text-md font-semibold">${country}</p>
            </div>
           <div class=" w-29  h-0.5 border">
            </div>`;

    fromCountryOption.innerHTML = formDiv;
    toCountryOption.innerHTML = toDiv;
  }
}
getingSymbols();

fromContainer.addEventListener("click", () => {
  fromCountryOption.classList.toggle("active");
  toCountryOption.classList.remove("active");
});
toContainer.addEventListener("click", () => {
  toCountryOption.classList.toggle("active");
  fromCountryOption.classList.remove("active");
});
convertCurrencybutton.addEventListener("click", () => {
  convertCurrency();
});
