console.log('Client side js loaded')

const weatherForm = document.querySelector('form')
const ip = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

msg1.textContent = ''
msg2.textContent = ''

weatherForm.addEventListener(
    'submit',
    (e) =>
    {
        e.preventDefault()

        const location = ip.value

        msg1.textContent = 'LOADING...'
        msg2.textContent = 'PLEASE WAIT!'

        fetch('http://localhost:3000/weather?address=' + location).then(
        (response) =>
        {
            response.json().then(
            (data) =>
            {
                if(data.error)
                {
                    msg1.textContent = data.error
                    msg2.textContent = ''
                }
                else
                {
                    msg1.textContent = data.location
                    msg2.textContent = data.forecast
                }
            })
        })
    })