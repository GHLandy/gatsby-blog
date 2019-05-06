/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, Link, graphql } from 'gatsby'
import { BackTop, Layout, Row, Col } from 'antd'

const { Header, Content, Footer } = Layout

const SiteLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="site-header">
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </Header>

          <Content>
            <Row type="flex" justify="center">
              <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                {children}
              </Col>
            </Row>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Copyright &copy; {new Date().getFullYear()}{' '}
            {data.site.siteMetadata.author}, Built with{' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Footer>
        </Layout>

        <BackTop />
      </Fragment>
    )}
  />
)

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
