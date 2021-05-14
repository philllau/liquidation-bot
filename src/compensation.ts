import { ethers } from "ethers";
import data from "./holders.json";
import "./math";
import { bn } from "./math";


export default function() {
  const debt = bn("86.253770847897057038")
  const liqu = bn("33.940843377380657392")
  const comp = debt.sub(liqu)

  console.log(comp.toFixed())

  console.log("holders")
  const holders = data.data.items.filter(h => h.address !== ethers.constants.AddressZero);
  
  const totalBalances = holders.reduce(
    (total, holder) => total.add(bn(holder.balance)),
    bn(0)
  );
  const total = bn(holders[0].total_supply);

  console.log(totalBalances.eq(total) ? "ALL HOLDERS" : "SOMETHING WRONG");
  console.log(totalBalances.sub(total).abs().toFixed());

  const holdersWithPortion = holders.map(h => ({
    ...h,
    portion: bn(h.balance).div(total)
  }));
  
  holdersWithPortion.forEach(h => console.log(`[${h.address}]: ${comp.mul(h.portion).toFixed(18)} BNB (${h.portion.mul(100).toFixed(4)}%)`))
}
