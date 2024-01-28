import React, { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage';
import { CURRENCY_SYMBOL, LOCAL_STORAGE_KEYS, notesObject } from '../utils/constants';

function Withdraw({ accountBalance, setAccountBalance, handleTransaction }) {
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isWithdrawCompleted, setIsWithdrawCompleted] = useState(false);
    const [dispensedNotesList, setDispensedNotesList] = useState([])

    const denominations = getLocalStorageItem(LOCAL_STORAGE_KEYS.DENOMINATIONS) ?? notesObject;

    function dispenseNotes(amount, denominations) {
        const sortedDenominations = Object.entries(denominations)
            .sort((a, b) => b[0] - a[0])
            .map(([denom, count]) => ({ denom: parseInt(denom), count }));

        const notes = [];
        for (const { denom, count } of sortedDenominations) {
            const notesNeeded = Math.floor(amount / denom);
            const availableNotes = Math.min(notesNeeded, count);
            notes.push({ denom, count: availableNotes });
            amount -= availableNotes * denom;

            if (amount === 0) {
                break;
            }
        }
        return amount === 0 ? notes : null;
    }


    function updateAvailableNotes(denominations, notesToDispense) {
        return Object.fromEntries(
            Object.entries(denominations)
                .map(([denom, count]) => [
                    denom,
                    count - (notesToDispense.find((note) => note.denom === parseInt(denom))?.count ?? 0)
                ])
        );
    }


    const handleWithdraw = () => {
        const amount = withdrawAmount;

        if (amount > accountBalance) {
            setErrorMessage('Insufficient funds in your account.');
            return;
        }


        const result = dispenseNotes(amount, denominations);
        if (result) {
            setLocalStorageItem(LOCAL_STORAGE_KEYS.DENOMINATIONS, updateAvailableNotes(denominations, result));
            setAccountBalance(accountBalance - amount);
            setWithdrawAmount(0);
            setDispensedNotesList(result);
            setIsWithdrawCompleted(true);
            setErrorMessage('');
            handleTransaction('withdraw', amount);
            setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCOUNT_BALANCE, (accountBalance - amount))

        } else {
            setErrorMessage(`Unable to dispense ${CURRENCY_SYMBOL}${amount} with the available denominations. Please try  different amount.`);

        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!Number.isInteger(value)) {
            setErrorMessage('Please enter a valid amount to withdraw.');
        }
        else if (value % 100 != 0) {
            setErrorMessage('Amount should be multiple of 100.');
        } else if (value >= 100) {
            setWithdrawAmount(value);
            setErrorMessage('');
        }
        else {
            setErrorMessage('Please enter a valid amount to withdraw.');
        }
    };

    return (
        isWithdrawCompleted ? <div className=" p-4 rounded-lg">
            <h3 className="font-bold">Withdrawal successful!</h3>
            <p className="mb-2">Your new balance is: {CURRENCY_SYMBOL}{accountBalance}</p>
            {dispensedNotesList && (
                <><p className="mb-4">Dispensed notes:</p>
                    <ul className="list-disc ml-4">
                        {dispensedNotesList.map((note, index) => {
                            if (note.count == 0) {
                                return null
                            } else {
                                return <li key={index}>
                                    {note.count} &times; {CURRENCY_SYMBOL}{note.denom}
                                </li>
                            }
                        })}
                    </ul></>
            )}
        </div> : <div className='self-start'>
            <h2>Withdraw Money:</h2>
            <div>
                <input
                    className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2 appearance-none'
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter amount to withdraw"
                />
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                <button className={`${withdrawAmount === 0 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600   '}  text-white font-bold py-2 mt-4 px-4 rounded mr-4`} disabled={withdrawAmount == 0} onClick={handleWithdraw}>Withdraw</button>
            </div>
        </div>
    );
}

export default Withdraw;
