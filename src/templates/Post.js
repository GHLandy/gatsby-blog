import React from 'react'
import PT from 'prop-types'
import { graphql } from 'gatsby'
import { Divider } from 'antd'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const propTypes = {
  data: PT.shape({ markdownRemark: PT.object.isRequired }).isRequired,
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      html
    }
  }
`

const Post = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={['gatsby', 'application', 'react']}
      />
      <div className="site-post">
        <h1 className="post-title">{post.frontmatter.title}</h1>

        <div className="post-date">Posted on: {post.frontmatter.date}</div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <Divider style={{ fontWeight: 'lighter', fontStyle: 'italic' }}>
          End
        </Divider>
      </div>
    </Layout>
  )
}

Post.propTypes = propTypes

export default Post
