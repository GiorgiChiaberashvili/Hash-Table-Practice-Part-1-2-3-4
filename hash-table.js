const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    let hash = sha256(key)
    return parseInt(hash.slice(0, 8), 16)
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
    const KeyValuePair1 = new KeyValuePair(key, value)
    const index = this.hashMod(key)

    if (this.data[index]) {
      throw new Error('hash collision or same key/value pair already exists!');
    }

    this.data[index] = KeyValuePair1
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here

    const index = this.hashMod(key)
    const KeyValuePair2 = new KeyValuePair(key, value)

    KeyValuePair2.next = this.data[index];
    this.data[index] = KeyValuePair2
    this.count++;
  }

  insert(key, value) {
    // Your code here

    let index = this.hashMod(key)
    let KeyValuePair3 = this.data[index]

    while (KeyValuePair3) {
      if (KeyValuePair3.key === key && KeyValuePair3.value !== value) {
        KeyValuePair3.value = value;
        return;
      }
      KeyValuePair3 = KeyValuePair3.next
    }
    this.insertWithHashCollisions(key, value)
  }
}


module.exports = HashTable;
