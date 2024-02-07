import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CooldownInitiated,
  CooldownPeriodUpdated,
  DepositWithdrawn,
  Deposited,
  FarmClosed,
  FarmPaused,
  FarmStartTimeUpdated,
  FundsRecovered,
  Initialized,
  OwnershipTransferred,
  PoolFeeCollected,
  PoolUnsubscribed,
  RecoveredERC20,
  RewardAdded,
  RewardRateUpdated,
  RewardTokenAdded,
  RewardsClaimed,
  TokenManagerUpdated
} from "../generated/UniV3Farm/UniV3Farm"

export function createCooldownInitiatedEvent(
  account: Address,
  tokenId: BigInt,
  expiryDate: BigInt
): CooldownInitiated {
  let cooldownInitiatedEvent = changetype<CooldownInitiated>(newMockEvent())

  cooldownInitiatedEvent.parameters = new Array()

  cooldownInitiatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  cooldownInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  cooldownInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiryDate",
      ethereum.Value.fromUnsignedBigInt(expiryDate)
    )
  )

  return cooldownInitiatedEvent
}

export function createCooldownPeriodUpdatedEvent(
  oldCooldownPeriod: BigInt,
  newCooldownPeriod: BigInt
): CooldownPeriodUpdated {
  let cooldownPeriodUpdatedEvent = changetype<CooldownPeriodUpdated>(
    newMockEvent()
  )

  cooldownPeriodUpdatedEvent.parameters = new Array()

  cooldownPeriodUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldCooldownPeriod",
      ethereum.Value.fromUnsignedBigInt(oldCooldownPeriod)
    )
  )
  cooldownPeriodUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newCooldownPeriod",
      ethereum.Value.fromUnsignedBigInt(newCooldownPeriod)
    )
  )

  return cooldownPeriodUpdatedEvent
}

export function createDepositWithdrawnEvent(
  account: Address,
  tokenId: BigInt,
  startTime: BigInt,
  liquidity: BigInt,
  totalRewardsClaimed: Array<BigInt>
): DepositWithdrawn {
  let depositWithdrawnEvent = changetype<DepositWithdrawn>(newMockEvent())

  depositWithdrawnEvent.parameters = new Array()

  depositWithdrawnEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  depositWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  depositWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  depositWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  depositWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "totalRewardsClaimed",
      ethereum.Value.fromUnsignedBigIntArray(totalRewardsClaimed)
    )
  )

  return depositWithdrawnEvent
}

export function createDepositedEvent(
  account: Address,
  locked: boolean,
  tokenId: BigInt,
  liquidity: BigInt
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam("locked", ethereum.Value.fromBoolean(locked))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )

  return depositedEvent
}

export function createFarmClosedEvent(): FarmClosed {
  let farmClosedEvent = changetype<FarmClosed>(newMockEvent())

  farmClosedEvent.parameters = new Array()

  return farmClosedEvent
}

export function createFarmPausedEvent(paused: boolean): FarmPaused {
  let farmPausedEvent = changetype<FarmPaused>(newMockEvent())

  farmPausedEvent.parameters = new Array()

  farmPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  )

  return farmPausedEvent
}

export function createFarmStartTimeUpdatedEvent(
  newStartTime: BigInt
): FarmStartTimeUpdated {
  let farmStartTimeUpdatedEvent = changetype<FarmStartTimeUpdated>(
    newMockEvent()
  )

  farmStartTimeUpdatedEvent.parameters = new Array()

  farmStartTimeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newStartTime",
      ethereum.Value.fromUnsignedBigInt(newStartTime)
    )
  )

  return farmStartTimeUpdatedEvent
}

export function createFundsRecoveredEvent(
  account: Address,
  rwdToken: Address,
  amount: BigInt
): FundsRecovered {
  let fundsRecoveredEvent = changetype<FundsRecovered>(newMockEvent())

  fundsRecoveredEvent.parameters = new Array()

  fundsRecoveredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  fundsRecoveredEvent.parameters.push(
    new ethereum.EventParam("rwdToken", ethereum.Value.fromAddress(rwdToken))
  )
  fundsRecoveredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsRecoveredEvent
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

export function createPoolFeeCollectedEvent(
  recipient: Address,
  tokenId: BigInt,
  amt0Recv: BigInt,
  amt1Recv: BigInt
): PoolFeeCollected {
  let poolFeeCollectedEvent = changetype<PoolFeeCollected>(newMockEvent())

  poolFeeCollectedEvent.parameters = new Array()

  poolFeeCollectedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  poolFeeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  poolFeeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "amt0Recv",
      ethereum.Value.fromUnsignedBigInt(amt0Recv)
    )
  )
  poolFeeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "amt1Recv",
      ethereum.Value.fromUnsignedBigInt(amt1Recv)
    )
  )

  return poolFeeCollectedEvent
}

