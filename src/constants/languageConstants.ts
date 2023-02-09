import enGB from 'antd/lib/locale/en_GB'
import trTR from 'antd/lib/locale/tr_TR'

import enGBDP from 'antd/lib/calendar/locale/en_GB'
import trTRDP from 'antd/lib/calendar/locale/tr_TR'

import { PickerLocale } from 'antd/lib/date-picker/generatePicker'
import { Locale } from 'antd/lib/locale-provider'

export enum SupportedLanguages {
  ENGLISH = 'en',
  TURKISH = 'tr'
}

export const antDesignlocales: { [key in SupportedLanguages]: Locale } = {
  en: enGB,
  tr: trTR
}

export const antDesignlocalesDatepicker: {
  [key in SupportedLanguages]: PickerLocale
} = {
  en: enGBDP,
  tr: trTRDP
}

export const supportedLanguages: {
  [key in SupportedLanguages]: {
    value: SupportedLanguages
    label: string
    flag: string
  }
} = {
  [SupportedLanguages.TURKISH]: {
    value: SupportedLanguages.TURKISH,
    label: 'Türkçe',
    flag: '🇹🇷'
  },
  [SupportedLanguages.ENGLISH]: {
    value: SupportedLanguages.ENGLISH,
    label: 'English',
    flag: '🇬🇧'
  }
}
