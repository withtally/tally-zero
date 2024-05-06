export async function getUserAddress() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      return accounts[0]
    } catch (error) {
      console.error("Error retrieving account:", error)
      throw new Error("User denied account access")
    }
  } else {
    console.log("MetaMask is not installed")
    throw new Error("Please install MetaMask or another Ethereum wallet")
  }
}

export async function displayUserAddress() {
  try {
    const address = await getUserAddress()
    return address
  } catch (error) {
    console.error(error)
  }
}
