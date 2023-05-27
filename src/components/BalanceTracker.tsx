import { useState, useEffect } from "react";
import { Transaction, fetchTransactions } from "../services/apiService";
import styles from "./BalanceTracker.module.css";

const BalanceTracker = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [monthlyBalances, setMonthlyBalances] = useState<number[]>([]);
	const [cumulativeBalance, setCumulativeBalance] = useState(0);
	const [error, setError] = useState("");

	const fetchData = async () => {
		try {
			const transactions = await fetchTransactions();
			setTransactions(transactions);
		} catch (error) {
			setError("Failed to fetch transactions");
		}
	};

	useEffect(() => {
		const calculateMonthlyBalances = () => {
			const currentMonth = new Date().getMonth();
			const currentYear = new Date().getFullYear();

			// Create an array of size number of months passed in the current year and fill it with 0s
			const monthlyBalances = Array(currentMonth + 1).fill(0);

			transactions.forEach((transaction) => {
				const transactionDate = new Date(transaction.date);
				const transactionMonth = transactionDate.getMonth();
				const transactionYear = transactionDate.getFullYear();
				const transactionAmount =
					transaction.type === "credit"
						? transaction.amount
						: -transaction.amount;

				// Add to monthly balances if the month in the transaction is less than the current month and the year is the same
				if (
					transactionYear === currentYear &&
					transactionMonth <= currentMonth
				) {
					monthlyBalances[transactionMonth] += transactionAmount;
				}
			});

			setMonthlyBalances(monthlyBalances);
		};

		const calculateCumulativeBalance = () => {
			let balance = 0;
			transactions.forEach((transaction) => {
				balance +=
					transaction.type === "credit"
						? transaction.amount
						: -transaction.amount;
			});
			setCumulativeBalance(balance);
		};

		fetchData()
			.then(() => {
				calculateMonthlyBalances();
				calculateCumulativeBalance();
			})
			.catch((err) => {
				setError(err);
			});
	}, [transactions]);

	// Convert month index to month name
	const getMonthName = (month: number) => {
		return new Date(0, month).toLocaleString("en-US", { month: "long" });
	};

	return (
		<div className={styles.container}>
			<h3>Balance Summary</h3>
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.monthlyBalances}>
				<table>
					<thead>
						<tr>
							<th>Month</th>
							<th className={styles.amountColumn}>Balance</th>
						</tr>
					</thead>
					<tbody>
						{monthlyBalances.map((balance, index) => (
							<tr key={getMonthName(index)}>
								<td>{getMonthName(index)}</td>
								<td className={styles.amountColumn}>${balance.toFixed(2)}</td>
							</tr>
						))}
						<tr>
							<td>
								<strong>Cumulative Balance</strong>
							</td>
							<td className={styles.amountColumn}>
								<strong>${cumulativeBalance.toFixed(2)}</strong>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BalanceTracker;
