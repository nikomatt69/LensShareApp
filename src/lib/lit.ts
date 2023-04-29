import LitJsSdk from "@lit-protocol/sdk-browser";

const client = new LitJsSdk.LitNodeClient({ alertWhenUnauthorized: true });
// For all EVM compatible chain
const chain = "mainnet";

const address1 = "FirstAddress";
const address2 = "SecondAddress";

const accessControlConditions = [
  {
    // check if the author of the post is in possession
    // of a specific wallet address
    // https://developer.litprotocol.com/AccessControlConditions/EVM/basicExamples
    contractAddress: "",
    standardContractType: "",
    chain,
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      // post author address
      value: "0x1" || undefined,
    },
  },
  { operator: "or" },
  {
    contractAddress: "",
    standardContractType: "",
    chain: "mainnet",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      // comment author address
      value: "0x2",
    },
  },
];

const setAccessControlConditions = (address_1: string, address_2: string) => {
  console.log("Set access control conditions, address 1:", address_1);

  accessControlConditions[0].returnValueTest!.value = address_1;
  accessControlConditions[2].returnValueTest!.value = address_2;
  console.log("Access control conditions:", accessControlConditions);
  return accessControlConditions;
};

class Lit {
  private litNodeClient: any;

  async connect() {
    try {
      await client.connect();
      this.litNodeClient = client;
    } catch (err) {
      console.log("Error while connecting to Lit nodes", err);
    }
  }

  async encryptString(text: string, address1: string, address2: string) {
    console.log("Encrypt string address 1:", address1);
    if (!this.litNodeClient) {
      await this.connect();
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      text
    );
    console.log("encrypted string:", encryptedString);

    const conditions = await setAccessControlConditions(address1, address2);

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: conditions,
      symmetricKey,
      authSig,
      chain,
    });
    console.log(
      "access control conditions",
      setAccessControlConditions(address1, address2)
    );

    return {
      encryptedFile: encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16"
      ),
    };
  }

  async decryptString(
    encryptedStr: string,
    encryptedSymmetricKey: string,
    address1: string,
    address2: string
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: setAccessControlConditions(address1, address2),
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });
    const decryptedFile = await LitJsSdk.decryptString(
      encryptedStr,
      symmetricKey
    );
    // eslint-disable-next-line no-console
    /*  console.log( {
      decryptedFile,
    }); */
    return { decryptedFile };
  }
}

export default new Lit();
