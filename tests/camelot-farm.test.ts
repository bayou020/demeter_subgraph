import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CooldownInitiated } from "../generated/schema"
import { CooldownInitiated as CooldownInitiatedEvent } from "../generated/CamelotFarm/CamelotFarm"
import { handleCooldownInitiated } from "../src/camelot-farm"
import { createCooldownInitiatedEvent } from "./camelot-farm-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let expiryDate = BigInt.fromI32(234)
    let newCooldownInitiatedEvent = createCooldownInitiatedEvent(
      account,
      tokenId,
      expiryDate
    )
    handleCooldownInitiated(newCooldownInitiatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CooldownInitiated created and stored", () => {
    assert.entityCount("CooldownInitiated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CooldownInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CooldownInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "CooldownInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiryDate",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
