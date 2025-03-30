document.getElementById('setSalary').addEventListener('click', setSalary);
document.getElementById('addExpense').addEventListener('click', addExpense);

function setSalary() {
    const salary = parseFloat(document.getElementById('salaryInput').value);
    
    if (!isNaN(salary)) {
        localStorage.setItem('salary', JSON.stringify(salary));
        displaySummary();
        
        // Clear input
        document.getElementById('salaryInput').value = '';
    } else {
        alert("Please enter a valid salary.");
    }
}

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (expenseName && !isNaN(expenseAmount)) {
        const expenseData = { expenseName, expenseAmount };
        
        saveToLocalStorage('expenses', expenseData);
        displaySummary();
        
        // Clear inputs
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    } else {
        alert("Please fill in all fields correctly.");
    }
}

function saveToLocalStorage(key, data) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(data);
    localStorage.setItem(key, JSON.stringify(items));
}

function displaySummary() {
    const salary = JSON.parse(localStorage.getItem('salary')) || 0;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    let totalExpenses = expenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
    
    const remainingBalance = (salary - totalExpenses).toFixed(2);
    
    const summaryDiv = document.getElementById('summary');
    
    summaryDiv.innerHTML = `
        <p>Monthly Salary: ₺${salary.toFixed(2)}</p>
        <p>Total Expenses: ₺${totalExpenses.toFixed(2)}</p>
        <p>Remaining Balance: ₺${remainingBalance}</p>
        <h3>Expenses:</h3><ul>${expenses.map(expense => `<li>${expense.expenseName}: ₺${expense.expenseAmount}</li>`).join('')}</ul>
    `;
}

// Initial display on load
displaySummary();
