
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
        this.totalSupply = totalSupply;
        this.feeLock = feeLock;
        this.reservedAmount = reservedAmount;
        this.circulatingSupply = circulatingSupply;
        this.trustlessness = trustlessness;
        this.overallPaymentCount = overallPaymentCount;
        this.totalPaymentsCount = totalPaymentsCount;
        this.totalTradeCount = totalTradeCount;
    }
}

class DataMeta {
    constructor(
    ) {
        this.apy.weight = 0.15;
        this.apy.min = 0;
        this.apy.max = 0.5;

        this.poolUtalization.weight = 0.15;
        this.poolUtalization.min = 0;
        this.poolUtalization.max = 1;

        this.liquidityLevels.weight = 0.2;
        this.liquidityLevels.min = 100;
        this.liquidityLevels.max = 10000;

        this.tradingActivity.weight = 0.1;
        this.tradingActivity.min = 500;
        this.tradingActivity.max = 1000;

        this.paymentActivity.weight = 0.1;
        this.paymentActivity.min = 0;
        this.paymentActivity.max = 1000;

        this.TradingActivitiy.weight = 0.1;
        this.TradingActivitiy.min = 0;
        this.TradingActivitiy.max = 1000;


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
  static totalSupply(asset1,asset2) {
    return asset1 + asset2;
  }

  static apy(n) {
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
  static normalize(value,min,max) {
    return (value-min)/(max-min);
  }
  static weigh(value, min, max, weight) {
    let nValue = this.normalize(value, min, max);
    return nValue * weight;
  }
  static riskScore(AggData) {
    let weights = new DataMeta();
    let score =
        this.weigh(AggData.totalSupply, weights.totalSupply.min, weights.totalSupply.max, weights.totalSupply.weight) +
        this.weigh(AggData.feeLock, weights.feeLock.min, weights.feeLock.max, weights.feeLock.weight) +
        this.weigh(AggData.reservedAmount, weights.reservedAmount.min, weights.reservedAmount.max, weights.reservedAmount.weight) +
        this.weigh(AggData.circulatingSupply, weights.circulatingSupply.min, weights.circulatingSupply.max, weights.circulatingSupply.weight) +
        this.weigh(AggData.trustlessness, weights.trustlessness.min, weights.trustlessness.max, weights.trustlessness.weight) +
        this.weigh(AggData.overallPaymentCount, weights.overallPaymentCount.min, weights.overallPaymentCount.max, weights.overallPaymentCount.weight) +
        this.weigh(AggData.totalPaymentsCount, weights.totalPaymentsCount.min, weights.totalPaymentsCount.max, weights.totalPaymentsCount.weight) +
        this.weigh(AggData.totalTradeCount, weights.totalTradeCount.min, weights.totalTradeCount.max, weights.totalTradeCount.weight);

  return score
  }

  static feeLock(asset1,asset2) {
    return asset1 + asset2;
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