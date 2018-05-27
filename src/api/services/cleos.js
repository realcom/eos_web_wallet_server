import util from 'util';
import axios from 'axios';

const exec = util.promisify(require('child_process').exec);


exports.createKey = async () => {
  try {
    const keyRegex = /Private key: ([a-zA-Z0-9_]*)(\s*)Public key: ([a-zA-Z0-9_]*)/g;
    const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} create key`);
    if (stderr) {
      1;
    }
    const [, privateKey, , publicKey] = keyRegex.exec(stdout);
    return [privateKey, publicKey];

  } catch (err) {
    throw err;
  }
  return 1;
};


exports.createAccount = async (creatorAccount, accountName, ownerPublicKey, activePublicKey) => {
  try {
    const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} create account ${creatorAccount} ${accountName} ${ownerPublicKey} ${activePublicKey}`);
    if (stderr) {
      console.error('create Account error');
      console.log(stderr);
      if(stderr.toLowerCase().indexOf('warning') >= 0){
        return true;
      }
      throw stderr;
    }
    return true;
  } catch (err) {
    throw err;
  }
};


exports.createWallet = async (walletName) => {
  const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} wallet create -n ${walletName}`)
  if (stderr !== '') {
    throw stderr;
  } else {
    const keyRegex = /"([a-zA-Z0-9_]*)"/gmi;
    const [ ,password] = keyRegex.exec(stdout);
    return {data: password};
  }
}

exports.importKeyToWallet = async (key, walletName) => {
  const result = await exec(`${process.env.CLEOS_EXEC} wallet import ${key} -n ${walletName}`);

}

exports.getBalance = async (accountName) => {
  const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} get currency balance eosio.token ${accountName}`)
  if (stdout === '') {
    return 0.0;
  } else {
    return parseFloat(stdout.split(' ')[0])
  }
}

// cleos push action eosio.token transfer '[ "eosio", "tester", "25.0000 EOS", "m" ]' -p eosio
exports.requestFaucet = async(accountName, quantity) => {
  const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} push action eosio.token transfer '[ "eosio", "${accountName}", "5.0000 EOS", "m" ]' -p eosio`)
  if(stdout.indexOf('executed transaction:') >= 0) {
    const keyRegex = /executed transaction: ([a-zA-Z0-9_]*)(\s*)/gmi;
    const [ ,transactionId] = keyRegex.exec(stdout);
    return { quantity, transactionId };
  } else {
    throw(stderr);
  }
}

exports.newTransaction = async(from, to, quantity, tokenName='eosio.token', wallet) => {
  const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} push action ${tokenName} transfer '[ "${from}", "${to}", "${parseFloat(quantity).toFixed(4)} EOS", "m" ]' -p ${from}`)
  if(stdout.indexOf('executed transaction:') >= 0) {
    const keyRegex = /executed transaction: ([a-zA-Z0-9_]*)(\s*)/gmi;
    const [ ,transactionId] = keyRegex.exec(stdout);
    return { quantity, transactionId };
  } else {
    throw(stderr);
  }
}

exports.getTransaction = async(transactionId) => {
  const { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} get transaction ${transactionId}`)
  return JSON.parse(stdout);
}
