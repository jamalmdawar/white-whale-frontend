// import { num } from "@arthuryeti/terra";
import {num} from 'libs/num'

type minAmountReceiveParams = {
  amount: string;
  maxSpread: string;
};

export const minAmountReceive = ({
  amount,
  maxSpread,
}: minAmountReceiveParams): string => {
  const rate1 = num("1").minus(maxSpread);

  console.log({maxSpread, rate1 : rate1.toString()})

  return num(amount).times(rate1).toString();
};

type PriceImpactParams = {
  offerAmount: string;
  maxSpread: string;
};

export const priceImpact = ({
  offerAmount,
  maxSpread,
}: PriceImpactParams): string => {
  const amount = num(offerAmount);
  const spread = num(maxSpread);

  return spread.div(amount.plus(spread)).times("100").toString();
};
