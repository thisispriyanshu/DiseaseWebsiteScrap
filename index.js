const cheerio = require("cheerio");
const url = "https://www.mayoclinic.org/diseases-conditions/index?letter="
const links = [];
const request=require('request');
const Disease=require('./models/diseaseSchema')
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT
require('./database/conn');

for (let i = 0; i < 26; i++) {
    const alphabet = String.fromCharCode(i+65);
    const urlAlphabet=url+alphabet;
    request(urlAlphabet,cb);
}

// request(url,cb);
function cb(err,request,html){
    if(err)
      console.log(err)
    else
      extractLink(html);
}

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorElem=$('div[class="index content-within"] > ol > li > a');
    for (let index = 0; index < anchorElem.length; index++) {
        let element = anchorElem[index];
        let link=$(element).attr("href");
        let fullLink="https://www.mayoclinic.org"+link;
        getDetails(fullLink);
    }
}

function getDetails(fullLink) {
    request(fullLink,function (err,request,html) {
        if(err)
          console.log(err)
        else
          extractDetails(html)
    })
}

function extractDetails(html) {
    let $=cheerio.load(html)
    let diseaseName=$('div[class="row"] > h1').text();
    let diseaseAddedBy="Priyanshu";
    if(diseaseName){
    const findDisease=Disease.findOne({diseaseName:diseaseName});
    if (!findDisease) {
      const disease=new Disease({diseaseName,diseaseAddedBy});
      disease.save(); 
      // setTimeout(()=>{console.log("Adding Data...")},2000)
      console.log("Disease Added")
    }
  }
}


