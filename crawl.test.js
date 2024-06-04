import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";


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