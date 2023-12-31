//Developed by Debparna Biswas
const axios = require("axios")
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesPageHtml(url, topic, repoName) {
    axios(url)
        .then(response=>{
            let html=response.data
            getIssues(html)
        }).catch(err=>{
            if(err.response){
                console.log(err.response)
            }
            else if(err.response==404){
                console.log("Page not found")
            }
        })
    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(issuesElemArr.length);
        let arr = [];
        for (let i = 0; i < issuesElemArr.length; i++) {
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        console.log(topic,"     ",arr);
        let folderpath = path.join(__dirname, topic);
        dirCreater(folderpath);
        let filePath = path.join(folderpath, repoName + ".pdf");
        console.log(filePath);
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}
module.exports = getIssuesPageHtml;
function dirCreater(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }

}
