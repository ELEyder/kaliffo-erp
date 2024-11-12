import React from 'react';
import { Spin } from 'antd';
import "@/assets/css/loading/loading.css"
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h1>Loading</h1>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default LoadingScreen;
