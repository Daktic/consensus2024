
class AggData {
    constructor(
        totalSupply,
        feeLock,
        reservedAmount,
        circulatingSupply,
        trustlessness,
        overallPaymentCount,
        totalPaymentsCount,
        totalTradeCount,
    ) {
        const am = new AggMath();
        this.totalSupply = totalSupply;
        this.feeLock = feeLock;
        this.reservedAmount = reservedAmount;
        this.circulatingSupply = circulatingSupply;
        this.trustlessness = trustlessness;
        this.overallPaymentCount = overallPaymentCount;
        this.totalPaymentsCount = totalPaymentsCount;
        this.totalTradeCount = totalTradeCount;

        this.apy = am.apy(1);
        this.poolUtalzation = am.poolUtilization(1,2)
        this.liquidityLevels = am.liquidityLevels(1,2)
        this.tradingActivity = am.tradingActivity(1,2)
        this.paymentActivity = am.tradingActivity(1,2)
        this.liquidityConcentration = am.liquidityConcentration(1,1)
        this.liquidityDepth = am.liquidityDepth(1,2)
    }
}

class DataMeta {
    constructor(
    ) {
        this.apy = {};
        this.poolUtalization = {};
        this.liquidityLevels = {};
        this.paymentActivity = {};
        this.tradingActivitiy = {};
        this.liquiditytConcentration = {};
        this.liqudityDepth = {};



        this.apy.weight = 0.15;
        this.apy.min = 0;
        this.apy.max = 0.5;

        this.poolUtalization.weight = 0.15;
        this.poolUtalization.min = 0;
        this.poolUtalization.max = 1;

        this.liquidityLevels.weight = 0.2;
        this.liquidityLevels.min = 100;
        this.liquidityLevels.max = 10000;

        this.paymentActivity.weight = 0.1;
        this.paymentActivity.min = 0;
        this.paymentActivity.max = 1000;

        this.tradingActivitiy.weight = 0.1;
        this.tradingActivitiy.min = 0;
        this.tradingActivitiy.max = 1000;

        this.liquiditytConcentration.weight = 0.1;
        this.liquiditytConcentration.min = 0;
        this.liquiditytConcentration.max = 1;

        this.liqudityDepth.weight = 0.1;
        this.liqudityDepth.min = 1000;
        this.liqudityDepth.max = 10000;

    }

}

class AggMath {

  getMath(tokenA, tokenB) {

    return new AggData(
      this.totalSupply(tokenA.totalSupply, tokenB.totalSupply),
      this.feeLock(tokenA.feeLock, tokenB.feeLock),
      this.reservedAmount(tokenA.reservedAmount, tokenB.reservedAmount),
      this.circulatingSupply(tokenA.circulatingSupply, tokenB.circulatingSupply),
      this.trustlessness(tokenA.trustlessness, tokenB.trustlessness),
      this.overallPaymentCount(tokenA.overallPaymentCount, tokenB.overallPaymentCount),
      this.totalPaymentsCount(tokenA.totalPaymentsCount, tokenB.totalPaymentsCount),
      this.totalTradeCount(tokenA.totalTradeCount, tokenB.totalTradeCount),
    );
  }
  totalSupply(asset1,asset2) {
    return asset1 + asset2;
  }

  apy(n) {
       // What is n?
      return ((1+(0.3/n))**n)-1;
  }

  poolUtilization(tradingVolume, totalSupply) {
    return tradingVolume/totalSupply;
  }

  liquidityLevels(reservedAmountTokenA, reservedAmountTokenB) {
    return reservedAmountTokenA + reservedAmountTokenB;
  }
  paymentActivity(totalPaymentCount, OverallPaymentVolume) {
    return totalPaymentCount /OverallPaymentVolume;

  }
  tradingActivity(totalTradeCount, totalTradeVolume) {
    return totalTradeCount/ totalTradeVolume;
  }
  liquidityConcentration(totalSupply, CirculatingSupplu) {
    return totalSupply/CirculatingSupplu;
  }

  liquidityDepth(reservedAmount, lockedFeePool) {
    return reservedAmount+lockedFeePool;
  }
  normalize(value,min,max) {
    return (value-min)/(max-min);
  }
  weigh(value, min, max, weight) {
    let nValue = this.normalize(value, min, max);
    return nValue * weight;
  }
  riskScore(AggData) {
    let weights = new DataMeta();
    let score =
        this.weigh(AggData.apy, weights.apy.min, weights.apy.max, weights.apy.weight) +
        this.weigh(AggData.poolUtalzation, weights.poolUtalization.min, weights.poolUtalization.max, weights.poolUtalization.weight) +
        this.weigh(AggData.liquidityLevels, weights.liquidityLevels.min, weights.liquidityLevels.max, weights.liquidityLevels.weight) +
        this.weigh(AggData.paymentActivity, weights.paymentActivity.min, weights.paymentActivity.max, weights.paymentActivity.weight) +
        this.weigh(AggData.tradingActivity, weights.tradingActivitiy.min, weights.tradingActivitiy.max, weights.tradingActivitiy.weight) +
        this.weigh(AggData.liquidityConcentration, weights.liquiditytConcentration.min, weights.liquiditytConcentration.max, weights.liquiditytConcentration.weight) +
        this.weigh(AggData.liquidityDepth, weights.liqudityDepth.min, weights.liqudityDepth.max, weights.liqudityDepth.weight)



  return score
  }

  static reservedAmount(asset1,asset2) {
    return asset1 + asset2;
  }
    static circulatingSupply(asset1,asset2) {
      return asset1 + asset2;
    }
    static trustlessness(asset1,asset2) {
      return (asset1 + asset2)/2;
    }
    static overallPaymentCount(asset1,asset2) {
      return asset1 + asset2;
    }
    static totalPaymentsCount(asset1,asset2) {
      return asset1 + asset2;
    }
    static totalTradeCount(asset1,asset2) {
      return asset1 + asset2;
    }
    static totalTradeVolumes(asset1,asset2) {
      return asset1 + asset2;
  }
}

export {AggMath, AggData};