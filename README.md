# ReliableStruct

**ReliableStruct** is a lightweight JavaScript framework designed for strongly-typed, secure client-side data storage using `localStorage`. It provides efficient type-checking, JSON storage options, and optional AES encryption, making it ideal for applications that require reliable and structured data handling on the browser.

## Features

- **Strong Type Checking**: Ensures data types are strictly enforced (`int`, `str`, `bool`, `float`).
- **AES Encryption Support**: Optional data encryption using AES for secure storage.
- **JSON Storage Compatibility**: Supports storing data as JSON, with easy conversions to and from JSON format.
- **Flexible Instantiation**: Each instance can use a unique key and encryption setting.
- **Clear, Modular API**: Simple functions for storing, retrieving, and managing data in `localStorage`.

## Installation

To use ReliableStruct in your project, include it via the following CDN link:

```html
<script src="https://cdn.jsdelivr.net/gh/simplyYan/ReliableStruct@refs/heads/main/relistruct.js"></script>
```

### Dependencies

For AES encryption, ReliableStruct depends on `crypto-js`. Include this CDN as well:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
```

## Usage Example

```javascript
// Generate an AES encryption key
const aesKey = RelistructKey();

// Create an instance of ReliableStruct with AES encryption
const secureStorage = new ReliableStruct("myAppNamespace", aesKey);

// Store an integer value with type-checking and encryption
secureStorage.setItem("userId", 123, "int", true);

// Retrieve the stored value, decrypting it
const userId = secureStorage.getItem("userId", true);
console.log("Retrieved User ID:", userId);
```

## Documentation

### Class: `ReliableStruct`

#### Constructor

```javascript
new ReliableStruct(key, encryptionKey = null)
```

- **`key`**: A unique namespace for storing items in `localStorage`.
- **`encryptionKey`**: (Optional) An AES encryption key string (256 bits recommended) for encrypting stored items. If omitted, data will be stored unencrypted.

#### Methods

##### `setItem(key, value, type, encrypted = false)`

Stores a value with strict type checking. You can specify whether to encrypt the data.

- **`key`**: The unique key for the stored item.
- **`value`**: The value to be stored.
- **`type`**: The data type (`"int"`, `"float"`, `"str"`, `"bool"`).
- **`encrypted`**: (Optional) Boolean indicating whether to encrypt the value. Defaults to `false`. Requires an encryption key if set to `true`.

**Examples:**

```javascript
// Store a string without encryption
secureStorage.setItem("username", "JohnDoe", "str");

// Store a boolean with encryption
secureStorage.setItem("isLoggedIn", true, "bool", true);
```

##### `getItem(key, encrypted = false)`

Retrieves a value from `localStorage` with optional decryption.

- **`key`**: The unique key for the stored item.
- **`encrypted`**: (Optional) Boolean indicating whether to decrypt the stored value. Defaults to `false`.

**Examples:**

```javascript
// Retrieve a non-encrypted item
const username = secureStorage.getItem("username");

// Retrieve an encrypted item
const isLoggedIn = secureStorage.getItem("isLoggedIn", true);
```

##### `toJSON(key, encrypted = false)`

Converts a specific stored item into a JSON object.

- **`key`**: The unique key for the item.
- **`encrypted`**: (Optional) Boolean indicating whether to decrypt the stored value. Defaults to `false`.

**Example:**

```javascript
// Convert an item to JSON format
const userDataJSON = secureStorage.toJSON("userId");
console.log(userDataJSON); // {"key":"userId","value":123}
```

##### `setJSON(key, jsonString, encrypted = false)`

Stores data directly from a JSON string, with optional encryption.

- **`key`**: The unique key for the item.
- **`jsonString`**: A JSON string to be parsed and stored.
- **`encrypted`**: (Optional) Boolean indicating whether to encrypt the data. Defaults to `false`.

**Example:**

```javascript
// Store data as JSON with encryption
secureStorage.setJSON("settings", '{"value": true}', true);
```

##### `removeItem(key)`

Removes a specific item from `localStorage` by key.

- **`key`**: The unique key for the item.

**Example:**

```javascript
secureStorage.removeItem("username");
```

##### `clear()`

Clears all items stored in `localStorage` within the namespace of the instance.

**Example:**

```javascript
secureStorage.clear();
```

### Function: `RelistructKey`

Generates a secure AES encryption key (256-bit, hexadecimal format) for use in ReliableStruct instances.

```javascript
const aesKey = RelistructKey();
```

### Notes on Encryption

- **Encrypted Mode**: For encrypted data storage, set the `encrypted` parameter to `true` in `setItem`, `getItem`, and other methods that store or retrieve data.
- **Non-encrypted Mode**: If encryption is not required, simply omit the `encrypted` parameter or set it to `false`. This will store data in plain text in `localStorage`, which is sufficient for non-sensitive data.

## License

This project is licensed under the BSD-3-Clause License.

## Contributing

Contributions are welcome! If you would like to contribute to ReliableStruct, please open an issue or submit a pull request on the GitHub repository.
