import { createContext, useContext } from 'react'
import { useAsync } from '../hooks/useAsync.js'
import { getSettings } from '../services/catalog.js'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const { data } = useAsync(getSettings, [])
  return <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext) ?? { announcements: [], social: {} }
