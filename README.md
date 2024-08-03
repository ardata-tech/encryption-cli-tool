# Encryption CLI Tool

This is a simple command-line tool for encrypting and decrypting files using a
password. It is built using Deno and the `cliffy` library.

## Installation

1. Install Deno by following the instructions at
   [deno.land](https://deno.land/#installation).

2. Clone this repository or download the script:

```sh
git clone <repository_url>
```

3. Navigate to the directory containing the script:

```sh
cd <repository_directory>
```

4. Compile the script

```sh
deno compile --allow-read --allow-write --allow-run main.ts
```

---

# Usage

The Encryption CLI Tool allows you to encrypt and decrypt files with a password.

## Encrypting a File

To encrypt a file, use the `-e` or `--encrypt` option followed by the file path
and password:

```sh
encryption-cli-tool -e ~/path/to/file.png -p password
```

The encrypted file will be saved with the prefix encrypted- added to the
original file name.

# Decrypting a File

To decrypt a file, use the `-d` or `--decrypt` option followed by the file path
and password:

```sh
encryption-cli-tool -d ~/path/to/file.png -p password
```

The decrypted file will be saved with the prefix decrypted- and the original
file name.
