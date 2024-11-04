import { useState } from 'react'

import { Layout, Button, Menu, theme } from 'antd'
const { Header, Sider, Content, Footer } = Layout
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  minHeight: 120,
  // lineHeight: '120px',
  // color: '#fff',
  // backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  height: 'calc(100vh - 64px)',
  width: '200px',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
  height: 64,
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
};
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
function Home() {
  const listItems = products.map(product => <li key={product.id}>{product.title} </li>);
  const [count, setCount] = useState(0)
  function handleClick() {
    setCount(count + 1)
  }
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider style={siderStyle}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
                },
              ]}
            />
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <h1>{user.name}</h1>
              <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                  width: user.imageSize,
                  height: user.imageSize
                }}
              />
              <ul>{listItems}</ul>
              <div>
                独立的组件
                <MyButton />
                <MyButton />
              </div>
              <div>
                共享数据的组件
                <MyButton2 count={count} onClick={handleClick} />
                <MyButton2 count={count} onClick={handleClick} />
              </div>
            </Content>
            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

function MyButton() {
  const [count, setCount] = useState(0)
  function handleClick() {
    setCount(count + 1)
  }
  return (
    <Button onClick={handleClick}>Click {count} times</Button>
  )
}
type ButtonProps = {
  count: number,
  onClick: () => void
}
function MyButton2({ count, onClick }: ButtonProps) {
  return (
    <Button onClick={onClick}>Click {count} times</Button>
  )
}
export default Home
