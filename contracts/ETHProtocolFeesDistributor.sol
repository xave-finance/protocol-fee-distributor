// SPDX-License-Identifier: MIT
pragma solidity =0.8.6;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract ETHProtocolFeesDistributor {
	address immutable BALANCER_FEES_TREASURY = 0xce88686553686DA562CE7Cea497CE749DA109f9F;
	address immutable XAVE_FEES_COLLECTOR = 0xCE82E4d8e1D1908ca42287D31b9A617a2dCB33DC;

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
