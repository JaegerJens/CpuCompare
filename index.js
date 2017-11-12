const fetch = require('node-fetch');
const cpuListRequest = 'https://de.pcpartpicker.com/products/cpu/fetch/?m=21&Z=2330%2C4700&C=1%2C8&R=4&mode=list&xslug=&search=';


async function getCpuList() {
    const response = await fetch(cpuListRequest);
    const data = await response.json();
    const list = Object.values(data.result.data);
    return list;
}


function showData(cpuData) {
    for(let entry of cpuData) {
        console.log(`${entry.name}: ${entry.price/100}`);
    }
}

getCpuList()
    .then(data => showData(data))
    .catch(err => console.error(err));
