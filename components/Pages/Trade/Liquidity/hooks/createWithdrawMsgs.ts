import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'
import { coin } from '@cosmjs/stargate'
import { createExecuteMessage } from 'util/messages/index'
import { createIncreaseAllowanceMessage } from 'util/messages/index'

export const toBase64 = (obj: object) => Buffer.from(JSON.stringify(obj)).toString('base64')

export const createWithdrawMsg = ({ amount, swapAddress }) => ({
  send: {
    amount,
    contract: swapAddress,
    msg: toBase64({
      withdraw_liquidity: {},
    }),
  },
})

export const createNativeWithdrawMsg = () => ({
  withdraw_liquidity: {},
})

export const createWithdrawExecuteMsgs = ({
  contract,
  amount,
  swapAddress,
  claimIncentive,
  stakingAddress,
  isNative = false,
},
senderAddress) => {
  const msgs = []
  const increaseAllowanceMessages: Array<MsgExecuteContractEncodeObject> = []

  if (!isNative) {
    increaseAllowanceMessages.push(createIncreaseAllowanceMessage({
      tokenAmount: amount,
      tokenAddress: contract,
      senderAddress,
      swapAddress,
    }))
  }

  const inventiveMsg = createExecuteMessage({
    message: {
      withdraw: {},
    },
    senderAddress,
    contractAddress: stakingAddress,
    funds: [],
  })

  if (claimIncentive) {
    msgs.push(inventiveMsg)
  }

  return [
    ...msgs,
    ...increaseAllowanceMessages,
    createExecuteMessage({
      senderAddress,
      contractAddress: isNative ? swapAddress : contract,
      message: isNative
        ? createNativeWithdrawMsg()
        : createWithdrawMsg({ amount,
          swapAddress }),
      funds: isNative ? [coin(amount, contract)] : [],
    }),
  ]
}
