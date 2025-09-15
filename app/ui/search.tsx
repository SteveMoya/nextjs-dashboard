'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const WAIT_BETWEEN_CHANGE = 500

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()


  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }, WAIT_BETWEEN_CHANGE)

  return (
    <div className="relative flex flex-1 flex-shrink-0 " >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        placeholder={placeholder}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-400 dark:peer-focus:text-white" />
    </div>
  );
}
