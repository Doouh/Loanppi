#!/usr/bin/node
const connection = require('./conection_database');


//Function that reduces the amount avialable to invest
const newBalanceInvestor = data => {
  connection.query('UPDATE investors SET investStack = investStack - ' + data.moneyInvestment + ' WHERE idInvestor = ' + data.idInvestor, (err,rows) => {
    if(err) throw err;
  
    console.log('Amount available changed');
  });
}

//Function updates amount ramining of the need
const updatemoneyNeed = data => {
  connection.query('UPDATE needs SET amountRemaining = amountRemaining - ' + data.moneyInvestment + ' WHERE idNeed = ' + data.idNeed, (err, rows) => {
    if(err) throw err;

    console.log("New investment in the need");
  })
}

//Function that changes the status of the need when is solved
const checkStatusNeed = data => {
  const id = data.idNeed
  connection.query("UPDATE needs SET status='resolved' WHERE idNeed = " + id + " AND amountRemaining = 0", (err, rows) => {
    if(err) throw err;

    console.log("A needs is solved");
  })
}

//Function that sums all the payments
const pay = data => {
  connection.query("UPDATE needs SET amountRemaining = amountRemaining + " + data.payment + " WHERE idWorker = " + data.idWorker, (err, rows) => {
    if(err) throw err;

    console.log("Payment effective");
  })
}

//Function that changes status when a need is totally paid
const needResolved = data => {
  connection.query("UPDATE needs SET status='paid' WHERE idNeed= "+ data.idNeed + " AND amountRemaining - totalToPay > -10  AND amountRemaining - totalToPay < 10", (err, rows) => {
    if(err) throw err;

    console.log("A needs is solved  status");
 })
}



const updateInvestment = data => {
  console.log("soy la data" + data.investorShare);
  connection.query("UPDATE investment SET totalReturn = totalReturn + " + data.investorShare  + " WHERE idInvestment = " + data.idInvestment, (err, rows) => {
    if(err) throw err;

    console.log("Return made it");
 })
}

//Function that changes the status of the investment when is closed
const changeStatusInvestment = (idInvestment, idNeed) => {
  connection.query("UPDATE investment SET status='closed' WHERE idInvestment = " + idInvestment + " AND 'paid' IN (select status from needs where idNeed = " + idNeed + " )", (err, rows) => {
    if(err) throw err;

    console.log("An investment has been completed");
  })
}

//Function that upgrades money avilable to invest after a return
const changeStack = (idInvestor, amount) => {
  amount = amount - amount * 0.05;
  connection.query("UPDATE investors SET investStack = investStack + "+ amount +" WHERE idInvestor = " + idInvestor, (err, rows) => {
    if(err) throw err;

    console.log("The stack has been updated");
  })
}



module.exports = { changeStack, newBalanceInvestor, updatemoneyNeed, checkStatusNeed, pay, needResolved, changeStatusInvestment, updateInvestment };
