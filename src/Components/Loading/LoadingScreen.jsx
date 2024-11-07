// LoadingScreen.js
import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = ({ loading }) => {
  return loading ? (
    <div className="loading-screen">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : null;
};

export default LoadingScreen;
