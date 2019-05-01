import React from 'react';
import { Alert } from 'antd';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <Alert
      style={{ marginTop: '20px' }}
      type="error"
      message="404 NOT FOUND"
      description="You just hit a route that doesn&#39;t exist... the sadness."
      showIcon
    />
  </Layout>
);

export default NotFoundPage;
