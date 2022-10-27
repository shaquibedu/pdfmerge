const express = require('express');
const multer  = require('multer');
const merge = require('easy-pdf-merge');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
    }
  })
  
  const upload = multer({ storage: storage })


const app = express()

app.post('/uploadDemo', upload.array('manyFiles'), function (req, res, next) {
    res.send('File uploaded please check /public/uploads folder')
})

merge(['public/uploads/1.pdf', 'public/uploads/2.pdf'], 'output/3.pdf', function (err) {
  if (err) {
      return console.log(err)
  }
  console.log('Successfully merged!')
});


app.listen(3000);