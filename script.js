'use strict';

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2024-05-04T07:43:59.331Z',
    '2024-05-05T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  // currency: 'CAD',
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatTransactionsDate = function(date, locale){
  const getDaysBetween2Dates = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Уesterday';
  if (daysPassed <=7) return `${daysPassed} days ago` ;
  else {
    // const day = `${date.getDate()}`.padStart(2, `0`);
    // const month = `${date.getMonth() + 1}`.padStart(2, `0`);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return Intl.DateTimeFormat(locale).format(date);
  }

}

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style : 'currency',
    currency : currency
  }).format(value);
}


const displayTransaction = function (arr , sort = false) {
containerTransactions.innerHTML = '';


const transac = sort ? arr.transactions.slice().sort((a,b) => a - b) : arr.transactions;

transac.forEach((transaction, index) => {
  
  let transactionType = transaction > 0 ? 'deposit' : 'withdrawal';
  const date = new Date(arr.transactionsDates[index]);
  
  const transDate = formatTransactionsDate(date,arr.locale);
  const formattedTransaction = formatCurrency(transaction, arr.locale, arr.currency)

  const transactionRow = 
  `<div class="transactions__row">
      <div class="transactions__type transactions__type--${transactionType}">
            ${index + 1} ${transactionType}
      </div>
        <div class="transactions__date">${transDate}</div>
        <div class="transactions__value">${formattedTransaction}</div>
      </div>`;

containerTransactions.insertAdjacentHTML('afterbegin', transactionRow)
});
}
// displayTransaction(currentAccount);

const createNickName = function(arr){
arr.forEach(item => {
  item.nickName = item.userName
  .toLowerCase()
  .split(' ')
  .map(word => word[0])
  .join('');
})
}
createNickName(accounts)

const displayBalance = function (arr) {
  // labelBalance.innerHTML = '';
  const balance = arr.transactions.reduce((acc, item) => acc + item);
  labelBalance.innerHTML = formatCurrency(balance, arr.locale, arr.currency)
  arr.balance = balance;
}

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(depositesTotal, account.locale, account.currency);

  const withdrawalsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(withdrawalsTotal, account.locale, account.currency);

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      // console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(interestTotal, account.locale, account.currency);
};
// displayBalance(currentAccount);

let currentAccount , currentLogOutTimer;




const updateUi = function (acc){
  displayTransaction(currentAccount);
  displayBalance(currentAccount);
  displayTotal(currentAccount);
}

// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;
// const date = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long'
// }

// labelDate.textContent = new Intl.DateTimeFormat('uk-UA', options).format(date);

const startLogoutTimer = function () {
  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // В каждом вызове показывать оставшееся время в UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // После истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }

    time--;
  };

  // Установить время выхода через 5 минут
  let time = 300;

  // Вызов таймера каждую секунду
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);

  return logOutTimer;
};




btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.nickName === inputLoginUsername.value);
  if (currentAccount?.pin === +inputLoginPin.value){
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome ${currentAccount.userName.split(' ')[0]}!`
    containerApp.style.opacity = 100;
    const date = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long'
    }
    
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(date);
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount)
    console.log(currentAccount);
  }
})
// inputTransferTo
// inputTransferAmount
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const transferMoney = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(acc => acc.nickName === recipientNickname);
  if (transferMoney > 0 && currentAccount.balance >= transferMoney && recipientAccount && currentAccount.nickName != recipientAccount?.nickName){
    //ADD TRANSACTIONS
    currentAccount.transactions.push(-transferMoney);
    recipientAccount.transactions.push(transferMoney);
    //ADD DATE TRANSACTIONS
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    updateUi(currentAccount);
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
  console.log(transferMoney, recipientAccount);
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();
    if(currentAccount.nickName === inputCloseUsername.value && currentAccount.pin === +inputClosePin.value){
      inputCloseUsername.value = '';
      inputClosePin.value = '';
      const indexAcc = accounts.findIndex(item => item.nickName === currentAccount.nickName)
      accounts.splice(indexAcc, 1);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmount = +inputLoanAmount.value;
  if (loanAmount > 0 && currentAccount.transactions.some(item => item >= loanAmount * 10 / 100)){
    setTimeout(function(){
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    },5000)

  }
  inputLoanAmount.value = '';
});
let isSorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayTransaction(currentAccount, !isSorted);
  isSorted = !isSorted;
});





