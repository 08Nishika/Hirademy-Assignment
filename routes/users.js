var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("multer");
const { v4: uuid, parse } = require("uuid");
var imgname;
var aes256 = require("aes256");
var passkey = "a";
var qPasskey = "a";
var imgname = "";
var logger = require("../controller/logger");
var ip = require("ip");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
var nodemailer = require("nodemailer");



module.exports = router;
