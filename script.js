
// console.log('hello world');
// const request =  fetch('http://www.cbr.ru/', {
//
// });

// request.then(data => data.body)
//     .then(res => console.log(res));

//https://www.cbr-xml-daily.ru/daily_utf8.xml
//http://www.cbr.ru/scripts/XML_daily.asp?date_req=21/02/2020
async function getData() {
    const response = await fetch('http://www.cbr.ru/scripts/XML_daily.asp?date_req=21/02/2020');
    if (response.status === 200) {
        const body = await response.text();
        //const blockData = body.match(/<Valute ID="R01235">(.*)<\/Valute>/s);
        //Everything else the same
        if (window.DOMParser)
        {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(body, "text/xml");
            const array = xmlDoc.getElementsByTagName("Valute");
            console.log(array);
            for (const item of array) {
                if (item.getAttribute("ID") === 'R01235') {
                    console.log(item.getElementsByTagName("Value")[0].childNodes[0].nodeValue);
                };
            }
        }
        else // Internet Explorer
        {
            const xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(body);
        }
    } else {
        throw new Error(response.status);
    }
}

getData();
//console.log(getData());



// async function loadJson(url) { // (1)
//     let response = await fetch(url); // (2)
//
//     if (response.status == 200) {
//         let json = await response.text(); // (3)
//         return json;
//     }
//
//     throw new Error(response.status);
// }
//
// loadJson('http://www.cbr.ru')
//     .catch(alert);