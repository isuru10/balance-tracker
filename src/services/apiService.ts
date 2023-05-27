export interface Transaction {
    amount: number;
    date: string;
    type: 'credit' | 'debit';
  }

  const API_ENDPOINT_URL = "https://www.example.com/api"
  
  export const fetchTransactions = (): Promise<Transaction[]> => {
    return new Promise<Transaction[]>((resolve, reject) => {
      fetch(API_ENDPOINT_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch transactions');
          }
          return response.json();
        })
        .then((data) => {
          // Assuming the API response has an array of transactions
          // with fields 'amount', 'date' and 'type'
          const transactions: Transaction[] = data.transactions;
          resolve(transactions);
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
          reject(error);
        });
    });
  
  };