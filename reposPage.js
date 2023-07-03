const axios = require("axios")
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issue");
function getReposPageHtml(url, topic) {
    axios(url)
        .then(response=>{
            let html=response.data
            getReposLink(html)
        }).catch(err=>{
            if(err.response){
                console.log(err)
            }
            else if(err.response==404){
                console.log("Page not found")
            }
        })
    function getReposLink(html) {
        // cheerio
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 10; i++) {
            let twoAnchors = $(headingsArr[i]).find("a");
            console.log($(twoAnchors)[0])
            let link = $(twoAnchors[1]).attr("href");
            console.log(link);
            let fullLink = `https://github.com${link}/issues`;
            console.log(fullLink);
            let repoName = link.split("/").pop();

            getIssuesPageHtml(fullLink, topic,repoName);
        }
        console.log("````````````````````````````");
    }
}
module.exports = getReposPageHtml;