import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  // console.log(props);
  return (
    <Menu mode={props.mode} defaultOpenKeys={['sub']}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
