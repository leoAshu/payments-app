import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { filterAtom } from '../store/atoms'

const Search = () => {
  const [debouncedFilter, setDebouncedFilter] = useRecoilState(filterAtom)
  const [filter, setFilter] = useState(debouncedFilter)

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedFilter(filter)
    }, 500)

    return () => clearTimeout(timeOutId)
  }, [filter])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 flex items-center pl-3">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <input
        type="search"
        className="w-full p-3.5 pl-10 text-sm text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-md bg-gray-50 outline-none focus:border-black"
        placeholder="Search users"
        value={filter}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default Search
