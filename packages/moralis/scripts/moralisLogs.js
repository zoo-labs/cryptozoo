const axios = require('axios')
const utils = require('moralis-admin-cli/utils')
const btoa = require('btoa')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const NETWORK = process.env.NETWORK ? process.env.NETWORK : 'hardhat'
const CHAIN_IDS = {
  hardhat:  '0x539',
  testnet:  '0x61',
  mainnet:  '0x38',
  ethereum: '0x1',
  ropsten:  '0x3',
}
const CHAIN_ID = CHAIN_IDS[NETWORK]
const SERVER_NAME = {
  hardhat:  'Hardhat',
  testnet:  'Zoo Testnet',
  mainnet:  'Zoo Mainnet',
  ethereum: 'Zoo ETH Mainnet',
  ropsten:  'Zoo ETH (Ropsten)',
}[NETWORK]

/**
 * Get Moralis logs
 */
;(async () => {
  try {
    // Check if api key and secret are given parameters
    let apiKey = await utils.getApiKey()
    let apiSecret = await utils.getApiSecret()
    const servers = await utils.getUserServers()

    // If no server is found, throw an exception
    if (servers.length == 0) throw 'No server found'

    // Get the server to apply the event syncs to
    const server = servers.filter((item) => item.updateCloudError === 0 && item.update === 0 && item.enabledEvms && item.name == SERVER_NAME)[0]

    const subdomain = server.subdomain
    const masterKey = server.masterKey
    const applicationId = server.applicationId

    // Timeout (500ms) by default
    let timeout = 500

    // Get how many logs the user wants to see (from most recent to older ones). 10 by default
    const numberOfLogs = 100

    const url = `https://${subdomain}:2053/server/scriptlog?n=${numberOfLogs}`

    // Encode key and appId just once
    const encoded = btoa(`${applicationId}:${masterKey}`)

    // Axios config
    const config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    }

    const seen = new Set()
    setInterval(() => {
      axios(config)
        .then(function (response) {
          for (log of response.data) {
            if (seen.has(log.timestamp)) continue
            else seen.add(log.timestamp)

            if (
              !log.message.match(/Client disconnect/) &&
              !log.message.match(/Create new client/) &&
              !log.message.match(/Can not find subscription/) &&
              !log.message.match(/✅/) &&
              !log.message.match(/⏳/)
            )
              console.log(`${log.level}: ${log.message}`)
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status == 502) console.error(`error: 502 Bad Gateway`)
          else console.error(`error: ${error}`)
        })
    }, timeout)
  } catch (error) {
    console.log(error)
  }
})()
