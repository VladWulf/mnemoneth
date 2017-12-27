# Mnemoneth

Simple javascript library that allows generation of a HD private key from a bitcore mnemonic and its recovery if you saved the mnemonic. It also allows the generation of an ethereum private key and address based on the HD private key (that you can recover with the mnemonic). You can sign data with directly with this library, check the API.

NB: Keep in mind that the data to sign is a keccak256 hash of:
```
"\x19Ethereum Signed Message:\n" + message.length + message
```


Mnemonic is:

* Frontend compatible.
* Local storage friendly.
* Allows signing
* Allows key recovery

## Usage

To keep it simple just use mnemoneth.js in build/ folder.


## API

The library is available as a global variable under the name of Mnemoneth.

```html
<script type="text/javascript" src="mnemoneth.js"></script>
```


* Generate HD Private Key from random Mnemonic

  ```javascript
  const keyObject = Mnemoneth.gen_key();
  // example {key: HDPrivateKey, mnemonic: "firm size cupboard tonight quarter boy ivory various winter gaze purity issue"}
  keyObject.key
  // HDPrivateKey {_buffers: {…}, xprivkey: "xprv9s21ZrQH143K3Xj7VXHSnUWGuioono8Lefy46tn4U7hGas…pUDHM9vZSfnbjX8WDegvHvomTXLmoah1K82jT2oxtfbnqukHH", network: Network, depth: 0, privateKey: PrivateKey, …}
  ```
* Generate HD Private Key from a Mnemonic you have

  ```javascript
  const keyObject = Mnemoneth.gen_key('firm size cupboard tonight quarter boy ivory various winter gaze purity issue');
  // example {key: HDPrivateKey, mnemonic: "firm size cupboard tonight quarter boy ivory various winter gaze purity issue"}
  keyObject.key
  // HDPrivateKey {_buffers: {…}, xprivkey: "xprv9s21ZrQH143K3Xj7VXHSnUWGuioono8Lefy46tn4U7hGas…pUDHM9vZSfnbjX8WDegvHvomTXLmoah1K82jT2oxtfbnqukHH", network: Network, depth: 0, privateKey: PrivateKey, …}
  ```
* Save your HD Private Key in LocalStorage

```javascript
  localStorage.setItem('myHdKey', JSON.stringify(Mnemoneth.gen_key().key));
```

* Get it back as HDPrivateKey type (important if you want to generate the account!)

```javascript
  // support json and strings
  Mnemoneth.to_hd(localStorage.getItem('myHdKey'))
  // HDPrivateKey {_buffers: {…}, xprivkey: "xprv9s21ZrQH143K3Xj7VXHSnUWGuioono8Lefy46tn4U7hGas…pUDHM9vZSfnbjX8WDegvHvomTXLmoah1K82jT2oxtfbnqukHH", network: Network, depth: 0, privateKey: PrivateKey, …}
```

* Generate ethereum account

```javascript
  const myHdKey = Mnemoneth.to_hd(localStorage.getItem('myHdKey'));
  Mnemoneth.gen_account(myHdKey)
  // {address: "0xa93aB817aF20E290B95EA95e8Fe8D145C89adA6B", privateKey: "0c0c493951316d3aed77db207d48048f994a0832bb94727ff0b6515284db2113", signTransaction: ƒ, sign: ƒ, encrypt: ƒ}
```

* Sign data

```javascript
  const myHdKey = Mnemoneth.to_hd(localStorage.getItem('myHdKey'));
  const account = Mnemoneth.gen_account(myHdKey)
  account.sign('hello world')
  // {message: "hello world", messageHash: "0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68", v: "0x1c", r: "0x24e505b08ea8756f9497baf823f9edebb10bc542a52340332454fab8e0e493b0", s: "0x296d6a9662f26fa877d5c6e29ec1ae65658c55ad3f2782de208b47b2b73eedb5", …}
```
