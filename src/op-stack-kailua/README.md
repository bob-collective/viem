> [!WARNING]
> **Deprecated.** Starting with version 2.48.4, viem supports Kailua actions out of the box, thanks to [wevm/viem#4428](https://github.com/wevm/viem/pull/4428). This module is no longer needed — use upstream viem instead.

Full copy of ../op-stack module with a tweak to [getGames](https://github.com/bob-collective/viem/blob/master/src/op-stack-kailua/actions/getGames.ts#L66)

[Kailua Fault Dispute Game contract](https://github.com/risc0/kailua/blob/master/crates/contracts/foundry/src/KailuaGame.sol#L141) is different from [Bedrock Fault Dispute Game contract](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts-bedrock/src/dispute/FaultDisputeGame.sol#L883) in a way it encodes `extraData`. Instead of storing 32 bytes as a block number in `extraData` Kailua game contract stores 24 bytes. First 8 bytes of that value are allocated for storing block number.