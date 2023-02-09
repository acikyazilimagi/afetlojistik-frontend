import { useContext } from 'react'
import { useGetLocale, useSetLocale, useGetIdentity } from '@pankod/refine-core'
import { AntdLayout, Space, Menu, Button, Icons, Dropdown, Avatar, Typography, Switch } from '@pankod/refine-antd'
import { ColorModeContext } from 'contexts'
import { SupportedLanguages, supportedLanguages } from 'constants/languageConstants'

import styles from './Header.module.scss'

const { DownOutlined } = Icons
const { Text } = Typography

export const Header: React.FC = () => {
  const locale = useGetLocale()
  const changeLanguage = useSetLocale()
  const { data: user } = useGetIdentity()
  const { mode, setMode } = useContext(ColorModeContext)

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
          <Space>
            {supportedLanguages[currentLocale as SupportedLanguages].flag}
            {supportedLanguages[currentLocale as SupportedLanguages].label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Space className='ml-8'>
        {user?.name && (
          <Text ellipsis strong>
            {user.name}
          </Text>
        )}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </AntdLayout.Header>
  )
}
