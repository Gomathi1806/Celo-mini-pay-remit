// SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

import "./Interaction.sol";
import "./CustomPriceFeed.sol";


contract Remittance is Interaction {
    IERC20 public usdcToken;
    CustomPriceFeed public priceFeed;

    constructor(address _usdcToken, address _priceFeed) {
        usdcToken = IERC20(_usdcToken);
        priceFeed = CustomPriceFeed(_priceFeed);
    }

    function remit(address sender, address recipient, uint256 amount, address currencyKey) external {
        // Convert GBP to USDC
        uint256 usdcAmount = amount * priceFeed.getExchangeRate("GBP/USDC");
        usdcToken.transferFrom(sender, recipient, usdcAmount);

        // Convert USDC to cEUR
        uint256 cEurAmount = usdcAmount / priceFeed.getExchangeRate("USDC/EUR");
        transferStableToken(recipient, currencyKey, cEurAmount);
    }
}
