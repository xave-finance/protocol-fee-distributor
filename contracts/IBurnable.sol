// SPDX-License-Identifier: MIT
pragma solidity =0.8.6;

// Expose the IBurnable interface
interface IBurnable {
    function burnFrom(address account, uint256 amount) external;
}