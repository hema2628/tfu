// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const API_key = 'l8sVYLAluoIt6ZhOvnyTerWmoO2n5J1h'


async function getNFTList(contract_address) {


// Using HTTPS
    const web3 = createAlchemyWeb3(
        "https://eth-mainnet.alchemyapi.io/v2/" + API_key,
    );

    const nfts = await web3.alchemy.getNfts({owner: contract_address})

    console.log(nfts);
}

module.exports = {getNFTList}
