'use strict'
const fs = require('fs')
const $ = require('jquery')

const html = fs.readFileSync(__dirname + '/../classwork/index.html', "utf-8")
let inner = html.split('<body>')
inner = inner[1] ? inner[1].split('</body>')[0] : ' '
document.body.innerHTML = inner

describe('Classwork 1 submission: index.html', ()=>{
    it('should contain proper html and body tags', ()=>{
        expect(html).toContain('<html>')
        expect(html).toContain('</html>')
        expect(html).toContain('<body>')
        expect(html).toContain('</body>')
    })
    it('should contain a proper heading tag from h1 to h6', ()=>{
        let innerText = ''
        const h1 = $('h1').length
        innerText = h1 && $('h1').text().trim().length ? $('h1').text() : innerText
        const h2 = $('h2').length
        innerText = h2 && $('h2').text().trim().length ? $('h2').text() : innerText
        const h3 = $('h3').length
        innerText = h3 && $('h3').text().trim().length ? $('h3').text() : innerText
        const h4 = $('h4').length
        innerText = h4 && $('h4').text().trim().length ? $('h4').text() : innerText
        const h5 = $('h5').length
        innerText = h5 && $('h5').text().trim().length ? $('h5').text() : innerText
        const h6 = $('h6').length
        innerText = h6 && $('h6').text().trim().length ? $('h6').text() : innerText

        expect(h1 || h2 || h3 || h4 || h5 || h6).toBeTruthy()
        expect(innerText.length > 0).toBeTruthy() 
    })
    it('should contain a paragraph tag', ()=>{
        const paraWithText = $('p').text().trim()
        expect(paraWithText.length>0).toBeTruthy()
    })
    it('should contain a div tag', ()=>{
        const divEl = $('div').contents()
        expect(divEl.length>0).toBeTruthy()
    })
    it('should contain a list: ul-li or ol-li tags', ()=>{
        const unorderedList = $('ul li').text()
        const orderedList = $('ol li').text()
        expect(unorderedList.length > 0 || orderedList.length > 0 ).toBeTruthy()
    })
    it('should contain a proper image tag with valid image', ()=>{
        const image = $('img').attr('src')
        let valid = /\.(jpe?g|png|gif|bmp)$/i.test(image) 
        expect(valid).toBeTruthy()
    })
    it('should contain a proper link tag with a valid external URL and linked text', ()=>{
        const link = $('a')
        let valid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(link.attr('href')) 
        expect(link.text().length > 0).toBeTruthy()
        expect(valid).toBeTruthy()
    })
    it('should contain a form: form, input, button tags', ()=>{
        const form = $('form').length
        const input = $('input').length
        const button = $('button').length
        expect(form || input || button).toBeTruthy()
    })
    it('should contain a multi-row table with correctly nested table, tr, td tags', ()=>{
        const table = $('table').length
        const rowCol = $('table tr td').text().trim().length
        expect(table && rowCol).toBeTruthy()
    })
})