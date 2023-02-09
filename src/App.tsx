import React from 'react'

import { I18nProvider, Refine } from '@pankod/refine-core'
import dataProvider, { axiosInstance } from '@pankod/refine-simple-rest'
import { notificationProvider, ReadyPage, ErrorComponent } from '@pankod/refine-antd'
import '@pankod/refine-antd/dist/reset.css'
import 'scss/style.scss'

// eslint-disable-next-line import/no-unresolved
import { AntdInferencer } from '@pankod/refine-inferencer/antd'
import routerProvider from '@pankod/refine-react-router-v6'
import { useTranslation } from 'react-i18next'
import { ColorModeContextProvider } from 'contexts'
import { Title, Header, Sider, Footer, Layout, OffLayoutArea } from 'components/layout'
import { Login } from 'pages/Login'
import { http } from 'utils/axios'
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
        dataProvider={dataProvider(process.env.REACT_APP_BACKEND_URL, http as typeof axiosInstance)}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: 'trip',
            list: AntdInferencer,
            edit: AntdInferencer,
            show: AntdInferencer,
            create: AntdInferencer,
            canDelete: true
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
