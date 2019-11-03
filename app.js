const express=require("express")
        app=express()
        fetch=require("node-fetch")
        inquirer = require('inquirer')





app.use("/",(req,res)=>{

    // Function to fetch the date of Birth
    async function fetchdate(array){
        const res=await fetch("http://api.nobelprize.org/v1/laureate.json")
        const data=await res.json()
        await array.forEach(d=>{
            data.laureates.forEach(d1=>{
              if(d1.id===d.id)
                d.born=d1.born
                d.code=d1.bornCountryCode
            })
        })
        fetchcountry(array)
    }
    
    // Function to fetch the country
    async function fetchcountry(array){
        const res=await fetch("http://api.nobelprize.org/v1/country.json")
        const data=await res.json()
        await array.forEach(d=>{
            data.countries.forEach(d1=>{
              if(d.code===d.code)
                d.code=d1.name
            })
        })
    

// Printing Array of all the resultant objects of the query

        console.log(array)
    }
// Helper function to fetch year and Category
    function searchhelper(b,name,array){
        b.prizes.forEach((item) => {
            if(item.laureates){
            item.laureates.forEach(ele=>{
                
                if((ele.firstname) && (ele.firstname).toLowerCase()===name.toLowerCase()){
                        array.push({id:ele.id,year:item.year,cate:item.category})
                    }

                
                else if((ele.surname) && ((ele.surname).toLowerCase()===name.toLowerCase())){
                                    console.log(item)
                          }
            })
           
        }
        
        });
        fetchdate(array)

    }
    function search(body){
        var questions = [{
            type: 'input',
            name: 'name',
            message: "What's your name?",
            }]
            inquirer.prompt(questions).then(answers => {
                searchhelper(body,answers['name'],[])        
                
              })
        

    }
// First it will run
    fetch("http://api.nobelprize.org/v1/prize.json")
    .then(res =>  res.json())
    .then(body=>search(body))
    
    })





app.listen(4000,()=>{
            console.log("Server Started")
})