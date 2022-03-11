# Liquidation BOT

Liquidates or Terminates positions when conditions for liquidation/termination are met. 

Liquidation and Termination are transactions, and require some amount of native token in wallet (see PRIVATE_KEY in Configuration).

## Deploy

### Heroku
Requires at least dyno "Standard 2X".
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/wowswap-io/liquidation-bot/tree/binance-smart-chain)

### Digital Ocean
Recommended plan is Basic with one "2 GB RAM | 1 vCPU".
[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/wowswap-io/liquidation-bot/tree/feature_button_deploy)

### Configuration

| Environment Variable | Required | Description                                                                                           | Default value |
|----------------------|----------|-------------------------------------------------------------------------------------------------------|---------------|
| PRIVATE_KEY          | Yes      | Hex encoded private key of liquidator wallet. Example: 4e49...814f. Should be 64 characters long      | -             |
| CHAIN_ID             | No       | Decimal chain id. List of supported chain ids is in .deploy folder. Default is Binance                | 56            |
| PROVIDER_URL         | No       | URL of a RPC provider for blockchain. Defaults are in .deploy files. Supports https and wss endpoints |               |
