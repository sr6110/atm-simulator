import React, { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage';
import { CURRENCY_SYMBOL, LOCAL_STORAGE_KEYS, notesObject } from '../utils/constants';

const Deposit = ({ setAccountBalance, handleTransaction }) => {
    const [notes, setNotes] = useState(notesObject);
    const [isDepositCompleted, setIsDepositCompleted] = useState(false);
    const [warning, setWarning] = useState('');


    const handleDeposit = (amount) => {
        if (amount <= 0) {
            return;
        }
        setAccountBalance(prevBalance => prevBalance + amount);
        setIsDepositCompleted(true);
        const getPrevBalance = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCOUNT_BALANCE) ?? 0;
        setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCOUNT_BALANCE, (getPrevBalance + amount));
        handleTransaction('deposit', amount);
        setLocalStorageItem(LOCAL_STORAGE_KEYS.DENOMINATIONS, updateDenominations(getLocalStorageItem(LOCAL_STORAGE_KEYS.DENOMINATIONS) ?? notesObject, notes));
    }

    function updateDenominations(current, updated) {
        const result = {};

        for (let key in current) {
            if (current.hasOwnProperty(key)) {
                result[key] = (parseInt(current[key]) || 0) + (parseInt(updated[key]) || 0);
            }
        }

        return result;
    }

    const handleNoteChange = (e) => {
        const { name, value } = e.target;

        if (!isNaN(value) && value >= 0) {
            setNotes(prevNotes => ({
                ...prevNotes,
                [name]: parseInt(value),
            }));
            setWarning('');
        } else {
            setNotes(prevNotes => ({
                ...prevNotes,
                [name]: 0
            }));
            setWarning('Please enter a valid non-negative integer.')
        }
    };

    const totalDepositAmount = Object.keys(notes).reduce((acc, note) => {
        return acc + parseInt(note) * notes[note];
    }, 0);

    return (
        <div className='w-full'>
            {!isDepositCompleted ? (
                <div>
                    <h2 className='text-2xl'>Deposit Money:</h2>
                    <table className='my-8'>
                        <tbody>
                            {Object.keys(notes).map((note, index) => (
                                <tr key={index} className='align-middle text-xl'>
                                    <td >{CURRENCY_SYMBOL}{note} note</td>
                                    <td className='pl-2'> x </td>
                                    <td>
                                        <input
                                            className='w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-2'
                                            type='text'
                                            name={note}
                                            onChange={handleNoteChange}
                                            placeholder={`Enter no. of ${CURRENCY_SYMBOL}${note} notes`}
                                        /></td>
                                    <td>= {CURRENCY_SYMBOL}{parseInt(note) * notes[note]}</td>
                                </tr>
                            ))}
                            <tr className='text-xl'>
                                <td colSpan="3">Total</td>
                                <td>= {CURRENCY_SYMBOL}{totalDepositAmount}</td>
                            </tr>
                            <tr>
                                <td colSpan="4">{warning && <span className='text-red-500'>{warning}</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className={`${totalDepositAmount === 0 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600   '}  text-white font-bold py-2 px-4 rounded mr-4`} onClick={() => handleDeposit(totalDepositAmount)} disabled={totalDepositAmount === 0}>Deposit</button>
                </div>
            ) : (
                <div>
                    <div>
                        <strong>Your deposit amount: </strong> {CURRENCY_SYMBOL}{totalDepositAmount}
                    </div>
                    <div>
                        <strong>Deposit Summary:</strong>
                        <ul>
                            {Object.keys(notes).map((note, index) => {
                                const amount = parseInt(note) * notes[note];
                                if (amount > 0) {
                                    return (
                                        <li key={index}>
                                            {CURRENCY_SYMBOL}{note} &times; {notes[note]} = {CURRENCY_SYMBOL}{amount}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Deposit;
