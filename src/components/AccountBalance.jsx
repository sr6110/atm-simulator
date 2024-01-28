import React from 'react';
import { CURRENCY_SYMBOL } from '../utils/constants';

function AccountBalance({ balance }) {
    return (
        <div className="bg-blue-200 p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Account Balance</h2>
            <div className="text-lg">{CURRENCY_SYMBOL}{balance}</div>
        </div>
    );
}

export default AccountBalance;
