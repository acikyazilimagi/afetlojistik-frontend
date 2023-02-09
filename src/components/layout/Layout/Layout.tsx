import React from 'react'

import { LayoutProps } from '@pankod/refine-core'
import { AntdLayout, Grid } from '@pankod/refine-antd'

import styles from './Layout.module.scss'

export const Layout: React.FC<LayoutProps> = ({ children, Sider, Header, Footer, OffLayoutArea }) => {
  const breakpoint = Grid.useBreakpoint()
  return (
    <AntdLayout className={styles.layout}>
      {Sider && <Sider />}
      <AntdLayout>
        {Header && <Header />}
        <AntdLayout.Content>
          <div
            className={styles.layoutContent}
            style={{
              padding: breakpoint.sm ? 24 : 12
            }}
          >
            {children}
          </div>
          {OffLayoutArea && <OffLayoutArea />}
        </AntdLayout.Content>
        {Footer && <Footer />}
      </AntdLayout>
    </AntdLayout>
  )
}
