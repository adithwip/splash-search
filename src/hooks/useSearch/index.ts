import { useQuery } from 'react-query'
import { createApi } from 'unsplash-js'

const DEFAULT_QUERY = 'cat'

const unsplash = createApi({
  // TODO: use env
  accessKey: 'ItYmaf7SwniU7gw9xOk_wyRimeQmuK6DoYaNj8je5xk'
})


type FetchParams = {
  query: string
}

const fetchUnsplashApi = async ({ query = DEFAULT_QUERY }: FetchParams) => {
  const res = unsplash.search
    .getPhotos({ query, page: 1, perPage: 10, orderBy: 'relevant' })
    .then((result) => {
      return result
    })
    .catch((e) => {
      throw new Error(e)
    })

  return res
}

export const useSearch = (query: string = DEFAULT_QUERY) => {
  return useQuery(
    ['search', query],
    () => fetchUnsplashApi({ query }),
    { staleTime: 24 * 60 * 60 * 1000 }
  )
}