import httpClient from './axiosInstance'

const END_POINT = '/cards'

const getCards = ({
  limit,
  name,
  type
} = {}) => httpClient({
  methods: 'get',
  url: END_POINT,
  params: {
    ...(limit && { limit }),
    ...(name && { name }),
    ...(type && { type })
  }
})

export {
  getCards
}