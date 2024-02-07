import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DiscountedFeeUpdated,
  FarmCreated,
  FarmImplementationUpdated,
  FeeCollected,
  OwnershipTransferred
} from "../generated/UniV3FarmDeployer/UniV3FarmDeployer"

export function createDiscountedFeeUpdatedEvent(
  oldDiscountedFee: BigInt,
  newDiscountedFee: BigInt
): DiscountedFeeUpdated {
  let discountedFeeUpdatedEvent = changetype<DiscountedFeeUpdated>(
    newMockEvent()
  )

  discountedFeeUpdatedEvent.parameters = new Array()

  discountedFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldDiscountedFee",
      ethereum.Value.fromUnsignedBigInt(oldDiscountedFee)
    )
  )
  discountedFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDiscountedFee",
      ethereum.Value.fromUnsignedBigInt(newDiscountedFee)
    )
  )

  return discountedFeeUpdatedEvent
}

export function createFarmCreatedEvent(
  farm: Address,
  creator: Address,
  admin: Address
): FarmCreated {
  let farmCreatedEvent = changetype<FarmCreated>(newMockEvent())

  farmCreatedEvent.parameters = new Array()

  farmCreatedEvent.parameters.push(
    new ethereum.EventParam("farm", ethereum.Value.fromAddress(farm))
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return farmCreatedEvent
}

export function createFarmImplementationUpdatedEvent(
  newFarmImplementation: Address
): FarmImplementationUpdated {
  let farmImplementationUpdatedEvent = changetype<FarmImplementationUpdated>(
    newMockEvent()
  )

  farmImplementationUpdatedEvent.parameters = new Array()

  farmImplementationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFarmImplementation",
      ethereum.Value.fromAddress(newFarmImplementation)
    )
  )

  return farmImplementationUpdatedEvent
}

export function createFeeCollectedEvent(
  creator: Address,
  token: Address,
  amount: BigInt,
  claimable: boolean
): FeeCollected {
  let feeCollectedEvent = changetype<FeeCollected>(newMockEvent())

  feeCollectedEvent.parameters = new Array()

  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("claimable", ethereum.Value.fromBoolean(claimable))
  )

  return feeCollectedEvent
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
