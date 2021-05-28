# Liquidation BOT

## Installation

We're using Heroku deploy templates to simplify user experience. 

### 1. Prepare Heroku account

To get started, you should sign up to [Heroku](https://heroku.com) and login to dashboard.

### 2. Prepare liquidation wallet

Accordingly prefered network create wallet, top up it and export private key for future bot setup. 

> We recommed use MetaMask for it. [How to](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

### 3. Deploy and run bot

Select one of prepared template and fill the form:


* **[Binance Smart Chain](https://heroku.com/deploy?template=https://github.com/wowswap-io/liquidation-bot/tree/binance-smart-chain)**
* [**Polygon** (previous Matic)](https://heroku.com/deploy?template=https://github.com/wowswap-io/liquidation-bot/tree/matic)


In loaded form, fill in the missing private key field with prepared key from p.2

![](https://i.imgur.com/IdCUISh.png)


### 4. Prepare for continuous work

The Heroku stops instances with no incoming requests. To prevent undesired halting the liqudation bot, enter to [Heroku Dashboard](https://dashboard.heroku.com/apps) and find created instance.

Inside configuration page of selected instance find dynos block:
![](https://i.imgur.com/UJimbx1.png)

Press "Configure Dynos" and press "Change Dyno Type" on loaded pag. 

Select at least **Hobby** plan and provide payment information to charge. 

## Monitoring of the work

You could get logs of execution in dashboard. Same as you described in p.4 of Installation, open the instance page. At the right corner open drop down menu and select "View logs"

![](https://i.imgur.com/j03vhU2.png)

