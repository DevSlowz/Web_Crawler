import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

// Test for normalizeURL
test('Capital letters', () => {
    expect(normalizeURL('https://Blog.Boot.Dev/Path/')).toBe('blog.boot.dev/path')
})

test('HTTPS with tailing slash', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('HTTPS no tailing slash', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('HTTP with tailing slash', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('HTTP no tailing slash', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('No protocol', () => {
    expect(normalizeURL('blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})


// getURLsFromHTML tests
test('relative url converted to absolute url', () => {
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <a href="/page1.html">Page 1</a>
        <br>
        <a href="/page2.html">Page 2</a>
    </body>
    </html>`
    const url = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(html,url)
    const expected = null
    actual.forEach(link => {
        expect(link).toBe(`${url}/${link}`)
    });
    
})


test('verify all anchor are found in the body', () => {
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <a href="/page1.html">Page 1</a>
        <br>
        <a href="/page2.html">Page 2</a>
    </body>
    </html>`
    const url = 'https://www.example.com'
    const actual = getURLsFromHTML(html,url)
    const expected = ['https://www.example.com/page1.html', 'https://www.example.com/page2.html']
    expect(actual).toBe(expected)
    
})