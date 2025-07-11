import { describe, expect, test } from 'vitest'

import { accounts } from '~test/src/constants.js'
import { mainnetClient } from '~test/src/utils.js'
import { http, createPublicClient } from '../../index.js'
import { optimism } from '../../op-stack-kailua/chains.js'
import { getWithdrawals } from '../../op-stack-kailua/index.js'
import { publicActionsL1 } from './publicL1.js'

const client = mainnetClient.extend(publicActionsL1())
const l2Client = createPublicClient({
  chain: optimism,
  transport: http(),
})

test('default', async () => {
  expect(publicActionsL1()(mainnetClient)).toMatchInlineSnapshot(`
    {
      "buildInitiateWithdrawal": [Function],
      "estimateDepositTransactionGas": [Function],
      "estimateFinalizeWithdrawalGas": [Function],
      "estimateProveWithdrawalGas": [Function],
      "getGame": [Function],
      "getGames": [Function],
      "getL2Output": [Function],
      "getPortalVersion": [Function],
      "getTimeToFinalize": [Function],
      "getTimeToNextGame": [Function],
      "getTimeToNextL2Output": [Function],
      "getTimeToProve": [Function],
      "getWithdrawalStatus": [Function],
      "waitForNextGame": [Function],
      "waitForNextL2Output": [Function],
      "waitToFinalize": [Function],
      "waitToProve": [Function],
    }
  `)
})

