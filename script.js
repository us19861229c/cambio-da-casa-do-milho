const apiInfo = {
  api: 'https://api.ratesapi.io/api/',
  endpoint: 'latest'
}

const url = `${apiInfo.api}${apiInfo.endpoint}`

window.onload = () => {
  setupEventHandlers(); 
  fetchAllCurrencies();
}

const setupEventHandlers = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);

  const inputText = document.querySelector('#currency-input');
  inputText.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      handleSearchEvent();
    }
  });
}

const handleSearchEvent = () => {
  const currencyValue = document.querySelector('#currency-input').value;

  if (currencyValue === '') {
    renderEmptyAlert()
  } else {
    clearList();
    fetchCurrency(currencyValue);
  }
}

const renderEmptyAlert = () => {
  window.alert('Por favor, insira alguma moeda!');
}

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const fetchAllCurrencies = _ => {

  fetch(url)
    .then((response) => response.json())
    .then((object) => {
      const allCurrenciesRates = object.rates
      const allCurrenciesNames = Object.keys(allCurrenciesRates)
      allCurrenciesNames.forEach((currencyName) => {
        const selectMainCurrency = document.querySelector('#main-currency-options');
        const selectReturnCurrency = document.querySelector('#secondary-currency-options')
        selectOptionCurrencies(currencyName, selectMainCurrency);
        selectOptionCurrencies(currencyName, selectReturnCurrency)
      })
    })
}

const handleError = (errorMessage) => {
  window.alert(errorMessage);
}

const handleRates = (rates) => {
  const ratesKeys = Object.keys(rates);
  
  ratesKeys.forEach((key) => {
    const value = rates[key];
    renderRate(key, value);
  })
}

const renderRate = (key, value) => {
  const currencyList = document.querySelector('#currency-list');
  const formattedValue = value.toFixed(2);

  const li = document.createElement('li');
  li.innerHTML = `<b>${key}:</b> ${formattedValue}`;

  currencyList.appendChild(li);
}
//


// const fetchCurrency = (currency) => {
//   const endpoint = `${url}?base=${currency}`;

//   fetch(endpoint)
//     .then((response) => response.json())
//     .then((object) => {
//       console.log(object);
//       if (object.error) {
//         throw new Error(object.error);
//       } else {
//         handleRates(object.rates);
//       }
//     })
//     .catch((error) => handleError(error))
// }
const selectOptionCurrencies = (key, selectCurrency) => {
  const optionCurrency = document.createElement('option');
  if (key === 'BRL') {
    optionCurrency.selected === true
  }
  optionCurrency.value = `${key}`
  optionCurrency.innerHTML = ` ${nameRates[key][0]} | ${key} (${nameRates[key][1]})`
  selectCurrency.appendChild(optionCurrency)
}

// const inputPlaceMainValue = document.getElementById("main-currency-place")
// let selectedCurrencyAcronym = 'teste'
// inputPlaceMainValue.addEventListener('click', () => {
//   inputPlaceMainValue.placeholder = `${selectedCurrencyAcronym}`
// })

// A ideia é criar um objeto onde se possa buscar o significado do acrônimo,
// e a bandeira de cada país respectivamente
nameRates = {
  'GBP': ['🇬🇧','Great Britain Pound'],
  'HKD': ['🇭🇰','Hong Kong Dollar'],
  'IDR': ['🇮🇩','Indonesia Rupiah'],
  'ILS': ['🇮🇱','Israel New Shekel'],
  'DKK': ['🇩🇰','Denmark Krone'],
  'INR': ['🇮🇳','India Rupee'],
  'CHF': ['🇨🇭','Switzerland Franc'],
  'MXN': ['🇲🇽','Mexico Peso'],
  'CZK': ['🇨🇿','Czech Koruna'],
  'SGD': ['🇸🇬','Singapore Dollar'],
  'THB': ['🇹🇭','Thailand Baht'],
  'HRK': ['🇭🇷','Croatia Kuna'],
  'MYR': ['🇲🇾','Malaysia Ringgit'],
  'NOK': ['🇳🇴','Norway Kroner'],
  'CNY': ['🇨🇳','China Yuan/Renminbi'],
  'BGN': ['🇧🇬','Bulgaria Lev'],
  'PHP': ['🇵🇭','Philippines Peso'],
  'SEK': ['🇸🇪','Sweden Krona'],
  'PLN': ['🇵🇱','Poland Zloty'],
  'ZAR': ['🇿🇦','South Africa Rand'],
  'CAD': ['🇨🇦','Canada Dollar'],
  'ISK': ['🇮🇸','Iceland Krona'],
  'BRL': ['🇧🇷','Brazil Real'],
  'RON': ['🇷🇴','Romania New Lei'],
  'NZD': ['🇳🇿','New Zealand Dollar'],
  'TRY': ['🇹🇷','Turkish New Lira'],
  'JPY': ['🇯🇵','Japan Yen'],
  'RUB': ['🇷🇺','Russia Rouble'],
  'KRW': ['🇰🇷','South Korea Won'],
  'USD': ['🇺🇸','USA Dolar'],
  'HUF': ['🇭🇺','Hungary Forint'],
  'AUD': ['🇦🇺','Australia Dollar']
}