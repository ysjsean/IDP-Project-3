/* eslint-disable array-callback-return */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./index.module.css";

interface SidenavProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isBrokenBreakpoint: boolean;
  setIsBrokenBreakpoint: React.Dispatch<React.SetStateAction<boolean>>;
  content: {
    jsx: (props: any) => JSX.Element;
    route: string;
    title: string;
    icon: any;
  }[];
}

const Sidenav: React.FC<SidenavProps> = (props) => {
  const {
    isCollapsed,
    setIsCollapsed,
    isBrokenBreakpoint,
    setIsBrokenBreakpoint,
    content,
  } = props;
  const { Sider } = Layout;
  const { Item } = Menu;

  let location = useLocation();
  return (
    <Sider
      className={styles.nav}
      breakpoint="xl"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log("Breakpoint broken: ", broken);
        setIsBrokenBreakpoint(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log("On collapsed; ", collapsed, type);
        setIsCollapsed(!isCollapsed);
      }}
      collapsed={isCollapsed}
    >
      <div style={{ textAlign: "center", padding: "6px 0" }}>
        <p style={{ width: "100%", height: "auto", padding: "10px 24px 5px", color: "white", fontSize: 32, display: "inline" }}>KAHOOT</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={[location.pathname]}
      >
        {content.map((item) => {
          return (
            <Item
              key={item.route}
              icon={<item.icon />}
              onClick={() =>
                setIsCollapsed((bool) => (isBrokenBreakpoint ? !bool : bool))
              }
            >
              <Link to={item.route} />
              {item.title}
            </Item>
          );
        })}
      </Menu>
      <img className={styles.quizLogo} src={""} alt="K_Logo" />
      <div
        className={styles.footer}
        style={{ display: isCollapsed ? "none" : "" }}
      >
        © 2020 KAHOOT. All rights reserved.
      </div>
    </Sider>
  );
};

export default Sidenav;
