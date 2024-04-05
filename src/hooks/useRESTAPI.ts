import { useState } from 'react'

export type Config = {
    HOST: string | undefined
}
export const useRESTAPI = (): Config => {
  const [config, setConfig] = useState({
    HOST: process.env.HOST
  })

  return config;
}