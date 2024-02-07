import {
  BigInt,
  Address,
  log,
  TypedMap,
  TypedMapEntry,
  BigDecimal,
  Bytes,
} from "@graphprotocol/graph-ts";
// import { Farm } from "../../generated/templates/Farm/Farm";
// import { FarmV2 } from "../../generated/templates/FarmV2/FarmV2";
import { erc20 } from "../../generated/templates/CamelotFarm/erc20";
// import { NonFungiblePositionManager } from "../../generated/templates/Farm/NonFungiblePositionManager";
import { camelotPair } from "../../generated/templates/CamelotFarm/camelotPair";
const DEFAULT_PRICE_CALCULATE = 18;
//Convert timestamp to Date
export function timestampConvertDateTime(time: BigInt): string {
  let date = new Date(1000 * time.toI32());
  let dateConverted = date
    .toDateString()
    .concat(" ")
    .concat(date.toTimeString());

  return dateConverted;
}

export function timestampConvertDate(time: BigInt): string {
  let date = new Date(1000 * time.toI32());
  let dateConverted = date.toDateString();

  return dateConverted;
}
export function digitsConvert(value: BigInt): BigDecimal {
  let converted = value
    .toBigDecimal()
    .div(BigDecimal.fromString("1000000000000000000"));

  return converted;
}
// export function getTokenAddress(
//   nftm: NonFungiblePositionManager,
//   tokenId: BigInt
// ): Array<Bytes> {
//   let addresses = new Array<Bytes>(0);
//   let contract = nftm.try_positions(tokenId);
//   if (contract.reverted) {
//     log.warning("Token Address Reverted", []);
//     addresses.push(
//       Bytes.fromHexString("0x0000000000000000000000000000000000000000")
//     );
//     addresses.push(
//       Bytes.fromHexString("0x0000000000000000000000000000000000000000")
//     );
//     return addresses;
//   } else {
//     addresses.push(contract.value.getToken0());
//     addresses.push(contract.value.getToken1());
//     return addresses;
//   }
// }

export function getCamelotTokenAddress(pair: camelotPair): Array<Bytes> {
  let addresses = new Array<Bytes>(0);
  addresses.push(pair.token0());
  addresses.push(pair.token1());
  return addresses;
}

export function getTokenNames(erc: erc20): string {
  let contract = erc.try_symbol();
  if (contract.reverted) {
    log.warning("Token Name Reverted", []);
    return "No-Token";
  } else {
    return contract.value;
  }
}
export function getTokenDecimals(erc: erc20): string {
  let contract = erc.try_decimals();
  if (contract.reverted) {
    log.warning("Token Decimals Reverted", []);
    return "No-Decimals";
  } else {
    return contract.value.toString();
  }
}
export function getAmountPrecision(erc: erc20,value:BigInt): BigDecimal {
  let contract = erc.try_decimals();
  if (contract.reverted) {
    log.warning("Token Decimals Reverted", []);
    return BigDecimal.fromString('0');
  } else {
    return value.div(BigInt.fromI32(10).pow(contract.value as u8)).toBigDecimal()  ;
  }
}
export function getCamelotPairPrice(
  pair: camelotPair,
  decimalA: string,
  decimalB: string
): BigDecimal {
  let getReserves = pair.getReserves();
  if (getReserves.get_reserve0() == BigInt.fromI32(0)) {
    return BigDecimal.fromString("0");
  } else {
    return getReserves
    .get_reserve1()
    .div(
      BigInt.fromI32(10).pow(BigInt.fromString(decimalB).toU32() as u8)
    )
    .toBigDecimal()
    .div(
      getReserves
        .get_reserve0()
        .div(
          BigInt.fromI32(10).pow(
            BigInt.fromString(decimalA).toU32() as u8
          )
        )
        .toBigDecimal()
    );;
  }
}
// export function getRewardTokenBalance(farm: Farm, address: string): BigDecimal {
//   let contract = farm.try_getRewardBalance(Address.fromString(address));
//   if (contract.reverted) {
//     log.warning("Token Address Reverted", []);

//     return BigDecimal.fromString("0");
//   } else {
//     return digitsConvert(contract.value);
//   }
// }
// export function getRewardTokenBalanceV2(
//   farm: FarmV2,
//   address: string
// ): BigDecimal {
//   let contract = farm.try_getRewardBalance(Address.fromString(address));
//   if (contract.reverted) {
//     log.warning("Token Address Reverted", []);

