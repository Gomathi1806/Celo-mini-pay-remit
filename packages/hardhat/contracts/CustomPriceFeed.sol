// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CustomPriceFeed {
    mapping(bytes32 => uint256) public exchangeRates;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setExchangeRate(bytes32 currencyKey, uint256 rate) external {
        require(msg.sender == owner, "Only owner can set exchange rates");
        exchangeRates[currencyKey] = rate;
    }

    function getExchangeRate(bytes32 currencyKey) public view returns (uint256) {
        return exchangeRates[currencyKey];
    }
}

