class ReliableStruct {
    constructor(key, encryptionKey = null) {
        this.key = key;
        this.encryptionKey = encryptionKey;
    }

    static isValidType(value, type) {
        if (type === "int") return Number.isInteger(value);
        if (type === "float") return typeof value === "number" && !Number.isInteger(value);
        if (type === "str") return typeof value === "string";
        if (type === "bool") return typeof value === "boolean";
        return false;
    }

    setItem(key, value, type, encrypted = false) {
        if (!ReliableStruct.isValidType(value, type)) {
            throw new Error(`Tipo inválido para o valor: Esperado ${type}, recebido ${typeof value}`);
        }

        let data = { value, type };

        let dataToStore = JSON.stringify(data);

        if (encrypted && this.encryptionKey) {
            dataToStore = CryptoJS.AES.encrypt(dataToStore, this.encryptionKey).toString();
        }

        localStorage.setItem(this._fullKey(key), dataToStore);
    }

    getItem(key, encrypted = false) {
        let dataToRetrieve = localStorage.getItem(this._fullKey(key));
        if (!dataToRetrieve) return null;

        if (encrypted && this.encryptionKey) {
            const bytes = CryptoJS.AES.decrypt(dataToRetrieve, this.encryptionKey);
            dataToRetrieve = bytes.toString(CryptoJS.enc.Utf8);
        }

        const data = JSON.parse(dataToRetrieve);

        if (!ReliableStruct.isValidType(data.value, data.type)) {
            throw new Error(`Tipo de dado inconsistente: Esperado ${data.type}, recebido ${typeof data.value}`);
        }

        return data.value;
    }

    toJSON(key, encrypted = false) {
        const value = this.getItem(key, encrypted);
        return JSON.stringify({ key, value });
    }

    setJSON(key, jsonString, encrypted = false) {
        try {
            const data = JSON.parse(jsonString);
            this.setItem(key, data.value, typeof data.value, encrypted);
        } catch (error) {
            throw new Error("JSON inválido fornecido para setJSON.");
        }
    }

    removeItem(key) {
        localStorage.removeItem(this._fullKey(key));
    }

    clear() {
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(this.key)) {
                localStorage.removeItem(key);
            }
        });
    }

    _fullKey(key) {
        return `${this.key}:${key}`;
    }
}

function RelistructKey() {
    const length = 32; 
    const hexChars = "0123456789abcdef";
    let key = "";

    for (let i = 0; i < length; i++) {
        key += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return key;
}
