import { useEffect, useState } from 'react'
import Deposit from './components/Deposit'
import AccountBalance from './components/AccountBalance'
import { getLocalStorageItem, setLocalStorageItem } from './utils/localStorage'
import { BANK_NAME, LOCAL_STORAGE_KEYS } from './utils/constants'
import Welcome from './components/Welcome';
import { v4 as uuid } from 'uuid';
import TransactionHistory from './components/TransactionHistory'
import Withdraw from './components/Withdraw'

function App() {

  const [currentView, setCurrentView] = useState('welcome');
  const [accountBalance, setAccountBalance] = useState(() => {
    const savedAccountBalance = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCOUNT_BALANCE);
    return savedAccountBalance ? savedAccountBalance : 0;
  });
  const [transactionHistory, setTransactionHistory] = useState([]);


  useEffect(() => {
    const storedHistory = getLocalStorageItem(LOCAL_STORAGE_KEYS.TRANSACTION_HISTORY);
    setTransactionHistory(storedHistory ? JSON.parse(storedHistory) : []);
  }, []);

  const handleTransaction = (transactionType, amount) => {
    const newTransaction = [...transactionHistory, {
      id: uuid(),
      type: transactionType,
      amount: amount,
      timeStamp: new Date().toLocaleString(),
    }];
    setTransactionHistory(newTransaction);
    setLocalStorageItem(LOCAL_STORAGE_KEYS.TRANSACTION_HISTORY, JSON.stringify(newTransaction));
  }

  const goToView = (view) => {
    setCurrentView(view)
  }

  console.log('goToView', currentView);

  return (
    <div className='h-screen bg-blue-200 flex flex-col justify-center items-center p-2'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          Welcome to {BANK_NAME} Bank
        </h1>
        <AccountBalance balance={accountBalance} />

        {currentView === 'welcome' && <Welcome onDepositClick={() => goToView('deposit')} onWithdrawClick={() => goToView('withdraw')} onTransactionClick={() => goToView('transaction')} />}

        {currentView === 'deposit' && <Deposit setAccountBalance={setAccountBalance} handleTransaction={handleTransaction} />}
        {currentView === 'withdraw' && <Withdraw accountBalance={accountBalance} setAccountBalance={setAccountBalance} handleTransaction={handleTransaction} />}
        {currentView === 'transaction' && <TransactionHistory transactions={transactionHistory} />}

        {currentView !== 'welcome' && <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold my-4 py-2 px-4 rounded self-start' onClick={() => goToView('welcome')}>Go to Main Menu</button>}
      </div>
    </div>
  )
}

export default App
