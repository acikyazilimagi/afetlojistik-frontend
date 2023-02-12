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
import { useTitle, CanAccess, ITreeMenu, useRouterContext, useMenu, useRefineContext } from '@pankod/refine-core'
import { useTranslation } from 'react-i18next'

import i18n from 'i18n'
import { Title as DefaultTitle } from '../Title'

import styles from './Sider.module.scss'

const { UnorderedListOutlined, DashboardOutlined, BarsOutlined } = Icons
const { SubMenu } = Menu

const getPageTranslationKey = (name: string) => {
  switch (name) {
    case 'trip':
      return i18n.t('pageTitles.trips')
    case 'user':
      return i18n.t('pageTitles.users')
    default:
      return ''
  }
}

export const Sider: typeof DefaultSider = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const { Link } = useRouterContext()
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
            className={`${isSelected && 'font-bold'}`}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route}>{t(getPageTranslationKey(name))}</Link>
            {!collapsed && isSelected && <div className='ant-menu-tree-arrow' />}
          </Menu.Item>
        </CanAccess>
      )
    })

  const dashboard = hasDashboard ? (
    <Menu.Item key='dashboard' className={`${selectedKey === '/' && 'font-bold'}`} icon={<DashboardOutlined />}>
      <Link to='/'>{t('dashboard.title')}</Link>
      {!collapsed && selectedKey === '/' && <div className='ant-menu-tree-arrow' />}
    </Menu.Item>
  ) : null

  const items = renderTreeView(menuItems, selectedKey)

  const renderSider = () => (
    <>
      {dashboard}
      {items}
    </>
  )

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
          <AntdLayout.Sider className={styles.antdLayoutSider}>
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
