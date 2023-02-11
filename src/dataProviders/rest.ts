import stringify from 'query-string'
import { DataProvider } from '@pankod/refine-core'
import { http } from 'services/http'
import { generateFilter } from 'utils/generateFilter'
import { generateSort } from 'utils/generateSort'

export const dataProvider = (): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => ({
  getList: async ({ resource, hasPagination = true, pagination = { current: 1, pageSize: 10 }, filters, sort }) => {
    const url = `${resource}`

    const { current = 1, pageSize = 10 } = pagination ?? {}

    const queryFilters = generateFilter(filters)

    const query: {
      _start?: number
      _end?: number
      _sort?: string
      _order?: string
    } = hasPagination
      ? {
          _start: (current - 1) * pageSize,
          _end: current * pageSize
        }
      : {}

    const generatedSort = generateSort(sort)
    if (generatedSort) {
      const { _sort, _order } = generatedSort
      query._sort = _sort.join(',')
      query._order = _order.join(',')
    }

    let finalData = []
    if (resource === 'trip' && Object.keys(queryFilters).length) {
      const { data } = await http.post(`${url}/filter`, {
        ...JSON.parse(JSON.stringify(queryFilters).replace('_gte', '').replace('_lte', ''))
      })
      finalData = data
    } else {
      const { data } = await http.get(`${url}?${stringify.stringify(query)}&${stringify.stringify(queryFilters)}`)
      finalData = data
    }

    // const total = +headers['x-total-count']
    const total = finalData.length

    return {
      data: finalData,
      total
    }
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await http.get(`${resource}?${stringify.stringify({ id: ids })}`)

    return {
      data
    }
  },

  create: async ({ resource, variables }) => {
    const url = `${resource}`

    const { data } = await http.post(url, variables)

    return {
      data
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${resource}/${id}`

    const { data } = await http.patch(url, variables)

    return {
      data
    }
  },

  getOne: async ({ resource, id }) => {
    const url = `${resource}/${id}`

    const { data } = await http.get(url)

    return {
      data
    }
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${resource}/${id}`

    const { data } = await http.delete(url, {
      data: variables
    })

    return {
      data
    }
  },

  getApiUrl: () => process.env.REACT_APP_BACKEND_URL,

  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`

    if (sort) {
      const generatedSort = generateSort(sort)
      if (generatedSort) {
        const { _sort, _order } = generatedSort
        const sortQuery = {
          _sort: _sort.join(','),
          _order: _order.join(',')
        }
        requestUrl = `${requestUrl}&${stringify.stringify(sortQuery)}`
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters)
      requestUrl = `${requestUrl}&${stringify.stringify(filterQuery)}`
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify.stringify(query)}`
    }

    if (headers) {
      // @ts-ignore-next-line
      http.defaults.headers = {
        ...http.defaults.headers,
        ...headers
      }
    }

    let axiosResponse
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await http[method](url, payload)
        break
      case 'delete':
        axiosResponse = await http.delete(url, {
          data: payload
        })
        break
      default:
        axiosResponse = await http.get(requestUrl)
        break
    }

    const { data } = axiosResponse

    return Promise.resolve({ data })
  }
})
