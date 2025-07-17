import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

type Props = {
  value: string
  onChange: (value: string) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const DebouncedInput: React.FC<Props> = ({
  onChange,
  value: initialValue,
  debounce = 500,
  ...props
}) => {
  const [serachKeyword, setSearchKeyword] = useState<string>(initialValue)

  useEffect(() => {
    setSearchKeyword(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(serachKeyword)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serachKeyword])

  return (
    <div className='mb-5 flex w-full items-center justify-end gap-4'>
      <Input
        {...props}
        className='w-[200px]'
        value={serachKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  )
}

export default DebouncedInput
