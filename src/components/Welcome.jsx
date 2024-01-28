import React from 'react';

function Welcome({ onDepositClick, onTransactionClick, onWithdrawClick }) {

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Choose the service
            </h1>
            <div className="flex flex-col space-y-4">
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={onDepositClick}
                >
                    Deposit
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={onWithdrawClick}
                >
                    Withdraw
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={onTransactionClick}
                >
                    Transaction History
                </button>
            </div>
        </div>
    );
}

export default Welcome;
