// SPDX-License-Identifier: MIT
pragma solidity =0.8.6;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PolygonProtocolFeesDistributor {
    address immutable BALANCER_FEE_COLLECTOR = 0xce88686553686DA562CE7Cea497CE749DA109f9F;
    address immutable XAVE_FEES_COLLECTOR = 0x5560659d9a4aB330dE2112fc8Ee0989857197728;

    event FeesCollected(uint256 xaveProfit, uint256 balancerProfit);

    function disperseFees(IERC20 token) external {
        uint256 tokenBalance = token.balanceOf(address(this));
        require(tokenBalance > 0, 'FeesDistributor/zero-balance');

        uint256 balancerProfit = tokenBalance / 2;
        uint256 xaveProfit = tokenBalance / 2;

        token.transfer(BALANCER_FEE_COLLECTOR, balancerProfit);
        token.transfer(XAVE_FEES_COLLECTOR, xaveProfit);

        emit FeesCollected(xaveProfit, balancerProfit);
    }
}
