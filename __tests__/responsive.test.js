'use strict'
const fs = require('fs')
const $ = require('jquery')

const html = fs.readFileSync(__dirname + '/../classwork/index.html', "utf-8")
const responsive = fs.readFileSync(__dirname + '/../classwork/responsive.css', "utf-8")

let head = html.split('<head>')
head = head[1] ? head[1].split('</head>')[0] : ' '
document.head.innerHTML = head

describe('Classwork 3 submission', () => {
    it('should insert responsive.css file into index.html', () => {
        let externalCSS = $('head link')
        for (let i = 0; i < externalCSS.length; i++) {
            if ($(externalCSS[i]).attr('href') == 'responsive.css') {
                externalCSS = $(externalCSS[i]).attr('href')
                break
            }
        }
        const rel = $('head link').attr('rel')
        expect(externalCSS).toEqual('responsive.css')
        expect(rel).toEqual('stylesheet')
    })
    it('should insert responsive meta tag into index.html', () => {
        let metaTags = $('meta')
        for (let i = 0; i < metaTags.length; i++) {
            if ($(metaTags[i]).attr('name') == 'viewport' && $(metaTags[i]).attr('content') == 'width=device-width, initial-scale=1') {
                metaTags = 'viewport'
                break
            }
        }
        expect(metaTags == 'viewport').toBeTruthy()
    })
    it('should apply a media query for devices less than 500px width in responsive.css', () => {
        expect(responsive.match(/^\s*@media\s*\(max-width:500px\)\s*{\s*(\.|#)?(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*{/gm)).toBeTruthy()
    })
    it('should apply a media query for devices more than 1000px width in responsive.css', () => {
        expect(responsive.match(/^\s*@media\s*\(min-width:1000px\)\s*{\s*(\.|#)?(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*{/gm)).toBeTruthy()
    })
    it('should apply a media query for devices within a given width range in responsive.css', () => {
        expect(responsive.match(/^\s*@media\s*\((min|max)-width:[0-9]+px\)\s*and\s*\((min|max)-width:[0-9]+px\)\s*{\s*(\.|#)?(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*{/gm)).toBeTruthy()
    })
})