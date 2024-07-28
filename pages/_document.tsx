import fs from 'node:fs'

import * as cheerio from 'cheerio'
import parse from 'html-react-parser'
import { Html, Head, Main, NextScript } from 'next/document'

export const data = fs.readFileSync('./public/web/viewer.html', 'utf8')

const $ = cheerio.load(data)

const scriptHtml = $.html($('script'))
const linkHtml = $.html($('link'))

const bodyHtml = $.html('body').replace('selected="selected"', 'defaultValue="selected"')

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {parse(scriptHtml)}
        {parse(linkHtml)}
      </Head>
      {parse(bodyHtml)}
      <Main />
      <NextScript />
    </Html>
  )
}