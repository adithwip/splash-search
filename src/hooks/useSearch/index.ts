import { useQuery, useInfiniteQuery } from 'react-query'
import { createApi } from 'unsplash-js'

const DEFAULT_QUERY = 'cat'

const unsplash = createApi({
  // TODO: use env
  accessKey: 'ItYmaf7SwniU7gw9xOk_wyRimeQmuK6DoYaNj8je5xk'
})


type FetchParams = {
  query: string,
  page?: number,
}

const fetchUnsplashApi = async ({ query = DEFAULT_QUERY, page }: FetchParams) => {
  const res = unsplash.search
    .getPhotos({ query, page, perPage: 10, orderBy: 'relevant' })
    .then((result) => {
      return result
    })
    .catch((e) => {
      throw new Error(e)
    })

  return res
}

/**
 * Use this hooks if no infinite/pagination functionality is needed
 */
export const useSearch = (query: string) => {
  return useQuery(
    ['search', query],
    () => fetchUnsplashApi({ query }),
    { staleTime: 24 * 60 * 60 * 1000 }
  )
}

/**
 * Optional to the assignment
 * but i did it anyway
 */
export const useInfiniteSearch = (query: string, page: number) => {
  return useInfiniteQuery(
    ['search', query],
    ({ pageParam = 1 }) => fetchUnsplashApi({ query, page: pageParam }),
    {
      getNextPageParam: () => page + 1,
      staleTime: 24 * 60 * 60 * 1000 // One day cache stateTime
    }
  )
}