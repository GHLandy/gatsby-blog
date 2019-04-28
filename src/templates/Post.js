import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export const query = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
      html
    }
  }
`;

const Post = props => {
  const {
    data: { markdownRemark: post },
  } = props;
  console.log('post', post);

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={['gatsby', 'application', 'react']}
      />
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
};

export default Post;
