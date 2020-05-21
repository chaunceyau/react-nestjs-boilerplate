import React from 'react'
import { capitalizeFirstLetter } from '../common/utils'

export function TextInput({
  register,
  title,
  placeholder,
  error, 
  wrapperClasses,
  labelTextColor
}: {
  register: any
  title: string
  placeholder: string
  error: {
      message: string
  } | null,
  wrapperClasses?: string,
  labelTextColor?: string
}) {
  return (
    <div className={wrapperClasses}>
      <label
        className={`block text-sm font-bold mb-2  ${labelTextColor || 'text-gray-700'} `}
        htmlFor={title}
      >
        {capitalizeFirstLetter(title)}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500 mb-2'}`}
        type={title}
        name={title}
        id={title}
        placeholder={placeholder}
        ref={register}
      />
      {
        error?.message && 
            <p className="text-red-500 text-xs italic">{error.message}</p>
      }
    </div>
  )
}
