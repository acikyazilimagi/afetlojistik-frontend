import { Typography } from 'antd'

type IconTitleProps = {
  icon?: JSX.Element
  label: string
}

export const IconTitle: React.FC<IconTitleProps> = ({ icon, label }) => (
  <Typography.Title className='flex flex-center-align gap-8 text-gray' level={4}>
    {icon}
    {label}
  </Typography.Title>
)
