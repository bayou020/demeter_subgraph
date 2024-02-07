import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FarmDeployerRegistered,
  FarmDeployerRemoved,
  FarmRegistered,
  FeeParamsUpdated,
  Initialized,
  OwnershipTransferred,
  PrivilegeUpdated
} from "../generated/FarmFactory/FarmFactory"

export function createFarmDeployerRegisteredEvent(
  deployer: Address
): FarmDeployerRegistered {
  let farmDeployerRegisteredEvent = changetype<FarmDeployerRegistered>(
    newMockEvent()
  )

  farmDeployerRegisteredEvent.parameters = new Array()

  farmDeployerRegisteredEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )

  return farmDeployerRegisteredEvent
}

export function createFarmDeployerRemovedEvent(
  deployer: Address
): FarmDeployerRemoved {
  let farmDeployerRemovedEvent = changetype<FarmDeployerRemoved>(newMockEvent())

  farmDeployerRemovedEvent.parameters = new Array()

  farmDeployerRemovedEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )

  return farmDeployerRemovedEvent
}

export function createFarmRegisteredEvent(
  farm: Address,
  creator: Address,
  deployer: Address
): FarmRegistered {
  let farmRegisteredEvent = changetype<FarmRegistered>(newMockEvent())

  farmRegisteredEvent.parameters = new Array()

  farmRegisteredEvent.parameters.push(
    new ethereum.EventParam("farm", ethereum.Value.fromAddress(farm))
  )
  farmRegisteredEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  farmRegisteredEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )

  return farmRegisteredEvent
}

export function createFeeParamsUpdatedEvent(
  receiver: Address,
  token: Address,
  amount: BigInt
): FeeParamsUpdated {
  let feeParamsUpdatedEvent = changetype<FeeParamsUpdated>(newMockEvent())

  feeParamsUpdatedEvent.parameters = new Array()

  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feeParamsUpdatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPrivilegeUpdatedEvent(
  deployer: Address,
  privilege: boolean
): PrivilegeUpdated {
  let privilegeUpdatedEvent = changetype<PrivilegeUpdated>(newMockEvent())

  privilegeUpdatedEvent.parameters = new Array()

  privilegeUpdatedEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )
  privilegeUpdatedEvent.parameters.push(
    new ethereum.EventParam("privilege", ethereum.Value.fromBoolean(privilege))
  )

  return privilegeUpdatedEvent
}
