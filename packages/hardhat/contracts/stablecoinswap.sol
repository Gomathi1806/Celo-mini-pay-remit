//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StableCoinSwap {
    IERC20 private usdcToken;
    IERC20 private celoToken;

    address public constant USDC_ADDRESS = 0x4f5C801a8d5b1Ee531db14A9cc71DfF205f4673F; // Replace with your desired USDC contract address
    address public constant CELO_ADDRESS = 0x4C6730D354FA8ce165d9F18E4be71D301e6b1915; // Replace with your desired Celo stable coin contract address

    constructor() {
        usdcToken = IERC20(USDC_ADDRESS);
        celoToken = IERC20(CELO_ADDRESS);
    }

    function swap(uint256 amountIn, uint256 deadline, address to) external returns (uint256 amountOut) {
        require(deadline >= block.timestamp, "StableCoinSwap: deadline must be in the future");
        require(deadline - block.timestamp <= 60 minutes, "StableCoinSwap: deadline too far in the future");

        uint256 usdcAllowance = usdcToken.allowance(msg.sender, address(this));
        require(usdcAllowance >= amountIn, "StableCoinSwap: insufficient allowance");

        usdcToken.transferFrom(msg.sender, address(this), amountIn);
        amountOut = amountIn / usdcToken.balanceOf(address(this));
        celoToken.transfer(to, amountOut);

        uint256 remainingUSDC = usdcToken.balanceOf(address(this));
        if (remainingUSDC > 0) {
            usdcToken.transfer(msg.sender, remainingUSDC);
        }
    }
}