//     return BigDecimal.fromString("0");
//   } else {
//     return digitsConvert(contract.value);
//   }
// }
export function calculateTokenPrice(
  sqrtPriceX96: BigInt,
  tokenA: Array<string>,
  tokenB: Array<string>
): BigDecimal {
  let diffDecimals = BigInt.fromI32(0);
  let scale = BigDecimal.fromString("0");
  let tokenAdecimals = BigInt.fromString(tokenA.at(2));
  let tokenBdecimals = BigInt.fromString(tokenB.at(2));
  diffDecimals =
    tokenAdecimals >= tokenBdecimals
      ? tokenAdecimals.div(tokenBdecimals)
      : tokenBdecimals.div(tokenAdecimals);

  scale = diffDecimals.toBigDecimal();
  let b = BigInt.fromI32(2).pow(192).toBigDecimal();
  let price = sqrtPriceX96.pow(2).toBigDecimal().div(b).times(scale);
  return price;
}

// export function calculateTokenAmounts(
//   tickLower: BigInt,
//   tickUpper: BigInt,
//   sqrtPriceX96: BigInt,
//   liquidity: BigInt,
//   tokenA: Array<string>,
//   tokenB: Array<string>
// ): BigDecimal {
//   let diffDecimals = BigInt.fromI32(0);
//   let scale = BigDecimal.fromString("0");
//   let tokenAdecimals = BigInt.fromString(tokenA.at(2));
//   let tokenBdecimals = BigInt.fromString(tokenB.at(2));

//   diffDecimals =
//     tokenAdecimals >= tokenBdecimals
//       ? tokenAdecimals.div(tokenBdecimals)
//       : tokenBdecimals.div(tokenAdecimals);

//   scale = diffDecimals.toBigDecimal();
//   let b = BigInt.fromI32(2).pow(192).toBigDecimal();
//   let price = sqrtPriceX96.pow(2).toBigDecimal().div(b).times(scale);
//   // const [amountA, amountB] = getSeparateAmountOfLiquidity(
//   //   liquidity,
//   //   price,
//   //   tickLower,
//   //   tickUpper,
//   //   tokenAdecimals,
//   //   tokenBdecimals
//   // );

//   return [amountA, amountB];
// }

export function getPriceRange(
  tickLower: BigInt,
  tickUpper: BigInt,
  tokenA: Array<string>,
  tokenB: Array<string>
): Array<BigDecimal> {
  let prices = new Array<BigDecimal>(0);
  let tickLowerN = tickLower.toI32();
  let tickUpperN = tickUpper.toI32();
  let diffDecimals = BigInt.fromI32(0);
  let scale = BigInt.fromString("0");
  let decimalA = BigInt.fromString(tokenA.at(2));
  let decimalB = BigInt.fromString(tokenB.at(2));
  diffDecimals =
    decimalA >= decimalB ? decimalA.minus(decimalB) : decimalB.minus(decimalA);
  scale = BigInt.fromI32(10).pow(diffDecimals.toI32());
  if (tickLowerN > -887220 && tickUpperN < 887220) {
    let price1 = Math.pow(1.0001, tickLowerN) * scale.toI64();
    let price1Bn = BigDecimal.fromString(price1.toString());
    let price2 = Math.pow(1.0001, tickUpperN) * scale.toI64();
    let price2Bn = BigDecimal.fromString(price2.toString());
    prices.push(price1Bn);
    prices.push(price2Bn);
    return prices;
  } else if (tickLowerN <= -887220 && tickUpperN < 887220) {
    let price2 = Math.pow(1.0001, tickUpperN) * scale.toI64();
    let price2Bn = BigDecimal.fromString(price2.toString());
    prices.push(BigDecimal.fromString("0"));
    prices.push(price2Bn);
    return prices;
  } else if (tickLowerN > -887220 && tickUpperN >= 887220) {
    let price1 = Math.pow(1.0001, tickLowerN) * scale.toI64();
    let price2 = Math.pow(1.0001, tickUpperN) * scale.toI64();
    let price2Bn = BigDecimal.fromString(price2.toString());
    let price1Bn = BigDecimal.fromString(price1.toString());
    prices.push(price1Bn);
    prices.push(price2Bn);
    return prices;
  } else {
    let price2 = Math.pow(1.0001, tickUpperN) * scale.toI64();
    let price2Bn = BigDecimal.fromString(price2.toString());
    prices.push(BigDecimal.fromString("0"));
    prices.push(price2Bn);
    return prices;
  }
}

