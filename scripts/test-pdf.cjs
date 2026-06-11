const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('./master-assets/SquadLists-English.pdf');

pdf(dataBuffer).then(function(data) {
  // we just want to see the text for the first page
  const text = data.text;
  const page1 = text.split('Algeria (ALG)')[1].split('Argentina (ARG)')[0];
  console.log(page1.substring(0, 2000));
});
