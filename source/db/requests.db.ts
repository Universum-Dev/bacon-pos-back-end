import { Account } from "./models";

export const getAccountData = async (queryToSearch: object) => {
  try {
    const accountData = await Account.find(queryToSearch).lean().exec();
    return accountData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
