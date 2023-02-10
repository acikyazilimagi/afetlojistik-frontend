import { useState, useEffect, useCallback } from 'react'

type UseModalProps = {
  isModalOpen?: boolean
}

export const useModal = ({ isModalOpen }: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(!!isModalOpen)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    setIsOpen(!!isModalOpen)
  }, [isModalOpen])
  return [isOpen, openModal, closeModal] as [boolean, () => void, () => void]
}
