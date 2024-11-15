import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingScreen.module.css'
const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <h1>Loading</h1>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default LoadingScreen;
