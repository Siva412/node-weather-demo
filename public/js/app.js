const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (event) => {
    document.querySelector('.msg').innerText = "Loading..."
    event.preventDefault();
    const location = event.currentTarget[0].value;
    fetch(`/weather?address=${encodeURIComponent(location)}`).then(response => {
    response.json().then(data => {
        if(data.error){
            document.querySelector('.msg').innerText = data.error;
            console.log("Error", data.error);
            return;
        }
        document.querySelector('.msg').innerHTML = `
        <p><b>Location:</b> ${data.location}</p>
        <p><b>Temparature:</b> ${data.temparature}\xB0C</p>
        <p><b>Forecast:</b> ${data.forecast}</p>
        `;
    })
})
})