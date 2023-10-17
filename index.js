// 1. load all the urls from redirects.yml
const YAML = require('yaml');
const fs = require('fs')
const path = require('path')

const redirectsFile = fs.readFileSync(path.join(__dirname , 'redirects.yml') , 'utf-8')
const redirects = YAML.parse(redirectsFile);

// 2. generate an html page for each redirect url from template.html
const templateHTML = fs.readFileSync(path.join(__dirname , 'template.html') , 'utf-8')
for( let [slug, url] of Object.entries(redirects)){

    console.log('Genrating HTML page for: ', slug)

    const html = templateHTML.replace('https://example.com', url)
    
    //create folder for each slug
    const folderPath = path.join(__dirname , 'out' , slug)
    fs.mkdirSync(folderPath, {recursive: true})

    fs.writeFileSync(path.join(folderPath, 'index.html') , html)

}