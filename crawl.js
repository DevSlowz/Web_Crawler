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



export { normalizeURL };