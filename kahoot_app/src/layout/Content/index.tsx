/* eslint-disable array-callback-return */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.css";

interface LayoutContentProps {
  content: {
    jsx: (props: any) => JSX.Element;
    route: string;
    title: string;
    icon: any;
  }[];
}

const LayoutContent: React.FC<LayoutContentProps> = (props) => {
  const { content } = props;
  const { Content } = Layout;

  return (
    <Content style={{ margin: 16, minHeight: "calc(100vh - 96px)" }}>
      <div className={styles.contentBackground}>
        <Switch>
          {content.map((item) => {
            return (
              <Route
                key={item.route}
                exact
                path={item.route}
                render={(props) => <item.jsx {...props} />}
              ></Route>
            );
          })}
        </Switch>
      </div>
    </Content>
  );
};

export default LayoutContent;
