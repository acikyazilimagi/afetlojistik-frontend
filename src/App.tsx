import React from 'react'

import { I18nProvider, Refine } from '@pankod/refine-core'
import { notificationProvider, ReadyPage, ErrorComponent } from '@pankod/refine-antd'
// eslint-disable-next-line import/no-unresolved
import { AntdInferencer } from '@pankod/refine-inferencer/antd'
import '@pankod/refine-antd/dist/reset.css'
import 'scss/style.scss'

import routerProvider from '@pankod/refine-react-router-v6'
import { useTranslation } from 'react-i18next'
import { Title, Header, Sider, Footer, Layout, OffLayoutArea } from 'components/layout'
import { dataProvider } from 'dataProviders'
import { TripCreate, TripList, Detail, Edit } from 'pages/Trip'
import { UserCreate, UserList } from 'pages/User'
import { UserEdit } from 'pages/User/Edit'
import { AuthPage } from 'pages/Auth'
import { authProvider } from './authProvider'

function App() {
  const { t, i18n } = useTranslation()

  const i18nProvider: I18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language
  }

  return (
    <Refine
      dataProvider={dataProvider()}
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
        },
        {
          name: 'user',
          list: UserList,
          edit: UserEdit,
          show: AntdInferencer,
          create: UserCreate
        }
      ]}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/login',
            element: <AuthPage type='login' />
          },
          {
            path: '/register',
            element: <AuthPage type='register' />
          }
        ]
      }}
      LoginPage={AuthPage}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    />
  )
}

export default App
