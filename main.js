import { crawlPage } from './crawl.js'
import { printReport } from './report.js'
async function main() {
    if (process.argv.length < 3) {
      console.log('no website provided')
      return
    }
    if (process.argv.length > 3) {
      console.log('too many arguments provided')
      return
    }
    const baseURL = process.argv[2]
    // console.log(process.argv[0])
    // console.log(process.argv[1])
  
    console.log(`starting crawl of: ${baseURL}...`)
    let data = await crawlPage(baseURL)
    printReport(data)
  }
  
  main()
  