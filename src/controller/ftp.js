const express = require('express');
const serveIndex = require('serve-index');

exports.showForms = async (req,res,next)=>{
    serveIndex('src/files/registration',{icons: true})
}
