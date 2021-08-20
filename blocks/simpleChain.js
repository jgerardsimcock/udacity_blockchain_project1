

const SHA256 = require('crypto-js/sha56');


/* ==============================================
|   Class with Constructor for Block Data Model |
|   =============================================*/ 

class Block {

    constructor(data){
        this.height = '';
        this.timeStamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';

    }
}


/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/


class Blockchain {
    constructor(){
        // new chain array
        this.chain = [];

        // add Genesis Block
        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock(){
        return new Block("This is the Genesis Block");

    }


    addBlock(newBlock){
        //get block height
        newBlock.height = this.chain.length;

        // UTC TimeStamp

        newBlock.timeStamp = new Date().getTime().toString().slice(0,-3);

        if (this.chain.length>0) {
            //previous blockHash
            newBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        // generate the SHA256 string
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

        // add block to chain
        this.chain.push(newBlock);
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];   
    }

}