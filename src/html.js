/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { Fragment } from 'react'
import PT from 'prop-types'
import { ga } from '../config'

export default function HTML(props) {
  const {
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    body,
    postBodyComponents,
  } = props

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>

      {/* Global site tag (gtag.js) - Google Analytics */}
      {ga ? (
        <Fragment>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config', '${ga}');
            `,
            }}
          />
        </Fragment>
      ) : null}
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PT.object,
  headComponents: PT.array,
  bodyAttributes: PT.object,
  preBodyComponents: PT.array,
  body: PT.string,
  postBodyComponents: PT.array,
}
