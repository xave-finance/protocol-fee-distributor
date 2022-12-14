// SPDX-License-Identifier: MIT
pragma solidity =0.8.6;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PolygonProtocolFeesDistributor {
	address immutable BALANCER_FEES_TREASURY = 0xce88686553686DA562CE7Cea497CE749DA109f9F;
	address immutable XAVE_FEES_COLLECTOR = 0x5560659d9a4aB330dE2112fc8Ee0989857197728;

	function disperseFees(IERC20 token) external {
		uint256 tokenBalance = token.balanceOf(address(this));
		require(tokenBalance > 0, 'Zero fees collected for specified token');

		uint256 balancerProfit = tokenBalance / 2;
		uint256 xaveProfit = tokenBalance / 2;

		token.approve((address(this)), tokenBalance);

		token.transferFrom(address(this), BALANCER_FEES_TREASURY, balancerProfit);
		token.transferFrom(address(this), XAVE_FEES_COLLECTOR, xaveProfit);
	}
}
