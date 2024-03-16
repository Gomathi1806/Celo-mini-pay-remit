// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./CeloStableToken.sol";

contract Interaction {
    function transferStableToken(address recipient, address currencyKey, uint256 amount) internal {
        CeloStableToken stablecoin = CeloStableToken(currencyKey);
        stablecoin.transfer(recipient, amount);
    }
}
