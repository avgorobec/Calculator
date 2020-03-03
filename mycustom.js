
function getData(src){
 return fetch(src)
    .then(response => response.json());
}

const urls = [
	'https://www.quandl.com/api/v3/datasets/JOHNMATT/RHOD.json?api_key=aA9LZmFzefNrEd2J4T6C&start_date=2020-02-16',
	'https://www.quandl.com/api/v3/datasets/JOHNMATT/PLAT.json?api_key=aA9LZmFzefNrEd2J4T6C&start_date=2020-02-16',
	'https://www.quandl.com/api/v3/datasets/JOHNMATT/PALL.json?api_key=aA9LZmFzefNrEd2J4T6C&start_date=2020-02-16'
];

let requests = urls.map(url => fetch(url));

window.addEventListener('load', () => {
	let fieldRubl = document.getElementById('rubl');
	let platinumUser = document.getElementById('platinum');
	let palladiumUser = document.getElementById('palladium');
	let rhodiumUser = document.getElementById('rhodium');
	let platinumMarket = 0;
	let palladiumMarket = 0;
	let rhodiumMarket = 0;
	let rubleExchangeRate = 0;
	let platinumCost = document.getElementById('platinumCost');
	let palladiumCost = document.getElementById('palladiumCost');
	let rhodiumCost = document.getElementById('rhodiumCost');
	let resultCost = document.getElementById('resultCost');
	
	function calcResult(metalWeight, metalCost) {
		let result = 0;
		for (let i = 0; i < metalCost.length; i++) {
			result = result + Number(metalCost[i]) * Number(fieldRubl.value) / 31 * Number(metalWeight[i]) * 0.8 ;
		}
		resultCost.innerText = result.toFixed(2);
	}

	if (platinumUser) {
		getData('https://www.cbr-xml-daily.ru/daily_json.js')
		.then(data => {
			rubleExchangeRate = data.Valute.USD.Value;
			//value ? fieldRubl.value = rubleExchangeRate : null;
			if (platinumUser) {
				console.log(data.Valute.USD.Value);
				fieldRubl.value =  rubleExchangeRate.toFixed(2);
			}
		});

		const promise = Promise.all(requests);
		let arr = [];
		promise
			.then(responses => Promise.all(responses.map(item => item.json())))
			.then(responses => {
				responses.forEach(res => arr.push(res.dataset.data[0][4]));
				rhodiumMarket = arr[0];
				platinumMarket = arr[1];
				palladiumMarket = arr[2];
				if (platinumUser) {
					rhodiumMarket ? rhodiumCost.value = rhodiumMarket : rhodiumCost.value = 0;
					platinumMarket ? platinumCost.value = platinumMarket : platinumCost.value = 0;
					palladiumMarket ? palladiumCost.value = palladiumMarket : palladiumCost.value = 0;
					platinumUser.disabled = false;
					palladiumUser.disabled = false;
					rhodiumUser.disabled = false;
				}
			});
		
		[platinumUser, palladiumUser, rhodiumUser].forEach((element) => {
			element.addEventListener('input', () => {
				calcResult([platinumUser.value, palladiumUser.value, rhodiumUser.value], [platinumCost.value,	palladiumCost.value, rhodiumCost.value]);
			})
		});
	}

	if (document.querySelector('.close__panel')) {
		let close_btn = document.querySelector('.close__panel');
		let filials = document.getElementById('filials');
		document.getElementById('showPanel').onclick = () => {
			if (filials.style.display === 'block') {
				filials.style.display = 'none';
			} else {
				filials.style.display = 'block';
			}
		};
		close_btn.addEventListener('click', () => {
			filials.style.display = 'none';
		})
	}
});





























