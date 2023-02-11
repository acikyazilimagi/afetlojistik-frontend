import React from 'react'

import { I18nProvider, Refine } from '@pankod/refine-core'
import { notificationProvider, ReadyPage, ErrorComponent } from '@pankod/refine-antd'
import '@pankod/refine-antd/dist/reset.css'
import 'scss/style.scss'

import routerProvider from '@pankod/refine-react-router-v6'
import { useTranslation } from 'react-i18next'
import { ColorModeContextProvider } from 'contexts'
import { Title, Header, Sider, Footer, Layout, OffLayoutArea } from 'components/layout'
import { Login } from 'pages/Login'
import { dataProvider } from 'dataProviders'
import { TripCreate, TripList, Detail, Edit } from 'pages/Trip'
import { authProvider } from './authProvider'

function App() {
  const { t, i18n } = useTranslation()

  const i18nProvider: I18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language
  }

  return (
    <ColorModeContextProvider>
      <Refine
        dataProvider={dataProvider('https://test.afetlojistik.com/api')}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: 'trip',
            list: TripList,
            edit: Edit,
            show: Detail,
            create: TripCreate
          }
        ]}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        Layout={Layout}
        OffLayoutArea={OffLayoutArea}
        routerProvider={routerProvider}
        authProvider={authProvider}
        LoginPage={Login}
        i18nProvider={i18nProvider}
      />
    </ColorModeContextProvider>
  )
}

export default App
