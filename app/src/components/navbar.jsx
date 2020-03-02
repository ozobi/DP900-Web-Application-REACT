import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

function NavBar(params) {
  const [activeItem, setActiveItem] = useState("test");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    params.setActiveTab(name);
  };

  const style = {
    // position: "fixed",
    // height: "60px",
    margin: "10px",
    padding: "0",
    zindex: "1",
    overflow: "hidden"
    // backgroundColor: "crimson"
  };
  return (
    <Menu fluid secondary style={style}>
      <Menu.Item>
        <img src="/logo_circle.png" />
      </Menu.Item>
      <Menu.Item
        name="test"
        active={activeItem === "test"}
        onClick={handleItemClick}
      >
        Test
      </Menu.Item>
      <Menu.Item
        name="settings"
        active={activeItem === "settings"}
        onClick={handleItemClick}
      >
        Settings
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
