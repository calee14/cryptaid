// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

// temp eth address: 0xe712d4adCEd452954eFf9846982fd043EB0Ee02C

contract AidStorage {

    struct NftUnit {
        string imgUrl;
        string raribleUrl;
        string price;
    }

    struct MilestoneUnit {
        string description;
        bool status;
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
    mapping (uint => NftUnit[]) public orgNfts;
    mapping (uint => MilestoneUnit[]) public orgMilestones;

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

    function addMilestonesFor(uint orgId, MilestoneUnit[] calldata newMilestones) public {
        require(orgId >= 0 && orgId < numOrganizations,
            "The organization you are searching for does not exist");
        require(msg.sender == orgs[orgId].ownerEthAddress, 
            "You do not have access to this organization");

        MilestoneUnit[] storage currMilestones = orgMilestones[orgId];
        for(uint i=0; i<newMilestones.length;i++) {
            currMilestones.push(newMilestones[i]);
        }
    }

    function removeMilestonesFor(uint orgId, uint[] calldata indices) public {
        require(orgId >= 0 && orgId < numOrganizations,
            "The organization you are searching for does not exist");
        require(msg.sender == orgs[orgId].ownerEthAddress, 
            "You do not have access to this organization");
        MilestoneUnit[] storage currMilestones = orgMilestones[orgId];
        for(uint i=0;i<indices.length;i++) {
            uint rmIdx = indices[i];
            require(rmIdx >= 0 && rmIdx < currMilestones.length,
            "The organization you are searching for does not exist");
            delete currMilestones[rmIdx];
        }
    }

    /* addNftUnitsFor
    @params:
        uint orgId - id of the organization we want to access
        NftUnit[] _nfts - array of Nfts that have been minted (pass to param through struct formatting
                            which looks like [string, string string])
    @returns:
        void - updates the nft array for the mapping of org. Nfts
    */
    function addNftUnitsFor(uint orgId, NftUnit[] calldata _nfts) public {
        require(orgId >= 0 && orgId < numOrganizations,
            "The organization you are searching for does not exist");
        require(msg.sender == orgs[orgId].ownerEthAddress);
        require(_nfts.length > 0, "Not enough data in Nft array");
        NftUnit[] storage _orgNfts = orgNfts[orgId];
        for(uint i=0;i<_nfts.length;i++) {
            _orgNfts.push(_nfts[i]);
        }
    }

}
