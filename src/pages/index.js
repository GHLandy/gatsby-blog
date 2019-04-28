import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Image from '../components/Image';
import SEO from '../components/SEO';

export const query = graphql`
  query {
    allMarkdownRemark {
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
`;

const IndexPage = props => {
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = props;

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>
      {posts.map(post => (
        <div className="posts" key={post.node.id}>
          <h1>
            <Link to={post.node.frontmatter.path}>
              {post.node.frontmatter.title}
            </Link>
          </h1>
          <div>{post.node.excerpt}</div>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
