const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { brotliDecompressSync } = require('zlib')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Dhaval Chudasama'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        message:'help help help.....',
        title: 'Help',
        name:'Dhaval Chudasama'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name:'Dhaval'
    })
})
app.get('/product', (req,res)=>{ 
    if(!req.query.search){
        res.send({
            error:'Please provid ethe search terms' 
         })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })

})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
           return res.send({ error })
        }
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    /*console.log(req.query.address)
    res.send({
        location:'Anand',
        forecast:'couldy',
        address: req.query.address
    })*/

})
app.get('/help/*', (req,res)=>{
    res.render('404_page',{
        errorMessage:'Help article not found',
        title:'404',
        name:'Dhaval Chudasama'
    })
})
app.get('*', (req,res)=>{
    res.render('404_page',{
        errorMessage:'Page Not found',
        title: '404',
        name: 'Dhaval Chudasama'
    })
})


/*app.get('', (req, res)=>{
    res.send('<h1>Weather</h1')
})*/
/*app.get('/help', (req,res)=>{
    res.send([{
        name: 'Dhaval',
        age: 29
    },{
        name: 'Suhani',
        age: 26
    }])
})*/
/*app.get('', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/about.html'))

    // res.send('<h1>About</h1>')
})
app.get('/help', (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/help.html'))
})
app.get('/weather', (req,res)=>{
    res.send({
        forcast: 'Overcast',
        location: 'Anand'
    })
})*/
app.listen(3000, ()=>{
    console.log('App is running on port 3000')
})
