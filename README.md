# Quick Mart

## Description

Simple electron desktop application that allows users to load product inventory, make purchases and view receipts/transactions

### Features

- Select whether customer is `Rewards Member` or `Regular Customer`
- Add items to cart
- Remove individual items, with empty cart option
- View cart
- Checkout and print receipt
- Cancel transaction

## Assumptions

- Application will run in Windows only
- Savings are calculated only for `Rewards Member` via the formula: `Purchase total with tax AND WITHOUT membership - Purchase total with tax AND membership`

## How to run

### Using executable

#### Windows

Download and run the installer in the [github release](https://github.com/Centeno448/deft-tech-ex/releases/tag/V1.0.0) (Windows defender may make a fuss because the app is not signed, just click `more options` and install anyways) and the app will install and run with the app name `deft-tech-ex`.

#### Linux

Not currently supported

### Using source code

#### All platforms

You will need the following:

- NodeJS (>= v22)

Run the following commands

```
npm install
npm run start
```
