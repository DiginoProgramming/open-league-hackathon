const TonWeb = require("./index");


async function init() {
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: ''}));

    const transactions = await tonweb.provider.getBlockTransactions(0, TonWeb.HttpProvider.SHARD_ID_ALL, 41950153, 3, '44678128000009', 'gp6ByDyJSA+UyNt9KXfwtN4KXHZAfNzGiu9A129fjZo=');
    console.log(transactions);
    console.log(transactions.transactions.length);
}

init();

// 44678128000003
//8LaTnbsN1oI9TOaOPJ5xQh5ruQIBJLY1bVaZFMR8OPo=

//44678128000005
//3f6QBd9rfTEnMcD3EhnjGg2YIL+wQkridacr1Wcg3gw=


//44678128000007
//9IEZqvcGT1UxKVJy5rfs4TFJy5Eamnb6QFWpcApl9UI=


