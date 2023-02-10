import React from 'react'

import { LayoutProps } from '@pankod/refine-core'
import { AntdLayout, Grid } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'
import { ContentDisplay } from 'components/ContentDisplay'
import { CityDropdown } from 'components/CityDropdown'
import styles from './Layout.module.scss'

export const Layout: React.FC<LayoutProps> = ({ children, Sider, Header, Footer, OffLayoutArea }) => {
  const breakpoint = Grid.useBreakpoint()
  const { t } = useTranslation()

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
            <CityDropdown />
            <ContentDisplay title={t('destinationAddress')} text='Arsuz Mah. Ela Apt. No:5 Arsuz/Hatay' />
            {children}
          </div>
          {OffLayoutArea && <OffLayoutArea />}
        </AntdLayout.Content>
        {Footer && <Footer />}
      </AntdLayout>
    </AntdLayout>
  )
}
