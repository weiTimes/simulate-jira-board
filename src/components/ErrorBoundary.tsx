import React from "react";

type FalbackRender = (props: { error: Error | null }) => React.ReactElement;

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FalbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    // 返回错误状态，用于渲染错误界面
    return { error };
  }

  //   componentDidCatch(error, errorInfo) {
  //     // 上传错误信息
  //   }

  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;

    if (error) {
      return fallbackRender({ error });
    }

    return children;
  }
}

export default ErrorBoundary;
