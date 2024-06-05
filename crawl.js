import { JSDOM } from 'jsdom'
function normalizeURL(url){
// URL object
// hostname 
// pathname

    // If a protocol is not attatch prpend protocol
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    // Create URL Object 
    const normalizedURL = new URL(url.toLowerCase())

    // Extract hostname from URL object
    const hostname = normalizedURL.hostname
    // Extract path from URL object and remove trailing /
    let path = normalizedURL.pathname
    if (path.endsWith('/')){
        path = path.slice(0, -1);
    }

    return `${hostname}${path}`
}

function getURLsFromHTML(htmlBody, baseURL) {
    // Returns list of all the link URLs - un-normalized
    // Create an object of the DOM
    const links = []
    const dom = new JSDOM(htmlBody)
    const anchorElements = dom.window.document.querySelectorAll('a')
    
    anchorElements.forEach(anchor => {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')

            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                links.push(href)
            } catch (error) {
                console.log(`${error.message}: ${href}`)
            }
        }
    });
    
    return links
}

// async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {

//     let webpage
//     // Attempt to fetch information from specified URL
//     try {
//         webpage = await fetch(currentURL)
//     } catch (error) {
//         throw new Error(`Got Network error: ${error.message}`)
//     }
    
//     // If the response from the fetch is equivalent to an error(>400) displaay to console
//     if (webpage.status >= 400) {
//         let err = new Error(`Got HTTP error: ${webpage.status} ${webpage.statusText}`)
//         console.log(err.message)
//         return 
//     }

//     // If the response from the fetch is not a valid type display error to console
//     if (!webpage.headers.get('Content-Type').includes('text/html')){
//         let err = new Error(`Got non-HTML response: ${contentType}`)
//         console.log(err.message)
//         return 
//     }

//     // Collect, Store, and display web content
//     const webpageContent = await webpage.text()
    
//     console.log(webpageContent)
// }

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    let URLs
    let currentURLHost = new URL(currentURL)
    // Verify currentURL is on the same domain as the baseURL
    if (currentURLHost.host !== new URL(baseURL).host) {
        return pages
    }

    // Normalized URL
    let normalURL = normalizeURL(currentURL)
    if (normalURL in pages) {
        pages[normalURL]++
        return pages
    }
    else{
        pages[normalURL] = 1 
    }

    let webpageContent = ''
    console.log(`crawling ${currentURL}`)
    try {
        webpageContent = await fetchAndParseHTML(currentURL)
    } catch (error) {
        console.log(`${err.message}`)
        return pages
    }

    // Get urls from HTML bodies from webpageContent
    URLs = getURLsFromHTML(webpageContent,currentURL)
    // Crawl Each URL
    await Promise.all(URLs.map(url => crawlPage(baseURL, url, pages)));

    return pages
    
}

async function fetchAndParseHTML(currentURL) {
    let webpage
    // Attempt to fetch information from specified URL
    try {
        webpage = await fetch(currentURL)
    } catch (error) {
        throw new Error(`Got Network error: ${error.message}`)
    }
    
    // If the response from the fetch is equivalent to an error(>400) displaay to console
    if (webpage.status > 399) {
        console.log(`Got HTTP error: ${webpage.status} ${webpage.statusText}`)
        return 
    }

    const contentType = webpage.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return
    }

    // console.log(await webpage.text())

    // Collect, Store, and display web content
    const webpageContent = await webpage.text()
    
    return webpageContent
}


export { normalizeURL, getURLsFromHTML, crawlPage};