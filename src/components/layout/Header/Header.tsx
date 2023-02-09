import { useContext } from 'react'
import { useGetLocale, useSetLocale, useGetIdentity, useIsExistAuthentication, useLogout } from '@pankod/refine-core'
import { AntdLayout, Space, Menu, Button, Icons, Dropdown, Typography, Switch } from '@pankod/refine-antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { ColorModeContext } from 'contexts'
import { SupportedLanguages, supportedLanguages } from 'constants/languageConstants'
import { UserType } from 'types/user'
import styles from './Header.module.scss'

const { DownOutlined } = Icons
const { Text } = Typography

export const Header: React.FC = () => {
  const locale = useGetLocale()
  const changeLanguage = useSetLocale()
  const { data: user }: { data?: UserType } = useGetIdentity()
  const { mode, setMode } = useContext(ColorModeContext)
  const { t } = useTranslation()
  const isExistAuthentication = useIsExistAuthentication()
  const { mutate: mutateLogout } = useLogout()

  const currentLocale = locale()

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {Object.values(supportedLanguages).map((lang) => (
        <Menu.Item key={lang.value} onClick={() => changeLanguage(lang.value)} icon={lang.flag}>
          {lang.label}
        </Menu.Item>
      ))}
    </Menu>
  )

  const logout = isExistAuthentication && (
    <Menu.Item key='logout' onClick={() => mutateLogout()} icon={<LogoutOutlined />}>
      {t('logout')}
    </Menu.Item>
  )

  const logoutMenu = <Menu>{logout}</Menu>

  return (
    <AntdLayout.Header className={styles.header}>
      <Switch
        checkedChildren='🌛'
        unCheckedChildren='🔆'
        onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
        defaultChecked={mode === 'dark'}
      />
      <Dropdown overlay={menu}>
        <Button type='link'>
          <Space className='white-text'>
            {supportedLanguages[currentLocale as SupportedLanguages].flag}
            {supportedLanguages[currentLocale as SupportedLanguages].label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <div className='flex flex-center ml-8'>
        {user?.name && (
          <Dropdown overlay={logoutMenu} placement='bottomRight'>
            <Text ellipsis strong className='white-text pointer'>
              {user.name + ' ' + user.surname}
            </Text>
          </Dropdown>
        )}
      </div>
    </AntdLayout.Header>
  )
}
