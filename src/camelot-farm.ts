import {
  BigInt,
  BigDecimal,
  Address,
  log,
  Bytes,
  store,
} from "@graphprotocol/graph-ts";
import {
  CamelotFarm as CamelotFarmTemplate,
  CooldownInitiated as CooldownInitiatedEvent,
  CooldownPeriodUpdated as CooldownPeriodUpdatedEvent,
  DepositWithdrawn as DepositWithdrawnEvent,
  Deposited as DepositedEvent,
  FarmClosed as FarmClosedEvent,
  FarmPaused as FarmPausedEvent,
  FarmStartTimeUpdated as FarmStartTimeUpdatedEvent,
  FundsRecovered as FundsRecoveredEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PoolRewardsCollected as PoolRewardsCollectedEvent,
  PoolUnsubscribed as PoolUnsubscribedEvent,
  RecoveredERC20 as RecoveredERC20Event,
  RewardAdded as RewardAddedEvent,
  RewardRateUpdated as RewardRateUpdatedEvent,
  RewardTokenAdded as RewardTokenAddedEvent,
  RewardsClaimed as RewardsClaimedEvent,
  TokenManagerUpdated as TokenManagerUpdatedEvent,
} from "../generated/templates/CamelotFarm/CamelotFarm";
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
  PoolRewardsCollected,
  PoolUnsubscribed,
  RecoveredERC20,
  RewardAdded,
  RewardRateUpdated,
  RewardTokenAdded,
  RewardsClaimed,
  TokenManagerUpdated,
  Token,
  FarmInfo,
  TransactionData,
  RewardData,
  Metadata,
  CamelotMetadata,
  Deposit,
  Withdraw,
  FarmStat,
} from "../generated/schema";
import { NftPoolCamelot } from "../generated/templates/CamelotFarm/NftPoolCamelot";
import { camelotPair } from "../generated/templates/CamelotFarm/camelotPair";
import { erc20 } from "../generated/templates/CamelotFarm/erc20";
import {
  timestampConvertDateTime,
  digitsConvert,
  timestampConvertDate,
  tokenMapping,
  getTokenNames,
  getTokenDecimals,
  calculateTokenPrice,
  getCamelotTokenAddress,
  getCamelotPairPrice,
} from "./utilis/utils";

