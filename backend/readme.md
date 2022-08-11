# Getting Started

Firstly, cd into the backend directory
### Download Hardhat
```bash
yarn add hardhat
```

### Compile Smart Contract
```bash
yarn hardhat compile
```

### Deploy Smart Contract
    1) localhost
    ```bash
    yarn hardhat deploy
    ```
    2) Mumbai (Polygon Testnest)
    ```bash
    yarn hardhat deploy --network Mumbai
    ```

### Clear up cache and artifacts
```bash
yarn hardhat clean
```

### Test smart contract
```bash
yarn hardhat test
```
