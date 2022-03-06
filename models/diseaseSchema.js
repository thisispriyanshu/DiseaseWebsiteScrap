const mongoose =require('mongoose')

const DiseaseSchema=new mongoose.Schema({
    diseaseName:{
        type:String,
        required:true
    },
    diseaseAddedBy:{
        type:String,
        required:true
    },
    diseaseType:{
        type:String
    },
    diseaseInfo:{
        type:String
    },
    diseaseSymptoms:{
        type:String
    },
    diseaseCauses:{
        type:String
    },
    diseaseComplications:{
        type:String
    },
    diseaseMedication:{
        type:String
    },
    diseaseVaccine:{
        type:String
    },
    diseaseLabTest:{
        type:String
    },
},{timestamps:true})

module.exports = mongoose.model('Disease', DiseaseSchema);