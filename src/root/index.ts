import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'https://api.root.co.za/v1',
})

const account = async (context) => {
  try {
    console.log('context', context.event.headers)
    api.setHeader('authorization', 'Basic ' + Buffer.from('test_key_tYILz1640w9q5n5kNQUZ:').toString('base64'));
    const account = await api.get('/account');
    console.log(account);
    return account.data
  } catch (error) {
    throw error
  }
  
}

export default {
  account
}