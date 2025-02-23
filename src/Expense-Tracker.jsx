import React, { useState, useEffect } from "react";

function ExpenseTracker() {
    const [transactions, setTransactions] = useState(() => {
                                                            const savedTransactions = localStorage.getItem("transactions");
                                                            return savedTransactions ? JSON.parse(savedTransactions) : [];
    }); 

    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");

    const [showHistory, setShowHistory] = useState(true);


    useEffect(() => {
                    localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

    // Function to handle adding transactions
    function transact() {
        if (!text || !amount || !type) {
                                        alert("Please fill all fields!");
            return;
        }

        const newTransaction = {
            text,
            amount: type === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount)), 
            type,
        };

        setTransactions([...transactions, newTransaction]);
        setText(""); 
        setAmount(""); 
        setType("");
    }

    function deleteHistory(index) {
        const updatedHistory = transactions.filter((_, i) => i !== index);
        setTransactions(updatedHistory);
    }

    function toggleHistory() {
        setShowHistory((prevState) => !prevState);
    }

    return (
        <>
        <div className="container">
            <header>
                <h2>Expense Tracker</h2>
            </header>

            <div className="currentBalance">
                <p>Your Balance</p>
                <span>
                    ${transactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0)}
                </span> 
            </div>

            <div className="incomeExpense">
                <div className="income">
                    <span>
                        ${transactions
                                        .filter((transaction) => transaction.type === "income")
                                        .reduce((acc, transaction) => acc + Number(transaction.amount), 0)}
                    </span>
                    <p>Income</p>
                </div>
                <div className="expense">
                    <span>
                    ${Math.abs(transactions
                    .filter((transaction) => transaction.type === "expense")
                    .reduce((acc, transaction) => acc + Number(transaction.amount), 0))}
                    </span>
                    <p>Expense</p>
                </div>
            </div>

            

            <div className="transaction">
                <label htmlFor="purposeField">Purpose of Transaction*:</label><br />
                <input 
                    type="text" 
                    id="purposeField"
                    placeholder="Purpose"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                /> <br />

                <label htmlFor="amountField">Amount*:</label><br />
                <input 
                    type="number" 
                    id="amountField"
                    placeholder="Amount"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />

                
                <div className="radioInput">
                    <input 
                        type="radio" 
                        id="income" 
                        name="transactionType" 
                        value="income" 
                        checked={type === "income"}
                        onChange={(e) => setType(e.target.value)} 
                    />
                    <label htmlFor="income">Income</label>

                    <input 
                        type="radio" 
                        id="expense" 
                        name="transactionType" 
                        value="expense" 
                        checked={type === "expense"}
                        onChange={(e) => setType(e.target.value)} 
                    />
                    <label htmlFor="expense">Expense</label>
                </div>

                <div className="btn">
                    <button onClick={transact}>Transact</button>
                    <button onClick={toggleHistory}>
                    {showHistory ? "Hide History" : "Show History"}
                </button>

                </div>
            </div>

            {showHistory && (
                    <div id="history">
                        <h3>History</h3>
                        <ul className="list">
                            {transactions.map((transaction, index) => (
                                <li key={index} onClick={() => deleteHistory(index)}>
                                    <span>{transaction.text}</span>
                                    <span>
                                        {transaction.amount < 0
                                            ? `- $${Math.abs(transaction.amount)}`
                                            : `$${transaction.amount}`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
        </>
    );
}

export default ExpenseTracker;
