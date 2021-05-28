# Liquidation BOT

## Installation

To simplify your experience we are using Heroku to deploy liquidation bots.

### 1. Prepare Heroku account

To get started, you should sign up to [Heroku](https://heroku.com) and login to the dashboard (1 minute).

### 2. Create a liquidation wallet

Create a new wallet (if you are using Metamask, click on the circle in the top right corner and then + Create Account), deposit a small amount of BNB/Matic to this wallet ($100 should be enough), and obtain its Private key (in Metamask: click on 3 dots in the top right corner ->Account details ->Export Private Key -> Enter your password to see the Private Key).

> If you still have a question [check here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

### 3. Deploy and run bot

Select a bot for Binance Smart Chain or Polygon Network:

* **[Binance Smart Chain](https://heroku.com/deploy?template=https://github.com/wowswap-io/liquidation-bot/tree/binance-smart-chain)**
* [**Polygon** (formerly Matic)](https://heroku.com/deploy?template=https://github.com/wowswap-io/liquidation-bot/tree/matic)


In the field "App name" provide a name for your bot and paste the Private Key obrained at the previous step - the bot requires Private Key from your liquidation wallet because it will be submitting transactions on your behalf and pay for gas from this wallet. Don't change other parameters. Click "Deploy app".

![](https://i.imgur.com/IdCUISh.png)


### 4. Prepare for continuous work

The Heroku stops instances with no incoming requests. To prevent undesired halting of the liqudation bot, enter [Heroku Dashboard](https://dashboard.heroku.com/apps) and find your bot.

On the configuration page of selected bot click on "Configure Dynos":
![](https://i.imgur.com/UJimbx1.png)

And then click on "Change Dyno Type". 

Select **Hobby** plan ($7/ month) and complete the payment. If you running 2 bots both on BSC and Polygon you will need to pay twice.

## Monitor your bot

You can check the bot's activity on Heroku by going to https://dashboard.heroku.com/apps -> Click on your bot's name -> Click on More… (in the top right corner) -> Click on "View Logs".

![](https://i.imgur.com/j03vhU2.png)

