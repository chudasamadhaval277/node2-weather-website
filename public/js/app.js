console.log('Client side java script is loaded')

/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })  
})*/

/*fetch('http://localhost:3000/weather?address=Anand').then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }

        })

        })*/

        const weatherform = document.querySelector('form')
        const search = document.querySelector('input')
        const messageOne = document.querySelector('#message-1')
        const messageTwo = document.querySelector('#message-2')
        //messageOne.textContent=''

       
        weatherform.addEventListener('submit',(e)=>{
            e.preventDefault()
            const location = search.value

            messageOne.textContent = 'loading...'
            messageTwo.textContent = ''
            fetch('/weather?address='+location+'').then((response)=>{
                response.json().then((data)=>{
                    if(data.error){
                        messageOne.textContent=data.error
                        console.log(data.error)
                       
                    }else{
                        messageOne.textContent=data.location
                        messageTwo.textContent=data.forecast
                        console.log(data.location)
                        console.log(data.forecast)
                    }
                })
            })

        })
            
            /*fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{
            response.json().then((data)=>{
                console.log(data)
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data.location)
                console.log(data.forecast)
            }

            })

            })*/   
        
        

//https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2h1ZGFzYW1hZGhhdmFsMjc3IiwiYSI6ImNrbGJ3d2tyNDFhNGkydWxibWhzd2M3NXAifQ._rLBbHvCXkqFAW31iH-Dnw&limit=1
