import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.css";

interface LayoutHeaderProps {
  content: {
    jsx: (props: any) => JSX.Element;
    route: string;
    title: string;
    icon: any;
  }[];
}

const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const { content } = props;
  const { Header } = Layout;

  return (
    <Header className={styles.header}>
      <Switch>
        {content.map((item) => (
          <Route key={item.route} exact path={item.route}>
            <span>
              <item.icon />
              &nbsp;&nbsp;{item.title}
            </span>
          </Route>
        ))}
      </Switch>
    </Header>
  );
};

export default LayoutHeader;
