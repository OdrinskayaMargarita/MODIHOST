export  default () => {
    let dollar  = document.getElementById('dollar')
    let rost = document.getElementById('rost')

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=modihost')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let upDown = data[0].price_change_percentage_24h.toFixed(2);
            console.log(upDown)
            if (upDown > 0) {
                rost.closest('p').classList.add('green')
            } else {
                rost.closest('p').classList.add('red')
                upDown = -1*upDown
            }
            dollar.innerHTML = '$' + data[0].current_price.toFixed(4);
            rost.innerHTML = upDown;
        });
}