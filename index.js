const clients = [{
        id: 1,
        taxNumber: '86620855',
        name: 'HECTOR ACUÑA BOLAÑOS'
    },
    {
        id: 2,
        taxNumber: '7317855K',
        name: 'JESUS RODRIGUEZ ALVAREZ'
    },
    {
        id: 3,
        taxNumber: '73826497',
        name: 'ANDRES NADAL MOLINA'
    },
    {
        id: 4,
        taxNumber: '88587715',
        name: 'SALVADOR ARNEDO MANRIQUEZ'
    },
    {
        id: 5,
        taxNumber: '94020190',
        name: 'VICTOR MANUEL ROJAS LUCAS'
    },
    {
        id: 6,
        taxNumber: '99804238',
        name: 'MOHAMED FERRE SAMPER'
    }
];
const accounts = [{
        clientId: 6,
        bankId: 1,
        balance: 15000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 18000
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 135000
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 5600
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 23000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 15000
    },
    {
        clientId: 3,
        bankId: 3,
        balance: 45900
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 19000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 51000
    },
    {
        clientId: 5,
        bankId: 1,
        balance: 89000
    },
    {
        clientId: 1,
        bankId: 2,
        balance: 1600
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 37500
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 19200
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 10000
    },
    {
        clientId: 3,
        bankId: 2,
        balance: 5400
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 9000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 13500
    },
    {
        clientId: 2,
        bankId: 1,
        balance: 38200
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 17000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 1000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 600
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 16200
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 10000
    }
]
const banks = [{
        id: 1,
        name: 'SANTANDER'
    },
    {
        id: 2,
        name: 'CHILE'
    },
    {
        id: 3,
        name: 'ESTADO'
    }
];

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
*/

// 0 Arreglo con los ids de clientes
// 1 Arreglo con los ids de clientes ordenados por rut
// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
	// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.

	// Impresión de soluciones. No modificar.

    // Pregunta 0
function listClientsIds() {
  return clients.map((client) => client.id);
}

// Pregunta 1
function listClientsIdsSortByTaxNumber() {
  return clients
    .sort((a, b) => a.taxNumber.localeCompare(b.taxNumber))
    .map((client) => client.id);
}

// Pregunta 2
function sortClientsTotalBalances() {
  const clientsWithTotalBalance = clients.map((client) => {
    const totalBalance = accounts
      .filter((account) => account.clientId === client.id)
      .reduce((sum, account) => sum + account.balance, 0);
    return {
      id: client.id,
      name: client.name,
      totalBalance: totalBalance,
    };
  });

  return clientsWithTotalBalance
    .sort((a, b) => b.totalBalance - a.totalBalance)
    .map((client) => client.name);
}

// Pregunta 3
function banksClientsTaxNumbers() {
  const banksClients = {};
  banks.forEach((bank) => {
    const bankClients = accounts
      .filter((account) => account.bankId === bank.id)
      .map((account) => {
        const client = clients.find((client) => client.id === account.clientId);
        return {
          id: client.id,
          name: client.name,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((client) => client.id);
    banksClients[bank.name] = bankClients;
  });
  return banksClients;
}

// Pregunta 4
function richClientsBalances() {
  return accounts
    .filter((account) => account.bankId === 1 && account.balance > 25000)
    .map((account) => account.balance)
    .sort((a, b) => b - a);
}

// Pregunta 5
function banksRankingByTotalBalance() {
  const banksTotalBalance = banks.map((bank) => {
    const totalBalance = accounts
      .filter((account) => account.bankId === bank.id)
      .reduce((sum, account) => sum + account.balance, 0);
    return {
      id: bank.id,
      totalBalance: totalBalance,
    };
  });
  return banksTotalBalance
    .sort((a, b) => a.totalBalance - b.totalBalance)
    .map((bank) => bank.id);
}

// Pregunta 6
function banksFidelity() {
  const banksFidelityCount = {};
  banks.forEach((bank) => {
    const bankClients = accounts
      .filter((account) => account.bankId === bank.id)
      .map((account) => account.clientId);
    const uniqueClients = new Set(bankClients);
    banksFidelityCount[bank.name] = uniqueClients.size;
  });
  return banksFidelityCount;
}

// Pregunta 7
function banksPoorClients() {
  const banksPoorClientsId = {};
  banks.forEach((bank) => {
    const bankAccounts = accounts.filter((account) => account.bankId === bank.id);
    const minBalanceAccount = bankAccounts.reduce((minAccount, account) => {
      if (account.balance < minAccount.balance) {
        return account;
      }
      return minAccount;
    }, bankAccounts[0]);
    banksPoorClientsId[bank.name] = minBalanceAccount.clientId;
  });
  return banksPoorClientsId;
}

// Pregunta 8
function newClientRanking() {
  const newClient = {
    id: clients.length + 1,
    taxNumber: '12345678',
    name: 'NUEVO CLIENTE',
  };

  clients.push(newClient);

  const newAccount = {
    clientId: newClient.id,
    bankId: 3,
    balance: 9000,
  };

  accounts.push(newAccount);

  const sortedClients = sortClientsTotalBalances();

  return sortedClients.indexOf(newClient.name) + 1;
}

console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());