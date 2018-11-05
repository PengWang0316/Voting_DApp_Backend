pragma solidity ^0.4.24;

contract Vote {
    // The user struct to keep users information
    struct user {
        string name;
        string password;
        string photo;
        // string username;
        uint vote_id;
        bool isExisted;
    }
    mapping(string => user) users; // Mapping user's id to a user structure.

    mapping(uint => uint) candidates; // Mapping a candidates array to keep the vote number.

    // Use a constructor to initialize the candidates map.
    constructor() public {
        // In reality this candidate struct will be filled by outside inputers.
        // Here we just give them two candidates' ids to simplify the process.
        candidates[2] = 0;
        candidates[3] = 0;
    }

    // Adde a new user. In this case, we can use a ssn for the user id to ensure the id will not be duplicated.
    function addUser(string userId, string password, string name, string photo) public {
        require(isEmptyString(userId) == false, "A user id has to be supplied.");
        require(isEmptyString(password) == false, "A password has to be supplied.");
        require(isEmptyString(name) == false, "A name has to be supplied.");
        require(isEmptyString(photo) == false, "A photo has to be supplied.");
        require(users[userId].isExisted == false, "The user id has already been taken."); // check whether the same user id has already existed.

        users[userId].password = password;
        users[userId].name = name;
        users[userId].photo = photo;
        // users[userId].vote_id = 0;
        // users[userId].username = userId; // save the user id to username to allow front-end shares code.
        users[userId].isExisted = true;
    }

    function fetchUser(string userId) public view returns (string, string, string, string, uint) {
        return (userId, users[userId].name, users[userId].password, users[userId].photo, users[userId].vote_id);
    }

    function vote(uint candidateId, string userId) public {
        require(users[userId].vote_id == 0, "This user has already voted.");
        users[userId].vote_id = candidateId;
        candidates[candidateId] += 1;
    }

    function countVote(uint candidateId) public view returns (uint) {
        return candidates[candidateId];
    }

    /**
    * Test wether a string is empty.
    */
    function isEmptyString(string str) private pure returns (bool) {
        bytes memory tempStr = bytes(str);
        return tempStr.length == 0 ? true : false;
    }

}
