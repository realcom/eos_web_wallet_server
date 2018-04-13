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
      throw stderr;
    }
    return true;
  } catch (err) {
    /* bug of cleos...*/
    if (err.toString().indexOf('Unknown struct') >= 0) {
      return true;
    }
    throw err;
  }
};


exports.createWallet = async (walletName) => {
  const url = `${process.env.CLEOS_HTTP_ENDPOINT}/v1/wallet/create`
  const result = await axios.post(url, `"${walletName}"`, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return result;
}
