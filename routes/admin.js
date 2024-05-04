var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("multer");
const { v4: uuid, parse } = require("uuid");
var aes256 = require("aes256");
var passkey = "pass";
var qPasskey = "pass";
var logger = require("../controller/logger");
var ip = require("ip");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { Parser } = require("json2csv");
const { jsPDF } = require("jspdf");
const { isArrayBuffer } = require("util/types");

router.get('/' , (req,res)=>{
  res.send ({'status' : 'haha'});
})
module.exports = router;


