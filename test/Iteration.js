const Iteration = artifacts.require('Iteration');
const crypto = require('crypto');
const ethers = require('ethers'); 
const wallet1 = createWallet();
const wallet2 = createWallet();
const wallet3 = createWallet();

contract('Iteration', () => {
    before(async () => {
        this.iterationContract = await Iteration.deployed();


    })

    it('Iteration contract deployed successfully', async () => {
        const address = this.iterationContract.address;
        const iterationContract = await this.iterationContract;
        
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.equal(typeof address, 'string');
        assert.equal(await iterationContract.listSize(), 0);
        assert.equal(await iterationContract.FIRST_ADDRESS(), '0x0000000000000000000000000000000000000001');
    })

    it('Add users successfully', async () => {
        // const address = this.iterationContract.address;
        const iterationContract = await this.iterationContract;

        await iterationContract.addUser(wallet1.address);
        await iterationContract.addUser(wallet2.address);
        await iterationContract.addUser(wallet3.address);
        assert.equal(await iterationContract.listSize(), 3);
    })

    it('Remove user successfully', async () => {
        // const address = this.iterationContract.address;
        const iterationContract = await this.iterationContract;

        await iterationContract.removeUser(wallet2.address);

        assert.equal(
            JSON.stringify(await iterationContract.getAllUsers()), 
            JSON.stringify([wallet3.address,wallet1.address])
        );
        assert.equal(await iterationContract.listSize(), 2);
    })
})

function createWallet() {
    const id = crypto.randomBytes(32).toString('hex');
    const privateKey = "0x"+id;
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
}