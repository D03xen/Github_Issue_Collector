// Developed by Debparna Biswas
let url = "https://github.com/topics";
const axios = require("axios")
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");
const { response } = require("express");
axios(url)
    .then(response => {
        let html = response.data
        let $ = cheerio.load(html);
        let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
        for (let i = 0; i < linkElemArr.length; i++) {
            let href = $(linkElemArr[i]).attr("href");
            //console.log(href)
            let topic = href.split("/").pop();
            let fullLink = `https://github.com/${href}`;
            //console.log(fullLink)
            getReposPageHtml(fullLink, topic);

        }
    }).catch(err=>{
        if(err.response){
            console.log(err.response)
        }
        else if(err.response==404){
            console.log("Page not found")
        }
    })