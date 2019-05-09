/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { resolve } = require('path')

module.exports = {
  createPages({ actions, graphql }) {
    const { createPage } = actions
    const postTemplate = resolve('src/templates/Post.js')

    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `)
      .then(res => {
        if (res.errors) {
          return Promise.reject(res.errors)
        }

        const {
          data: {
            allMarkdownRemark: { edges: posts },
          },
        } = res

        return posts.map(post =>
          createPage({
            path: post.node.frontmatter.path,
            component: postTemplate,
            context: {},
          })
        )
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}
