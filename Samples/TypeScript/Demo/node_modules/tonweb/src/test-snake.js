const TonWeb = require("./index");
const {stringToSnakeCells, parseStringSnakeCells} = require("./boc/SnakeUtils");
const {JettonWallet} = require("./contract/token/ft/JettonWallet");
const {BN, Address} = require('./utils')
const {NftItem} = require("./contract/token/nft/NftItem");
/**
 * @param text {string}
 */
const test = (text) => {
    const result = parseStringSnakeCells(stringToSnakeCells(text));
    if (text !== result) {
        console.log(text)
        console.log(result)
        throw new Error();
    } else {
        console.log('ok');
    }
}


test('hello');
test('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello  ');
test('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ello Hello Hello    x');
test('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ello Hello Hello    xx');
test('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello  Hello Hello Hello xxy Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello  Hello Hello Hello xxyzyx');


const init = async () => {
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

    const jettonWallet = new JettonWallet(tonweb.provider, {address: 'UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'});

    console.log(
        await jettonWallet.createTransferBody({
            jettonAmount: new BN(1),
            toAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
        })
    );
    console.log(
        await jettonWallet.createTransferBody({
            jettonAmount: new BN(1),
            toAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1)
        })
    );
    console.log(
        await jettonWallet.createTransferBody({
            jettonAmount: new BN(1),
            toAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1),
            forwardPayload: stringToSnakeCells('hello')
        })
    );    console.log(
        await jettonWallet.createTransferBody({
            jettonAmount: new BN(1),
            toAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1),
            forwardPayload: new TextEncoder().encode('helasdasdadasdasdasdasdsadasdasdasdasdsadsalo')
        })
    );

    const nftItem = new NftItem(tonweb.provider, {address: 'UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'});

    console.log(
        await nftItem.createTransferBody({
            jettonAmount: new BN(1),
            newOwnerAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
        })
    );
    console.log(
        await nftItem.createTransferBody({
            jettonAmount: new BN(1),
            newOwnerAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1)
        })
    );
    console.log(
        await nftItem.createTransferBody({
            jettonAmount: new BN(1),
            newOwnerAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1),
            forwardPayload: stringToSnakeCells('hello')
        })
    );
    console.log(
        await nftItem.createTransferBody({
            jettonAmount: new BN(1),
            newOwnerAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            responseAddress: new Address('UQCdqXGvONLwOr3zCNX5FjapflorB6ZsOdcdfLrjsDLt3AF4'),
            forwardAmount: new BN(1),
            forwardPayload: new TextEncoder().encode('helasdasdadasdasdasdasdsadasdasdasdasdsadsalo')
        })
    );
}

init();
