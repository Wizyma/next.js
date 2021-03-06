/* eslint-env jest */
/* global jasmine */
import { join, resolve, relative } from 'path'
import { existsSync, readFileSync } from 'fs'
import { CHUNK_GRAPH_MANIFEST } from 'next-server/constants'
import { nextBuild } from 'next-test-utils'

const appDir = join(__dirname, '../')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

describe('Chunk Graph on Build', () => {
  beforeAll(async () => {
    await nextBuild(appDir, ['--experimental-page', '/'])
  })

  describe('Module collection', () => {
    it('should build a chunk graph file', () => {
      const cgf = join(__dirname, `/../.next/${CHUNK_GRAPH_MANIFEST}`)
      expect(existsSync(cgf)).toBeTruthy()
      expect(
        JSON.parse(readFileSync(cgf, 'utf8')).pages['/'].includes(
          relative(appDir, resolve(__dirname, '..', 'pages', 'index.js'))
        )
      )
    })
  })
})
