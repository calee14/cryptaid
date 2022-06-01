// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;
// smart contract owner: 0xe712d4adCEd452954eFf9846982fd043EB0Ee02C
// smart contract address: 0x4cbb99D05560C82A32aB9CA45d836Dc791F3d041

import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";

contract Swapper {
    address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;

    IUniswapV2Router02 public UniswapRouter;
    address private daiRinkeby = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;

    constructor() {
        UniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }

    function convertEthToToken(uint daiAmount, address _token) public payable {
        uint deadline = block.timestamp + 15; // give some padding for the transaction to complete
        UniswapRouter.swapETHForExactTokens{ value: msg.value }(daiAmount, getPathForETHtoToken(_token), msg.sender, deadline);
    
        // refund leftover ETH to user
        (bool status,) = msg.sender.call{ value: address(this).balance }("");
        require(status, "could not refund");
    }
  
    function getEstimatedETHforToken(uint tokenAmount, address _token) public view returns (uint[] memory) {
        return UniswapRouter.getAmountsIn(tokenAmount, getPathForETHtoToken(_token));
    }

    function getPathForETHtoToken(address _token) private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = UniswapRouter.WETH();
        path[1] = _token;
    
        return path;
    }
  
    // important to receive ETH
    receive() payable external {}
}
