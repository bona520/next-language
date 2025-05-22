'use client'

import { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeSetting = Theme | 'system'

interface ThemeContextProps {
    theme: Theme
    setting: ThemeSetting
    toggleTheme: () => void
    setThemeSetting: (setting: ThemeSetting) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const getSystemTheme = (): Theme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const envDefault = process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeSetting || 'system'
    const [setting, setSetting] = useState<ThemeSetting>(envDefault)
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const saved = localStorage.getItem('theme-setting') as ThemeSetting | null
        const initial = saved || envDefault
        setSetting(initial)
    }, [envDefault])

    useEffect(() => {
        let appliedTheme: Theme = 'light'

        if (setting === 'system') {
            appliedTheme = getSystemTheme()
        } else {
            appliedTheme = setting
        }

        setTheme(appliedTheme)
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(appliedTheme)
        localStorage.setItem('theme-setting', setting)
    }, [setting])

    const toggleTheme = () => {
        const nextSetting =
            setting === 'light' ? 'dark' : setting === 'dark' ? 'system' : 'light'
        setSetting(nextSetting)
    }

    return (
        <ThemeContext.Provider value={{ theme, setting, toggleTheme, setThemeSetting: setSetting }}>
            {children}
        </ThemeContext.Provider>
    )
}
