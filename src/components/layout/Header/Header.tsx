import { useGetLocale, useSetLocale, useGetIdentity, useIsExistAuthentication, useLogout } from '@pankod/refine-core'
import { AntdLayout, Space, Menu, Button, Icons, Dropdown } from '@pankod/refine-antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { SupportedLanguages, supportedLanguages } from 'constants/languageConstants'
import { UserType } from 'types/user'
import styles from './Header.module.scss'

const { DownOutlined } = Icons

export const Header: React.FC = () => {
  const locale = useGetLocale()
  const changeLanguage = useSetLocale()
  const { data: user }: { data?: UserType } = useGetIdentity()
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
      <Dropdown overlay={menu}>
        <Button type='link'>
          <Space>
            {supportedLanguages[currentLocale as SupportedLanguages].flag}
            {supportedLanguages[currentLocale as SupportedLanguages].label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Dropdown overlay={logoutMenu}>
        <Button type='link'>
          <Space>
            {user?.name + ' ' + user?.surname}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </AntdLayout.Header>
  )
}
