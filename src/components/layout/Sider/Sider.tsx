import React, { useState } from 'react'
import {
  AntdLayout,
  ConfigProvider,
  Menu,
  Grid,
  Icons,
  Drawer,
  Sider as DefaultSider,
  Button
} from '@pankod/refine-antd'
import {
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useRouterContext,
  useMenu,
  useRefineContext
} from '@pankod/refine-core'
import { useTranslation } from 'react-i18next'

import { Title as DefaultTitle } from '../Title'

import styles from './Sider.module.scss'

const { UnorderedListOutlined, LogoutOutlined, DashboardOutlined, BarsOutlined } = Icons
const { SubMenu } = Menu

export const Sider: typeof DefaultSider = ({ render }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const isExistAuthentication = useIsExistAuthentication()
  const { Link } = useRouterContext()
  const { mutate: mutateLogout } = useLogout()
  const Title = useTitle()
  const { t } = useTranslation()
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu()
  const breakpoint = Grid.useBreakpoint()
  const { hasDashboard } = useRefineContext()

  const isMobile = typeof breakpoint.lg === 'undefined' ? false : !breakpoint.lg

  const RenderToTitle = Title ?? DefaultTitle

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) =>
    tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item

      if (children.length > 0) {
        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action='list'
            params={{
              resource: item
            }}
          >
            <SubMenu key={route} icon={icon ?? <UnorderedListOutlined />} title={label}>
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        )
      }
      const isSelected = route === selectedKey
      const isRoute = !(parentName !== undefined && children.length === 0)
      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action='list'
          params={{
            resource: item
          }}
        >
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? 'bold' : 'normal'
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && <div className='ant-menu-tree-arrow' />}
          </Menu.Item>
        </CanAccess>
      )
    })

  const logout = isExistAuthentication && (
    <Menu.Item key='logout' onClick={() => mutateLogout()} icon={<LogoutOutlined />}>
      {t('logout')}
    </Menu.Item>
  )

  const dashboard = hasDashboard ? (
    <Menu.Item
      key='dashboard'
      style={{
        fontWeight: selectedKey === '/' ? 'bold' : 'normal'
      }}
      icon={<DashboardOutlined />}
    >
      <Link to='/'>{t('dashboard.title')}</Link>
      {!collapsed && selectedKey === '/' && <div className='ant-menu-tree-arrow' />}
    </Menu.Item>
  ) : null

  const items = renderTreeView(menuItems, selectedKey)

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed
      })
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    )
  }

  const renderMenu = () => (
    <Menu
      selectedKeys={[selectedKey]}
      defaultOpenKeys={defaultOpenKeys}
      mode='inline'
      onClick={() => {
        setDrawerOpen(false)
        if (!breakpoint.lg) {
          setCollapsed(true)
        }
      }}
    >
      {renderSider()}
    </Menu>
  )

  const renderDrawerSider = () => (
    <>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement='left'
        closable={false}
        width={200}
        bodyStyle={{
          padding: 0
        }}
        maskClosable={true}
      >
        <AntdLayout>
          <AntdLayout.Sider style={{ height: '100vh', overflow: 'hidden' }}>
            <RenderToTitle collapsed={false} />
            {renderMenu()}
          </AntdLayout.Sider>
        </AntdLayout>
      </Drawer>
      <Button
        className={styles.drawerButtonStyles}
        size='large'
        onClick={() => setDrawerOpen(true)}
        icon={<BarsOutlined />}
      />
    </>
  )

  const renderContent = () => {
    if (isMobile) {
      return renderDrawerSider()
    }

    return (
      <AntdLayout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        collapsedWidth={80}
        breakpoint='lg'
      >
        <RenderToTitle collapsed={collapsed} />
        {renderMenu()}
      </AntdLayout.Sider>
    )
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorItemBg: 'transparent',
            colorItemText: '#fff',
            colorItemTextSelected: '#fff',
            colorItemBgSelected: 'transparent',
            colorItemTextHover: '#fff'
          }
        }
      }}
    >
      {renderContent()}
    </ConfigProvider>
  )
}