describe('smoke test', () => {
  test('buildInitiateWithdrawal', async () => {
    const request = await client.buildInitiateWithdrawal({
      account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      to: accounts[1].address,
      value: 1n,
    })
    expect(request).toBeDefined()
  })

  test('estimateDepositTransactionGas', async () => {
    const gas = await client.estimateDepositTransactionGas({
      account: accounts[0].address,
      request: {
        gas: 21_000n,
        to: accounts[1].address,
      },
      targetChain: optimism,
    })
    expect(gas).toBeDefined()
  })

  test.skip('estimateProveWithdrawalGas', async () => {
    const gas = await client.estimateProveWithdrawalGas({
      account: accounts[0].address,
      l2OutputIndex: 4529n,
      outputRootProof: {
        latestBlockhash:
          '0x67319b70138527b1087a535099cf8a4db4692ca7cee16b7a3ebd950408ed610a',
        messagePasserStorageRoot:
          '0x04091eb8ad4eb056aff2749c1d17b1ed1a0cdcd44f9d7a539ffd56e4b2b4e1f8',
        stateRoot:
          '0x92822c772346d9c8ad1c28885a736de9189a4523e0c79639831a4eed651d837f',
        version:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      withdrawalProof: [
        '0xf90211a07dd255038ced20e27bd9c823d53dff05dab9b56f47efec4d1373c6af4fef5989a0a72a37936fd968f361c541a4d5374d3862f0c3e6125b095158982b8eca440da0a0bb0cf61ec3b7954fa2f09263e712f1b9ed681dcab015932294512ad8b288b90da0d91dbd89baf8206e4952fa0f183cb76fee20ad8ab6d0c200053c4ed3e64d1b32a0ab94dcdd454eb74ece1d1fc6bee90a2cc9468a9be3500d774328cced5dd136dca0fa51148073d2fd37bea62e78e31d2f29f95bacdd72ee987ecbbce8fa98433681a0a7ad5e83e3e1b8d2e85dc249a99fbcff1673cf55c9915c879ac139ac0bf26dd5a0c5766a7cdac0498fd865d735ab9085a3a4163e2338c422e33c4a6b4d1ad0e9afa073b391a00e484b6729f77c11aa424511c8618c34a23dddbfc0fe0265dc4eb4cfa01b50892e8e4ecbfd5bc0cf53604f6f23cd706dc79719972d62be28e627ae287ca05658e252128bfb8ff743644e9610400bebc0264a5a1511469e9d35088c601437a06b5301e3158ca1288125e03b486e99d23baaa5706858ed39488854e197de81bba098a631fd53cccaaafc3b2e217a85cc4243fec1de269dab5135dede898a56993da0b72713ea8fc5cf977ed19945cd080171f40ea428fe438b99ffa70e086f2e38a1a0be5a3eadca25a2ed6a9b09f8d4203ad9bf76627a241756240cb241a5d7bfd422a0453403dd41482ab5064f94fa2d2e96182fb8b3b9f85473d300689c63f46f244180',
        '0xf90211a0a0ab3e1601d6549af5c32a5c38fef42f0866f24fc16ce70f5d6119733b32ce1ba0f92fcd0021c63ab9136e6df54db3ab735dc267ca8e5725c1c127c107c0d3fc83a0efeb2ad3839ca38f72fbb877c158ade23d7d62b49971abbbe874ae4d44298cdba0d5435ee90a9a1f4c369a0228fcef2d70f8e45d11bdb7bd7b823eb2e265824ac1a033a919415c4532290ca370f71492f352c9c729e4012955d461d525cb8b0faa3ca05cc9620184e8a396cacd0c4f76d25fd4ef80831b3717bfe1d89a0753c544a46fa059baaf0e765b6ff0c9488f7afa06071b9eda81a13b2db2762287c26623f8b27ca04735c39e8cd3d267e6e91f867c2b7120c86ff0c98c4cccd67dfa634f0870f6eda02a80ec76fee519323b8b553e071480d28ca693f95a21b82a48c70adc8155dcbba07809ffaff9ca0875ef1f6e1f84584e2fc79fc2054a47c150aea03f02dabf5cfaa00775eb64cd0add1462a1d0d762424f60fd5faed324f51d48d709ed564cc6d494a011c3b1c19b83e86d587900cfe3a3e2d8534a5c705bad96e68ef3ca0126cbe6a0a0459db754e27d481108d0bfe242f492f06e317437700d860d8a171b961acb3be1a058c7be7e1965ecae30b844bf8676adc851d6af299c6bccaf0856bec60776b01fa05a5ddb72a2a98858c0b4120d728947537bdcc9ab061c4b8da0f684576822bebca07e38f091de1b9e0fcf00f9fdfdec18eb34bfd3996c88329c4cd2d916dbf29cdc80',
        '0xf90211a091e1c27400a43c5a5c197c19c9f9762fa99615f751f093ec268dcde5a0e46363a07c4dff1acc35fa31805556cda36b9618263faecf49a5b287b97fe39a13408c8da03c37d2c5a2f388350546e74c4593236849543f6476aa70f034d88ecc43e1d190a0abaf9651fa71053aa953bdc895c75969f82ed3569d9f001a7f7be66a92b1e6c9a04dfc96da68c1d49908f89f5a9bed4f65c514d1e2193ff1126f9700952e4daceda0ceb6d263009c644f0a348d951e12185bafe238e985432fb5a0deb94fa9a3b2b3a0eb493209507df91c53c45366178061b03226000cf2a8c4ef88fc4e809ae82cd0a064006be53d6f88a198080f749ffb1d6743843c63d3e6f6e395f103c572c73796a0466c8bea652668720b53de631bc1d16935bfaa85c730f6f7d19fcbe4704ab047a0c2792da5608db91851be4114546902cb4cbebea053665b1329c1e73f24e72d48a05fdd0ade55a0571d508274576bcd7a2ced913e77534ff267b3e60368b2ee95c5a0b574398c5e6640048b26a7ca2298105f027dd3561652a1f1fa9ba1c01ed0057fa0d1a98317c3dee409a6178771fc67378e3a14197f4f9f9e5aed1c6b05584d3f48a0e9abf8d9df852a45a5310777b46fbdfa0876e83063a94bc91096c4d5bb8385dba0f831723d52c0b60b61bb830c9a33c9f9b2d83830c3ed570e5da44ae6ee80a953a0333636ac068b435c011fd4e7d30dc52a8bbaf8e9d861a95eee4d3e512ff839c580',
        '0xf901b1a0e480ad00d97a48b6ecdbf027135399615123578f3de7e572259000b946f4c87080a09d2298b1328a8afd6b47f0bd57a1332011ab02614a86ef6b544baf61e425ba9ea05713276bc96f85c79bb9f4e4ef517d5bafe56db6775fd27f757981fe94846aa4a02f787118beba540f07c1fd3b488628ee0fa47694aa5eb1d86405ff25b3d6f66b80a09a628c00eebfe343a8f4a7072aa6ee968eea22a6dde4ac3a29d65bdaae854758a01ffd70ab795cbc879376990fad07f95ec2bf6dc9a51ae3603bfd5f321dc7474aa0cf82883dc01744467fa15bec5689b559b70aa63c6d341548676605e927a102cba0fdb90a7114f2137e15ac8915bf54727cd5d0dead26962eefe4ab2499ec6b5c65a00909bea4f700704cda454c330e2a88f73ebd6a7d7e8fef4204397e154953de99a0bbab7f75e0804aaee0f2761a49579f08820eb074f5ff9320ff5f48383975079880a0b3663141987995925fed9ef86f8fc02a44a42136645714891831ccdf1e08c68ea00a23286f92dbcd146255c6c2cc880990cbd694894653701169c07f6098d9573da0d8a58420dc5d85d4150c2bc6fcae28eb3a843d92aaba1274161e12554c389b8d80',
        '0xe19f20418ffb24ba711dfecd671b4054aa2e87efe3d10484b88078ceef79373c6001',
      ],
      withdrawal: {
        data: '0xd764ad0b0001000000000000000000000000000000000000000000000000000000002d49000000000000000000000000420000000000000000000000000000000000001000000000000000000000000099c9fc46f92e8a1c0dec1b1747d010903e884be1000000000000000000000000000000000000000000000000002e2f6e5e148000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000a41635f5fd000000000000000000000000bcce5f55dfda11600e48e91598ad0f8645466142000000000000000000000000bcce5f55dfda11600e48e91598ad0f8645466142000000000000000000000000000000000000000000000000002e2f6e5e1480000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        gasLimit: 287624n,
        nonce:
          1766847064778384329583297500742918515827483896875618958121606201292631369n,
        sender: '0x4200000000000000000000000000000000000007',
        target: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
        value: 13000000000000000n,
      },
      targetChain: optimism,
    })
    expect(gas).toBeDefined()
  })

  test('getGame', async () => {
    const request = await client.getGame({
      l2BlockNumber: 132300000n,
      limit: 10,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getGames', async () => {
    const request = await client.getGames({
      l2BlockNumber: 132300000n,
      limit: 10,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getL2Output', async () => {
    const request = await client.getL2Output({
      l2BlockNumber: 113365018n,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getPortalVersion', async () => {
    const request = await client.getPortalVersion({
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getTimeToNextGame', async () => {
    const request = await client.getTimeToNextGame({
      l2BlockNumber: 113365018n,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getTimeToNextL2Output', async () => {
    const l2BlockNumber = await l2Client.getBlockNumber()
    const request = await client.getTimeToNextL2Output({
      l2BlockNumber,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('getWithdrawalStatus', async () => {
    const receipt = await l2Client.getTransactionReceipt({
      hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147',
    })
    await client.getWithdrawalStatus({
      receipt,
      targetChain: optimism,
    })
  })

  test('waitForNextGame', async () => {
    const games = await client.getGames({
      limit: 10,
      targetChain: optimism,
    })
    const request = await client.waitForNextGame({
      l2BlockNumber: games[0].l2BlockNumber - 10n,
      limit: 10,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test('waitForNextL2Output', async () => {
    const request = await client.waitForNextL2Output({
      l2BlockNumber: 113365018n,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })

  test.skip('waitToFinalize', async () => {
    const receipt = await l2Client.getTransactionReceipt({
      hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147',
    })
    const [withdrawal] = getWithdrawals(receipt)
    await client.waitToFinalize({
      withdrawalHash: withdrawal!.withdrawalHash,
      targetChain: optimism,
    })
  })

  test('waitToProve', async () => {
    const receipt = await l2Client.getTransactionReceipt({
      hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147',
    })
    const request = await client.waitToProve({
      receipt,
      targetChain: optimism,
    })
    expect(request).toBeDefined()
  })
})
