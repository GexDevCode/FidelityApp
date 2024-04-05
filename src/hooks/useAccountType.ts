import { useEffect, useState } from 'react'

type Permissions = "USER" | "ADMIN" | "MANAGER"

export const useAccountType = (): string => {
  const [permission, setPermission] = useState<Permissions>("USER")

  useEffect(() => {
    setPermission("USER");
  }, [permission])

  return permission;
}