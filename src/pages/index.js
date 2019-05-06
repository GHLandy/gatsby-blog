import React from 'react'
import { Link, graphql } from 'gatsby'
import { Divider } from 'antd'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
          excerpt
        }
      }
    }
  }
`

const IndexPage = props => {
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = props

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />

      <div className="site-posts">
        {posts.map(post => (
          <div className="post-item" key={post.node.id}>
            <h1>
              <Link to={post.node.frontmatter.path}>
                {post.node.frontmatter.title}
              </Link>
            </h1>
            <div>{post.node.excerpt}</div>
          </div>
        ))}

        <Divider />
      </div>
    </Layout>
  )
}

export default IndexPage
