'use strict'
const fs = require('fs')
const $ = require('jquery')

const html = fs.readFileSync(__dirname + '/../classwork/index.html', "utf-8")
const css = fs.readFileSync(__dirname + '/../classwork/style.css', "utf-8")

let head = html.split('<head>')
head = head[1] ? head[1].split('</head>')[0] : ' '
document.head.innerHTML = head

let inner = html.split('<body>')
inner = inner[1] ? inner[1].split('</body>')[0] : ' '
document.body.innerHTML = inner

describe('Classwork 2 submission', () => {
    it('should correctly insert style.css file into index.html', () => {
        let externalCSS = $('head link')
        for (let i = 0; i < externalCSS.length; i++) {
            if ($(externalCSS[i]).attr('href') == 'style.css') {
                externalCSS = $(externalCSS[i]).attr('href')
                break
            }
        }
        const rel = $('head link').attr('rel')
        expect(externalCSS).toEqual('style.css')
        expect(rel).toEqual('stylesheet')
    })
    it('should add class or style attributes to elements in HTML', () => {
        const styleAttr = $('[style]').length
        const classAttr = $('[class]').length
        expect(styleAttr || classAttr).toBeTruthy()
    })
    it('should use a valid class selectors in style.css', () => {
        expect(css.match(/^\s*\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*{/gm)).toBeTruthy()
    })
    it('should use a valid id selectors in style.css', () => {
        expect(css.match(/^\s*#(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*{/gm)).toBeTruthy()
    })
    it('should use element selectors in style.css', () => {
        expect(css.match(/^\s*([a-z]|[A-Z])+\s*{/gm)).toBeTruthy()
    })
    it('should define a font-size property in any CSS rule in style.css', () => {
        expect(css.includes('font-size')).toBeTruthy()
    })
    it('should define a font color property in any CSS rule in style.css', () => {
        expect(css.match(/^\s*color/gm)).toBeTruthy()
    })
    it('should define a margin property in any CSS rule in style.css', () => {
        expect(css.includes('margin')).toBeTruthy()
    })
    it('should define a padding property in any CSS rule in style.css', () => {
        expect(css.includes('padding')).toBeTruthy()
    })
    it('should define a width property in any CSS rule in style.css', () => {
        expect(css.includes('width')).toBeTruthy()
    })
    it('should define a background-color property in any CSS rule in style.css', () => {
        expect(css.includes('background-color')).toBeTruthy()
    })
})