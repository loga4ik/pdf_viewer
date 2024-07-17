import { NextComponentType } from "next";
import React, { FC } from "react";
type props = {
  Component: NextComponentType;
};
const _app: React.FC<props> = ({ Component }) => {
  return <Component />;
};

export default _app;
