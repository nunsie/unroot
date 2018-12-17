import { create, ApiResponse } from 'apisauce'

interface Account {
  user_id: string
  email: string
  bank_number: string
  first_name: string
  last_name: string
  cellphone: string
  app_totp: boolean
  balance: number
  address_line_1: string
  address_line_2: string
  city: string
  area_code: string
  created_at: Date
}

interface Transaction {
  transaction_id: string
  card_id: string
  amount: number
  method: string
  type: string
  description: string
  created_at: Date
  tag_ids: string
  category_id: string
  contact_id: string
  merchant: object

}

interface Card {
  card_id: string
  name: string
  last_4_digits: string
  virtual: boolean
  state: string
  created_at: Date
  transaction_limit: number
  daily_limit: number
  monthly_limit: number
  tag_id: string
  sensitive: object
}

interface Category {
  category_id: string
  name: string
  icon: string
  theme: string
  soft_limit: number
  created_at: Date
}

interface Contact {
  contact_id: string
  name: string
  bank_number: string
  bank_name: string
  email: string
  created_at: Date
}

interface Tag {
  tag_id: string
  name: string
  tag_limit: number
  created_at: Date
}

// define the api
const api = create({
  baseURL: 'https://api.root.co.za/v1',
})

const auth = (context) => {
  const authorization = context.event.headers.authorization || context.event.headers.Authorization
  console.log(authorization)
  if (authorization)
    api.setHeader('authorization', authorization);
}

async function account (context): Promise<Account> {
  try {
    auth(context);
    const account: ApiResponse<any> = await api.get('/account');
    return account.data;
  } catch (error) {
    throw error;
  }
}

async function transactions (context): Promise<[Transaction]> {
  try {
    auth(context);
    const transactions: ApiResponse<any>  = await api.get('/transactions');
    console.log(transactions)
    return transactions.data;
  } catch (error) {
    throw error;
  }
}

async function transaction (context, { id }): Promise<Transaction> {
  try {
    auth(context);
    const user = await account(context)
    const transaction: ApiResponse<any>  = await api.get('/transactions/' + id);
    return transaction.data;
} catch (error) {
    throw error;
  }
}

async function transactionsMeta (object) {
  try {
    if (object.card_id) {
      // card
      const transactions: ApiResponse<any>  = await api.get('/cards/' + object.card_id + '/transactions');
      object.transactions = (typeof transactions.data === 'object' ? [transactions.data] : transactions.data)
    }
    if (object.category_id) {
      // category
      const transactions: ApiResponse<any>  = await api.get('/categories/' + object.category_id + '/transactions');
      object.transactions = transactions.data
    }
    if (object.contact_id) {
      // contact
      const transactions: ApiResponse<any>  = await api.get('/contacts/' + object.contacts_id + '/transactions');
      if (!transactions.data.error) {
        object.transactions = transactions.data
      }
    }
    if (object.tag_id) {
      // tag
      const transactions: ApiResponse<any>  = await api.get('/tags/' + object.tags_id + '/transactions');
      console.log(transactions.data)
      if (!transactions.data.error) {
        object.transactions = transactions.data
      }
    }
    return object
  } catch (error) {
    throw error
  }
}

async function cards (context): Promise<[Card]> {
  try {
    auth(context);
    const cards: ApiResponse<any>  = await api.get('/cards');
    return cards.data.map(transactionsMeta);
  } catch (error) {
    throw error;
  }
}

async function card (context, { id }): Promise<Card> {
  try {
    auth(context);
    const card: ApiResponse<any>  = await api.get('/cards/' + id);
    return transactionsMeta(card.data);
  } catch (error) {
    throw error;
  }
}

async function createCard(context, { name, secure_code }): Promise<Card> {
  try {
    auth(context)
    const card: ApiResponse<any>  = await api.post('/cards/create-virtual', { name, secure_code })
    return transactionsMeta(card.data);
  } catch (error) {
    throw error
  }
}

async function categories (context): Promise<[Category]> {
  try {
    auth(context);
    const categories: ApiResponse<any>  = await api.get('/categories');
    return categories.data.map(transactionsMeta);
  } catch (error) {
    throw error;
  }
}

async function category (context, { id }): Promise<Category> {
  try {
    auth(context);
    const category: ApiResponse<any>  = await api.get('/categories/' + id);
    return transactionsMeta(category.data);
  } catch (error) {
    throw error;
  }
}

async function contacts (context): Promise<[Contact]> {
  try {
    auth(context);
    const contacts: ApiResponse<any>  = await api.get('/contacts');
    return contacts.data.map(transactionsMeta);
  } catch (error) {
    throw error;
  }
}

async function contact (context, { id }): Promise<Contact> {
  try {
    auth(context);
    const contact: ApiResponse<any>  = await api.get('/contacts/' + id);
    return transactionsMeta(contact.data);
  } catch (error) {
    throw error;
  }
}

async function tags (context): Promise<[Tag]> {
  try {
    auth(context);
    const tags: ApiResponse<any>  = await api.get('/tags');
    return tags.data.map(transactionsMeta);
  } catch (error) {
    throw error;
  }
}

async function tag (context, { id }): Promise<Tag> {
  try {
    auth(context);
    const tag: ApiResponse<any>  = await api.get('/tags/' + id);
    return transactionsMeta(tag.data);
  } catch (error) {
    throw error;
  }
}

export default {
  account,
  transactions,
  transaction,
  cards,
  card,
  categories,
  category,
  contacts,
  contact,
  tags,
  tag,
  createCard,
}