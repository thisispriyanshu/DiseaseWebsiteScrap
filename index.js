const cheerio = require("cheerio");
const url = "https://timesofindia.indiatimes.com/life-style/health-fitness/health-a-z?from=mdr"
const links = [];
const request=require('request');
const Disease=require('./models/diseaseSchema')
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT
require('./database/conn');
const xpath=require('xpath-html')
const mayo_url="https://www.mayoclinic.org/diseases-conditions/acl-injury/symptoms-causes/syc-20350738";

// for (let i = 0; i < 26; i++) {
    // const alphabet = String.fromCharCode(i+65);
    // const urlAlphabet=url+alphabet;
    // request(urlAlphabet,cb);
// }
request(mayo_url,mb);
function mb(err,request,html){
  if(err)
      console.log(err)
    else
      // extractLink(html);
      MayoClinicDetails(html)
}
request(url,cb);
function cb(err,request,html){
    if(err)
      console.log(err)
    else
      // extractLink(html);
      TimesOfIndiaDetails(html)
}

// function extractLink(html){
    // let $ = cheerio.load(html);
    // let anchorElem=$('div[class="index content-within"] > ol > li > a');
    // for (let index = 0; index < anchorElem.length; index++) {
        // let element = anchorElem[0];
        // let link=$(element).attr("href");
        // let fullLink="https://www.mayoclinic.org"+link;
        // getDetails(fullLink);
    // }
// }



function extractDetails(html) {
    let $=cheerio.load(html)
     let name=$('.az_content_heading').text()
  //  console.log(diseaseTitle)
   let generalInfo=$('div[class="diseas_content clearfix"]').text()
  // console.log(diseaseOverview)
    let diseaseAddedBy="Priyanshu";
    const disease=new Disease({name,generalInfo,diseaseAddedBy});
    // disease.save();
    // setTimeout(()=>{
      // console.log("Adding Data")},2000)
}

function TimesOfIndiaDetails(html){
   let $=cheerio.load(html)
   let diseasesLink=$('ul[class="diseas_listing clearfix"] > li > a')
  //  console.log(diseasesLink)
   for (let index = 0; index < diseasesLink.length; index++) {
     let element = diseasesLink[index];
     let link=$(element).attr("href");
       let fullLink="https://timesofindia.indiatimes.com"+link;
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

function MayoClinicDetails(html){
    let $=cheerio.load(html);
    let name=$('div[class="row"] > h1').text();
    console.log(name) 
    // let text_heading=$('div[class="content"] > div > h2');
    // for (let index = 0; index < text_heading.length; index++) {
    //   let element = text_heading[index];
    //   let heading=$(element).text();
    //   console.log(heading);
    // }
    let p_text=$('div[class="row"] > div[class="content"] > div > p')
    for (let index = 0; index < p_text.length; index++) {
      let element = p_text[index];
      let heading=$(element).text();
      console.log(heading);
      console.log("=======================================")
    }
    // console.log(p_text);
}
