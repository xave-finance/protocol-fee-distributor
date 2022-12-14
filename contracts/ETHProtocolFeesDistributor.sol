// SPDX-License-Identifier: MIT
pragma solidity =0.8.6;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract ETHProtocolFeesDistributor {
    address immutable BALANCER_FEE_COLLECTOR = 0xce88686553686DA562CE7Cea497CE749DA109f9F;
    address immutable XAVE_FEES_COLLECTOR = 0xA670629924234B5427dB9B7e0BC52C0f19a81E6d;

    event FeesCollected(uint256 xaveProfit, uint256 balancerProfit);

    function disperseFees(IERC20 token) external {
        uint256 tokenBalance = token.balanceOf(address(this));
        require(tokenBalance > 0, 'FeesDistributor/zero-balance: Contract has zero balance for specified token');

        uint256 balancerProfit = tokenBalance / 2;
        uint256 xaveProfit = tokenBalance / 2;

        token.transfer(BALANCER_FEE_COLLECTOR, balancerProfit);
        token.transfer(XAVE_FEES_COLLECTOR, xaveProfit);

        emit FeesCollected(xaveProfit, balancerProfit);
    }
}
