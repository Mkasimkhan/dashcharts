export const getBankData = () => {
    const bankData = localStorage.getItem("bank");
    if (bankData) {
        const parsedBankData = JSON.parse(bankData);
        const { bank } = parsedBankData;
        return bank || null; // Return bank data or null if not available
    }
    return null; // Return null if no bank data found
};

export const getToken = () => {
    const token = localStorage.getItem("authToken");
    if(token){
        const authToken = JSON.parse(token)
        return authtoken
    }
    return null
}

export const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("authToken")}`
    },
};