export function createPoolUnsubscribedEvent(
  account: Address,
  fundId: i32,
  depositId: BigInt,
  startTime: BigInt,
  totalRewardsClaimed: Array<BigInt>
): PoolUnsubscribed {
  let poolUnsubscribedEvent = changetype<PoolUnsubscribed>(newMockEvent())

  poolUnsubscribedEvent.parameters = new Array()

  poolUnsubscribedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  poolUnsubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "fundId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundId))
    )
  )
  poolUnsubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  poolUnsubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  poolUnsubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "totalRewardsClaimed",
      ethereum.Value.fromUnsignedBigIntArray(totalRewardsClaimed)
    )
  )

  return poolUnsubscribedEvent
}

export function createRecoveredERC20Event(
  token: Address,
  amount: BigInt
): RecoveredERC20 {
  let recoveredErc20Event = changetype<RecoveredERC20>(newMockEvent())

  recoveredErc20Event.parameters = new Array()

  recoveredErc20Event.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  recoveredErc20Event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return recoveredErc20Event
}

export function createRewardAddedEvent(
  rwdToken: Address,
  amount: BigInt
): RewardAdded {
  let rewardAddedEvent = changetype<RewardAdded>(newMockEvent())

  rewardAddedEvent.parameters = new Array()

  rewardAddedEvent.parameters.push(
    new ethereum.EventParam("rwdToken", ethereum.Value.fromAddress(rwdToken))
  )
  rewardAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardAddedEvent
}

export function createRewardRateUpdatedEvent(
  rwdToken: Address,
  oldRewardRate: Array<BigInt>,
  newRewardRate: Array<BigInt>
): RewardRateUpdated {
  let rewardRateUpdatedEvent = changetype<RewardRateUpdated>(newMockEvent())

  rewardRateUpdatedEvent.parameters = new Array()

  rewardRateUpdatedEvent.parameters.push(
    new ethereum.EventParam("rwdToken", ethereum.Value.fromAddress(rwdToken))
  )
  rewardRateUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldRewardRate",
      ethereum.Value.fromUnsignedBigIntArray(oldRewardRate)
    )
  )
  rewardRateUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newRewardRate",
      ethereum.Value.fromUnsignedBigIntArray(newRewardRate)
    )
  )

  return rewardRateUpdatedEvent
}

export function createRewardTokenAddedEvent(
  rwdToken: Address,
  rwdTokenManager: Address
): RewardTokenAdded {
  let rewardTokenAddedEvent = changetype<RewardTokenAdded>(newMockEvent())

  rewardTokenAddedEvent.parameters = new Array()

  rewardTokenAddedEvent.parameters.push(
    new ethereum.EventParam("rwdToken", ethereum.Value.fromAddress(rwdToken))
  )
  rewardTokenAddedEvent.parameters.push(
    new ethereum.EventParam(
      "rwdTokenManager",
      ethereum.Value.fromAddress(rwdTokenManager)
    )
  )

  return rewardTokenAddedEvent
}

export function createRewardsClaimedEvent(
  account: Address,
  fundId: i32,
  tokenId: BigInt,
  liquidity: BigInt,
  fundLiquidity: BigInt,
  rewardAmount: Array<BigInt>
): RewardsClaimed {
  let rewardsClaimedEvent = changetype<RewardsClaimed>(newMockEvent())

  rewardsClaimedEvent.parameters = new Array()

  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "fundId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundId))
    )
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "fundLiquidity",
      ethereum.Value.fromUnsignedBigInt(fundLiquidity)
    )
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigIntArray(rewardAmount)
    )
  )

  return rewardsClaimedEvent
}

export function createTokenManagerUpdatedEvent(
  rwdToken: Address,
  oldTokenManager: Address,
  newTokenManager: Address
): TokenManagerUpdated {
  let tokenManagerUpdatedEvent = changetype<TokenManagerUpdated>(newMockEvent())

  tokenManagerUpdatedEvent.parameters = new Array()

  tokenManagerUpdatedEvent.parameters.push(
    new ethereum.EventParam("rwdToken", ethereum.Value.fromAddress(rwdToken))
  )
  tokenManagerUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldTokenManager",
      ethereum.Value.fromAddress(oldTokenManager)
    )
  )
  tokenManagerUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newTokenManager",
      ethereum.Value.fromAddress(newTokenManager)
    )
  )

  return tokenManagerUpdatedEvent
}
