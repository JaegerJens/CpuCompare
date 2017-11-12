const fetch = require('node-fetch');
const cpuListRequest = 'https://de.pcpartpicker.com/products/cpu/fetch/?m=21&Z=2330%2C4700&C=1%2C8&R=4&mode=list&xslug=&search=';


async function getCpuList() {
    const response = await fetch(cpuListRequest);
    const data = await response.json();
    const list = Object.values(data.result.data);
    return list;
}

function compare(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

function prepareData(cpuData) {
    return cpuData
        .filter(e => e.price > 0)
        .sort((a, b) => compare(a.price, b.price));
}


function showData(cpuData) {
    const data = prepareData(cpuData);
    for(let entry of data) {
        if (entry.price < 0)
            continue;
        console.log(`${entry.name}: ${entry.price/100}`);
    }
}

getCpuList()
    .then(data => showData(data))
    .catch(err => console.error(err));
