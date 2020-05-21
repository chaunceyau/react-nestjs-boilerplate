import React from 'react'

interface ModalProps {
  children: React.ReactNode
}

export function Modal(props: ModalProps) {
  return (
    <div className="absolute top-0 left-0 min-h-screen w-full flex justify-center items-center modal-overlay">
      {props.children}
    </div>
  )
}
