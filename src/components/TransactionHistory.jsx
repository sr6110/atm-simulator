import React from 'react';

function TransactionHistory({ transactions }) {
    if (transactions.length === 0) {
        return (
            <div className="bg-blue-200 p-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Transaction History</h2>
                <p>No transaction history available.</p>
            </div>
        );
    }

    return (
        <div className="bg-blue-200 p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Transaction History</h2>
            <div className='overflow-x-auto -mx-4 w-screen max-w-screen-sm'>
                <table className="min-w-full">
                    <thead>
                        <tr role='row'>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} role='row' className='bg-white'>
                                <td className=" px-4 py-2">{transaction.id}</td>
                                <td className=" px-4 py-2">{transaction.type}</td>
                                <td className={` px-4 py-2 ${transaction.type === 'deposit' ? 'text-green-700' : 'text-red-700'}`}>{transaction.amount}</td>
                                <td className=" px-4 py-2">{transaction.timeStamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionHistory;
