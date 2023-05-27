# Balance Tracker

A simple React application that displays the monthly balances and cumulative balance of an account based on its transactions.

## Setup

1. Clone the repository

```shell
git clone https://github.com/isuru10/balance-tracker.git
```

2. Navigate to the project directory

```shell
cd balance-tracker
```

3. Install dependencies

```shell
npm install
```

# Usage

1. Enter `API_ENDPOINT_URL` in `apiService.ts` file. The API should provide bank transactions in following format

```typescript
interface Transaction {
	amount: number;
	date: string;
	type: "credit" | "debit";
}
```

2. Start the development server

```shell
npm start
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

# Testability

To improve testablity, the API calls are separated to its own service. Also, the helper functions in the Balance tracker are well segregated to help in unit testing.

# Deployment

Any of the following methods can be used to deploy the app to a server

- Push the repository to the `gh-pages` branch of your repository. The app will be deployed at [https://isuru10.github.io/balance-tracker](https://isuru10.github.io/balance-tracker)

- Connect the repository to `Netlify` or `Vercel` and configure it to deploy the app from the `build` directory

- Deploy on AWS S3
  - Create an AWS S3 bucket
  - Upload the `build` files to S3
  - Configure bucket permissions to allow public read access
  - Configure the bucket for web hosting by setting `index.html` as the index document
