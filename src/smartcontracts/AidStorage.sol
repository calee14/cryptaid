// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract AidStorage {

    struct NftUnit {
        string imgUrl;
        string raribleUrl;
        string price;
    }

    // struct object of an organization
    struct Organization {
        string title; // org. title
        string user;  // org. owner's username
        string location; // org.'s location
        string imgUrl; // org.'s thumbnail image url
        string goal; // org.'s goal (in eth)
        string donated; // org.'s amount donations received (in eth)
        string description; // the org.'s description
        address ownerEthAddress; // org.'s owner eth address
        string[] milestones; // org.'s milestones
        bool[] progress; // the progress of each milestone
    }

    uint public numOrganizations; 
    // public dynamic array of all organizations
    Organization[] public orgs;
    mapping (uint => NftUnit[]) orgNfts;

    constructor() {

    }

    function createOrganiation(string memory _title, string memory _user, string memory _location, 
                            string memory _imgUrl, string memory _goal, string memory _donated, 
                            string memory _description, address _ownerEthAddress) public {
        Organization memory newOrg;
        newOrg.title = _title;
        newOrg.user = _user;
        newOrg.location = _location;
        newOrg.imgUrl = _imgUrl;
        newOrg.goal = _goal;
        newOrg.donated = _donated;
        newOrg.description = _description;
        newOrg.ownerEthAddress = _ownerEthAddress;
        orgs.push(newOrg);
        numOrganizations++;
    }

    function addMilestonesFor(uint orgId, string[] calldata _milestones, 
                            bool[] calldata _progress) public {
        require(_milestones.length == _progress.length, 
            "The lengths of milestones and progress are not the same.");
        require(msg.sender == orgs[orgId].ownerEthAddress, 
            "You do not have access to this organization");

        Organization storage newOrg = orgs[orgId];
        for(uint i; i<_milestones.length;i++) {
            newOrg.milestones.push(_milestones[i]);
            newOrg.progress.push(_progress[i]);
        }
    }

    function addNftUnitsFor(uint orgId, NftUnit[] calldata _nfts) public {
        require(msg.sender == orgs[orgId].ownerEthAddress);
        require(_nfts.length > 0, "Not enough data in Nft array");
        NftUnit[] storage _orgNfts = orgNfts[orgId];
        for(uint i=0;i<_nfts.length;i++) {
            _orgNfts.push(_nfts[i]);
        }
    }

}
