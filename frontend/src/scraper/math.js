
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
}

export {AggMath, AggData};