export function handleCooldownInitiated(event: CooldownInitiatedEvent): void {
  let entity = new CooldownInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.tokenId = event.params.tokenId;
  entity.expiryDate = event.params.expiryDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCooldownPeriodUpdated(
  event: CooldownPeriodUpdatedEvent
): void {
  let entity = new CooldownPeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldCooldownPeriod = event.params.oldCooldownPeriod;
  entity.newCooldownPeriod = event.params.newCooldownPeriod;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDepositWithdrawn(event: DepositWithdrawnEvent): void {
  let entity = new DepositWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.tokenId = event.params.tokenId;
  entity.startTime = event.params.startTime;
  entity.liquidity = event.params.liquidity;
  entity.totalRewardsClaimed = event.params.totalRewardsClaimed;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposited(event: DepositedEvent): void {
  let transaction = new TransactionData(event.transaction.hash);

  let deposit = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let farm = FarmInfo.load(event.address);
  if (!farm) {
    farm = new FarmInfo(event.address);
  }


  deposit.farm=event.address
  
  deposit.user = event.params.account;
  deposit.locked = event.params.locked;
  deposit.tokenId = event.params.tokenId;
  deposit.liquidity = event.params.liquidity;
  deposit.depositId = Bytes.fromI32(event.params.tokenId.toI32());
  deposit.TransactionData = transaction.id;

  transaction.blockNumber = event.block.number;
  transaction.blockTimestamp = event.block.timestamp;
  transaction.transactionHash = event.transaction.hash;


  deposit.save();
  transaction.save();

}

export function handleFarmStartTimeUpdated(
  event: FarmStartTimeUpdatedEvent
): void {
  let entity = new FarmStartTimeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newStartTime = event.params.newStartTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFundsRecovered(event: FundsRecoveredEvent): void {
  let entity = new FundsRecovered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.rwdToken = event.params.rwdToken;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let metadata = new Metadata(event.address)
  let camelotMetadata = new CamelotMetadata(event.address)
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let farm = FarmInfo.load(event.address);
  if (!farm) {
    farm = new FarmInfo(event.address);
  }

  let stat = FarmStat.load(event.address);
  if (!stat) {
    stat = new FarmStat(event.address);
 
  }
  let token0Array = new Array<string>(0);
  let token1Array = new Array<string>(0);
  let farmsArray = new Array<Bytes>(0);

  let transaction = new TransactionData(event.transaction.hash);
  let contract = CamelotFarmTemplate.bind(event.address);
  let nftPoolFactory = NftPoolCamelot.bind(contract.nftPool());

  let getLpInfo = nftPoolFactory.getPoolInfo();
  let pairContract = camelotPair.bind(
    Address.fromBytes(getLpInfo.getLpToken())
  );

  camelotMetadata.farm=event.address;
  camelotMetadata.poolAddress=contract.nftPool();
  camelotMetadata.lpToken=getLpInfo.getLpToken();
  camelotMetadata.metadata=metadata.id;

  token0Array.push(pairContract.token0().toHex());
  token1Array.push(pairContract.token1().toHex());
  let ercToken0 = erc20.bind(Address.fromString(token0Array.at(0)));
  let ercToken1 = erc20.bind(Address.fromString(token1Array.at(0)));
  let token0 = Token.load(
    Bytes.fromHexString(token0Array.at(0))
  );
  let token1 = Token.load(
    Bytes.fromHexString(token1Array.at(0))
  );
  if (!token0) {
    token0 = new Token(
      Bytes.fromHexString(token0Array.at(0))
    );
    token0.farm = new Array<Bytes>(0);
  }
  if (!token1) {
    token1 = new Token(
      Bytes.fromHexString(token1Array.at(0)));
      token1.farm = new Array<Bytes>(0);
  }

  farmsArray.push(farm.id);
  token0.farm = farmsArray;
  token1.farm = farmsArray;
  token0.address = Address.fromHexString(token0Array.at(0));
  token1.address = Address.fromHexString(token1Array.at(0));
  token0.symbol = getTokenNames(ercToken0);
  token1.symbol = getTokenNames(ercToken1);
  token0.decimals = BigInt.fromString(getTokenDecimals(ercToken0));
  token1.decimals = BigInt.fromString(getTokenDecimals(ercToken1));

  stat.farm = event.address;  
  stat.status = "Active"; 



  entity.version = event.params.version;
  farm.farmAddress = event.address;
  farm.version = event.params.version;
  farm.versionName = "Camelot V2";
  farm.startTime = contract.farmStartTime();
  farm.cooldownPeriod = contract.cooldownPeriod();
  // farm.status = stat.id;
  camelotMetadata.tokens = [token0.id, token1.id];
  farm.farmName = token0.symbol.concat("/").concat(token1.symbol);
  farm.metadata =metadata.id
  transaction.blockNumber = event.block.number;
  transaction.blockTimestamp = event.block.timestamp;
  transaction.transactionHash = event.transaction.hash;
  farm.TransactionData = transaction.id;
  entity.TransactionData = transaction.id;




  camelotMetadata.save();
  metadata.save();
  transaction.save();
  entity.save();
  farm.save();
  token0.save();
  token1.save();
  stat.save();

}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePoolRewardsCollected(
  event: PoolRewardsCollectedEvent
): void {
  let entity = new PoolRewardsCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipient = event.params.recipient;
  entity.tokenId = event.params.tokenId;
  entity.grailAmt = event.params.grailAmt;
  entity.xGrailAmt = event.params.xGrailAmt;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePoolUnsubscribed(event: PoolUnsubscribedEvent): void {
  let entity = new PoolUnsubscribed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.fundId = event.params.fundId;
  entity.depositId = event.params.depositId;
  entity.startTime = event.params.startTime;
  entity.totalRewardsClaimed = event.params.totalRewardsClaimed;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRecoveredERC20(event: RecoveredERC20Event): void {
  let entity = new RecoveredERC20(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRewardAdded(event: RewardAddedEvent): void {
  let entity = new RewardAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let rewardToken = RewardData.load(
    event.params.rwdToken.concat(event.address)
  );
  if (!rewardToken) {
    rewardToken = new RewardData(event.params.rwdToken.concat(event.address));
  }

  rewardToken.addedRewards = event.params.amount
    .div(
      BigInt.fromU32(10).pow(erc20.bind(event.params.rwdToken).decimals() as u8)
    )
    .toBigDecimal();
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  rewardToken.save();
  entity.save();
}

export function handleRewardRateUpdated(event: RewardRateUpdatedEvent): void {
  let transaction = new TransactionData(event.transaction.hash);
  let farmArray = new Array<Bytes>(0);
  let entity = new RewardRateUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let rewardToken = RewardData.load(
    event.params.rwdToken.concat(event.address)
  );
  if (!rewardToken) {
    rewardToken = new RewardData(event.params.rwdToken.concat(event.address));
    rewardToken.addedRewards = BigDecimal.fromString("0");  
    rewardToken.tokenRates = new Array<BigInt>(0);
    rewardToken.farm = new Array<Bytes>(0);
    rewardToken.tokenManager = Bytes.fromI32(0);
  }

 farmArray.push(event.address);
rewardToken.farm=farmArray;
rewardToken.rewardToken = event.params.rwdToken;
rewardToken.tokenName = erc20.bind(event.params.rwdToken).symbol();  
rewardToken.tokenRates =event.params.newRewardRate

  entity.rwdToken = event.params.rwdToken;
  entity.oldRewardRate = event.params.oldRewardRate;
  entity.newRewardRate = event.params.newRewardRate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  transaction.blockNumber = event.block.number;
  transaction.blockTimestamp = event.block.timestamp;
  transaction.transactionHash = event.transaction.hash;
  rewardToken.TransactionData = transaction.id;
  transaction.save();

  entity.save();
  rewardToken.save();
}

export function handleRewardTokenAdded(event: RewardTokenAddedEvent): void {
  let rewardTokens = new Array<Bytes>(0);
  let transaction = new TransactionData(event.transaction.hash);
  let entity = new RewardTokenAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let rewardToken = RewardData.load(
    event.params.rwdToken.concat(event.address)
  );
  if (!rewardToken) {
    rewardToken = new RewardData(event.params.rwdToken.concat(event.address));
    rewardToken.addedRewards = BigDecimal.fromString("0");
    rewardToken.tokenRates = new Array<BigInt>(0);

  }
  rewardToken.rewardToken = event.params.rwdToken;
  rewardTokens.push(event.address);
  rewardToken.farm =rewardTokens
  rewardToken.tokenManager = event.params.rwdTokenManager;
  rewardToken.tokenName = erc20.bind(event.params.rwdToken).symbol();
  transaction.blockNumber = event.block.number;
  transaction.blockTimestamp = event.block.timestamp;
  transaction.transactionHash = event.transaction.hash;
  rewardToken.TransactionData = transaction.id;

  entity.rwdToken = event.params.rwdToken;
  entity.rwdTokenManager = event.params.rwdTokenManager;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  rewardToken.save();
  transaction.save();
}

export function handleRewardsClaimed(event: RewardsClaimedEvent): void {
  let entity = new RewardsClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.fundId = event.params.fundId;
  entity.tokenId = event.params.tokenId;
  entity.liquidity = event.params.liquidity;
  entity.fundLiquidity = event.params.fundLiquidity;
  entity.rewardAmount = event.params.rewardAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenManagerUpdated(
  event: TokenManagerUpdatedEvent
): void {
  let entity = new TokenManagerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.rwdToken = event.params.rwdToken;
  entity.oldTokenManager = event.params.oldTokenManager;
  entity.newTokenManager = event.params.newTokenManager;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
