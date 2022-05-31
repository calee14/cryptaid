// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";

contract Swapper {
    address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;

    IUniswapV2Router02 public uniswapRouter;
    address private daiRinkeby = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;

    constructor() {
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }

    function convertEthToToken(uint daiAmount, address _token) public payable {
        uint deadline = block.timestamp + 15; // give some padding for the transaction to complete
        uniswapRouter.swapETHForExactTokens{ value: msg.value }(daiAmount, getPathForETHtoToken(_token), msg.sender, deadline);
    
        // refund leftover ETH to user
        (bool success,) = msg.sender.call{ value: address(this).balance }("");
        require(success, "refund failed");
    }
  
    function getEstimatedETHforToken(uint daiAmount, address _token) public view returns (uint[] memory) {
        return uniswapRouter.getAmountsIn(daiAmount, getPathForETHtoToken(_token));
    }

    function getPathForETHtoToken(address _token) private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = _token;
    
        return path;
    }
  
    // important to receive ETH
    receive() payable external {}
}