// export function getSeparateAmountOfLiquidity(
//   liquidity: BigInt,
//   perAtoBBn: BigDecimal,
//   tickLower: BigInt,
//   tickUpper: BigInt,
//   tokenA: Array<string>,
//   tokenB: Array<string>,
// ) {
//   let decimalA = BigInt.fromString(tokenA.at(2));
//   let decimalB = BigInt.fromString(tokenB.at(2));
//   let prices= new Array<BigDecimal>(0);
//   let diffDecimals =
//     decimalA >= decimalB ? decimalA.minus(decimalB) : decimalB.minus(decimalA);
//   let scale = BigInt.fromI32(10).pow(diffDecimals.toI32()).toBigDecimal();
//     prices = getPriceRange(
//     tickLower,
//     tickUpper,
//     tokenA,
//     tokenB
//   );
//   let liq = new BigDecimal(liquidity);
//   let result0 = BigDecimal.fromString('0');
//   let result1 =  BigDecimal.fromString('1');
//   let priceLow = prices.at(0)
//   let priceHigh = prices.at(1)

//   if (
//     perAtoBBn>priceLow &&
//     perAtoBBn<(priceHigh)
//   ) {
//     let sqrtPerAtoB = BigDecimal.fromString((sqrt(BigInt.fromString(perAtoBBn.toString()).toI64())).toString())
//     let result0Step1 = priceHigh.bigNumber.sqrt().minus(perAtoBBn.sqrt());
//     let result0Step2 = sqrtPerAtoB.times(priceHigh.bigNumber.sqrt());
//     let result1Step = perAtoBBn.sqrt().minus(priceLow.bigNumber.sqrt());
//     result0 = liq.times(result0Step1.div(result0Step2));
//     result1 = liq.times(result1Step);
//   } else if (perAtoBBn.comparedTo(priceLow.bigNumber) < 0) {
//     let result0Step1 = priceHigh.bigNumber
//       .sqrt()
//       .minus(priceLow.bigNumber.sqrt());
//     let result0Step2 = priceLow.bigNumber
//       .sqrt()
//       .times(priceHigh.bigNumber.sqrt());
//     result0 = liq.times(result0Step1.div(result0Step2));
//     result1 = new BigNumber(0);
//   } else if (perAtoBBn.comparedTo(priceHigh.bigNumber) > 0) {
//     let result1Step = priceHigh.bigNumber
//       .sqrt()
//       .minus(priceLow.bigNumber.sqrt());
//     result0 = new BigNumber(0);
//     result1 = liq.times(result1Step);
//   }

//   let p = 1;
//   if (BigInt.fromString(scale.toString()).toI64() > 1) {
//     p = Math.pow(10, decimalA.toI64() >= decimalB.toI64() ? decimalB.toI64() : decimalA.toI64());
//   }

//   let amount0 = result0.times(p).decimalPlaces(0);
//   let amount1 = result1.div(p).decimalPlaces(0);

//   return [amount0, amount1];
// }

export let tokenMapping = new TypedMap<string, string>();
tokenMapping.set("usdc", "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8");
tokenMapping.set("usdt", "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9");
tokenMapping.set("vst", "0x64343594Ab9b56e99087BfA6F2335Db24c2d1F17");
tokenMapping.set("frax", "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F");
tokenMapping.set("dai", "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1");
tokenMapping.set("USDs", "0xD74f5255D557944cf7Dd0E45FF521520002D5748");
tokenMapping.set("spa", "0x5575552988A3A80504bBaeB1311674fCFd40aD4B");
tokenMapping.set("nftm", "0xc36442b4a4522e871399cd717abdd847ab11fe88");

// let mapped = new TypedMap<string, BigDecimal>();

// export function getHolders(address:string,balance:BigDecimal):BigDecimal{
//   let mappedEntry = new TypedMapEntry<string, BigDecimal>(address,balance);

//   mapped.entries.push(mappedEntry)

//  let size= BigInt.fromI32(mapped.entries.length).toBigDecimal()
//   return size
// }
