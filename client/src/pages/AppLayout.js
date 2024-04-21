import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Layout, Menu, theme, Button } from "antd";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/localStorage";
const { Header, Content } = Layout;

const items = [
  { key: "/dashboard", label: <Link to="dashboard">DashBoard</Link> },
  { key: "/about", label: <Link to="about">About</Link> },
];

export default function AppLayout() {
  const [user, setUser] = useState(getTokenFromLocalStorage());
  const locationPath = useLocation().pathname;
  const navigate = useNavigate();
  const [current, setCurrent] = useState(locationPath);

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    setUser(getTokenFromLocalStorage());
    navigate("about");
  };

  useEffect(() => {
    setUser(getTokenFromLocalStorage());
    setCurrent(locationPath);
  }, [locationPath, user]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {!user ? (
          <Button
            type="primary"
            size="large"
            ghost
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            danger
            ghost
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        )}
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            height: "100vh",
            padding: 96,
            borderRadius: borderRadiusLG,
            display: "flex",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
