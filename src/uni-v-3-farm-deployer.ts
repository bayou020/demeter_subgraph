import {
  DiscountedFeeUpdated as DiscountedFeeUpdatedEvent,
  FarmCreated as FarmCreatedEvent,
  FarmImplementationUpdated as FarmImplementationUpdatedEvent,
  FeeCollected as FeeCollectedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/UniV3FarmDeployer/UniV3FarmDeployer"
import {
  DiscountedFeeUpdated,
  FarmCreated,
  FarmImplementationUpdated,
  FeeCollected,
  OwnershipTransferred
} from "../generated/schema"
import { UniV3Farm } from "../generated/templates";
export function handleDiscountedFeeUpdated(
  event: DiscountedFeeUpdatedEvent
): void {
  let entity = new DiscountedFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldDiscountedFee = event.params.oldDiscountedFee
  entity.newDiscountedFee = event.params.newDiscountedFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFarmCreated(event: FarmCreatedEvent): void {
  let entity = new FarmCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farm = event.params.farm
  entity.creator = event.params.creator
  entity.admin = event.params.admin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  UniV3Farm.create(event.params.farm)
  entity.save()
}

export function handleFarmImplementationUpdated(
  event: FarmImplementationUpdatedEvent
): void {
  let entity = new FarmImplementationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFarmImplementation = event.params.newFarmImplementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeCollected(event: FeeCollectedEvent): void {
  let entity = new FeeCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.claimable = event.params.claimable

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
