import { Spin } from "antd";
import React from "react";
import { FullPage } from "src/style/common";

const FullPageLoading: React.FC = () => {
  return (
    <FullPage>
      <Spin spinning></Spin>
    </FullPage>
  );
};

export default FullPageLoading;
