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

async function crawlPage(baseURL, currentURL, pages) {

    let webpage
    // Attempt to fetch information from specified URL
    try {
        webpage = await fetch(currentURL)
    } catch (error) {
        throw new Error(`Got Network error: ${error.message}`)
    }
    
    // If the response from the fetch is equivalent to an error(>400) displaay to console
    if (webpage.status >= 400) {
        let err = new Error(`Got HTTP error: ${webpage.status} ${webpage.statusText}`)
        console.log(err.message)
        return 
    }

    // If the response from the fetch is not a valid type display error to console
    if (!webpage.headers.get('Content-Type').includes('text/html')){
        let err = new Error(`Got non-HTML response: ${contentType}`)
        console.log(err.message)
        return 
    }

    // Collect, Store, and display web content
    const webpageContent = await webpage.text()
    
    console.log(webpageContent)
}



export { normalizeURL, getURLsFromHTML, crawlPage};