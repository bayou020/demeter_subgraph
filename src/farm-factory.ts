import {
  FarmDeployerRegistered as FarmDeployerRegisteredEvent,
  FarmDeployerRemoved as FarmDeployerRemovedEvent,
  FarmRegistered as FarmRegisteredEvent,
  FeeParamsUpdated as FeeParamsUpdatedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PrivilegeUpdated as PrivilegeUpdatedEvent
} from "../generated/FarmFactory/FarmFactory"
import {
  FarmDeployerRegistered,
  FarmDeployerRemoved,
  FarmRegistered,
  FeeParamsUpdated,
  InitializedFactory,
  OwnershipTransferred,
  PrivilegeUpdated,
  TransactionData
} from "../generated/schema"

export function handleFarmDeployerRegistered(
  event: FarmDeployerRegisteredEvent
): void {
  let entity = new FarmDeployerRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let transaction = new TransactionData(event.transaction.hash)
  entity.deployer = event.params.deployer

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash
  entity.TransactionData = transaction.id;
  transaction.save()
  entity.save()
}

export function handleFarmDeployerRemoved(
  event: FarmDeployerRemovedEvent
): void {
  let entity = new FarmDeployerRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.deployer = event.params.deployer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFarmRegistered(event: FarmRegisteredEvent): void {
  let entity = new FarmRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farm = event.params.farm
  entity.creator = event.params.creator
  entity.deployer = event.params.deployer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeParamsUpdated(event: FeeParamsUpdatedEvent): void {
  let entity = new FeeParamsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new InitializedFactory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let transaction = new TransactionData(event.transaction.hash)
  entity.version = event.params.version

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash
  entity.TransactionData = transaction.id;

  transaction.save()

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

export function handlePrivilegeUpdated(event: PrivilegeUpdatedEvent): void {
  let entity = new PrivilegeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.deployer = event.params.deployer
  entity.privilege = event.params.privilege

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
