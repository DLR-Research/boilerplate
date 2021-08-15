import { createServer, Server } from 'http'
import { parse } from 'url'
import { test as base } from '@playwright/test'
import next from 'next'
import { AddressInfo } from 'net'

export default base.extend<unknown, { port: string }>({
  port: [
    async function ({}, use) {
      const app = next({
        dev: false,
        dir: '.'
      })

      await app.prepare()
      const handle = app.getRequestHandler()

      const server = await new Promise<Server>((resolve, reject) => {
        const server = createServer((req, res) => {
          const parsed_url = parse(req.url!, true)
          handle(req, res, parsed_url)
        })

        server.listen((err: Error) => {
          if (err) return reject(err)
          resolve(server)
        })
      })

      const port = String((server.address() as AddressInfo).port)

      await use(port)

      await new Promise(done => server.close(done))
    },
    {
      scope: 'worker'
    }
  ]
})
