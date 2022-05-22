pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AidToken is ERC721, ERC721Enumerable, ERC721URIStorage {
    using SafeMath for uint256;
    uint public constant mintPrice = 0;

    function _beforeTokenTransfer(address from, address to, uint256 tokenID) 
    internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenID);
    }

    function _burn(uint256 tokenID) internal override(ERC721, ERC721URIStorage)
    {
        // super calls the right most parent??
        super._burn(tokenID);
    }
    function tokenURI(uint256 tokenID) public view override(ERC721, ERC721URIStorage) 
    returns(string memory)
    {
        return super.tokenURI(tokenID);
    }

    function supportsInterface(bytes4 interfaceID) public view override(ERC721, ERC721Enumerable)
    returns(bool)
    {
        return super.supportsInterface(interfaceID);
    }

    constructor() ERC721("AidToken", "Aid") { }

    function mint(string memory _uri) public payable {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, _uri);
    }
}