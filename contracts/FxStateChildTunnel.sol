// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {FxBaseChildTunnel} from "./tunnel/FxBaseChildTunnel.sol";
import "./lib/Const.sol";

/**
 * @title FxStateChildTunnel
 */
contract FxStateChildTunnel is FxBaseChildTunnel, Const {
    uint256 public latestStateId;
    address public latestRootMessageSender;
    bytes public latestData;

    uint256 public price;

    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {}

    function _processMessageFromRoot(
        uint256 stateId,
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        latestStateId = stateId;
        latestRootMessageSender = sender;
        latestData = data;
        uint256 _datatype = abi.decode(data, (uint256));
        if(_datatype == UPDATE_PRICE) {
            (, price) = abi.decode(data, (uint256, uint256));
        }

    }

    function sendMessageToRoot(bytes memory message) public {
        _sendMessageToRoot(message);
    }
}
