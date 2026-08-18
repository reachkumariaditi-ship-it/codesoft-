// =============================
// Expense Tracker
// =============================

const form = document.getElementById("transactionForm");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

const transactionList = document.getElementById("transactionList");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

// Local Storage
let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

// =============================
// Save Data
// =============================

function saveData(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// =============================
// Display Transactions
// =============================

function displayTransactions(list = transactions){

    transactionList.innerHTML = "";

    list.forEach(transaction=>{

        const li = document.createElement("li");

        li.className =
        transaction.amount >=0 ? "plus":"minus";

        li.innerHTML=`

        <div>

            <strong>${transaction.title}</strong><br>

            <small>
            ${transaction.category}
            |
            ${transaction.date}
            </small>

        </div>

        <div>

            ₹${transaction.amount}

            <button
            class="delete-btn"
            onclick="deleteTransaction(${transaction.id})">

            <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        transactionList.appendChild(li);

    });

    updateSummary();

}

// =============================
// Add Transaction
// =============================

form.addEventListener("submit",function(e){

    e.preventDefault();

    if(
        title.value==="" ||
        amount.value==="" ||
        date.value===""
    ){
        alert("Please fill all fields");
        return;
    }

    const transaction={

        id:Date.now(),

        title:title.value,

        amount:Number(amount.value),

        category:category.value,

        date:date.value

    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    form.reset();

});

// =============================
// Delete
// =============================

function deleteTransaction(id){

    transactions =
    transactions.filter(item=>item.id!==id);

    saveData();

    displayTransactions();

}

// =============================
// Summary
// =============================

function updateSummary(){

    let total=0;
    let inc=0;
    let exp=0;

    transactions.forEach(item=>{

        total+=item.amount;

        if(item.amount>=0){

            inc+=item.amount;

        }else{

            exp+=Math.abs(item.amount);

        }

    });

    balance.innerHTML="₹"+total.toFixed(2);

    income.innerHTML="₹"+inc.toFixed(2);

    expense.innerHTML="₹"+exp.toFixed(2);

}

// =============================
// Search
// =============================

search.addEventListener("keyup",()=>{

    const value =
    search.value.toLowerCase();

    const filtered =
    transactions.filter(item=>

        item.title.toLowerCase().includes(value) ||

        item.category.toLowerCase().includes(value)

    );

    displayTransactions(filtered);

});

// =============================
// Dark Mode
// =============================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

// =============================
// Load Data
// =============================

displayTransactions();