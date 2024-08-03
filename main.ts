import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { decrypt, encrypt } from "@/lib/encryption.ts";

await new Command()
  .name("Encryption CLI Tool")
  .version("0.0.1")
  .description("Encrypt file")
  .usage("[options] [argument]")

  .option("-e, --encrypt", "Encrypt")
  .option("-d, --decrypt", "Decrypt")
  .option("-p, --password <password:string>", "File password")
  .arguments("<path>")
  .action(async (option, path: string) => {
    if (!option.password) {
      console.error("Password is required");
      return;
    }
    if (option.encrypt) {
      const file = await Deno.readFile(path);
      const encryptedFile = await encrypt(file, option.password);
      await Deno.writeFile(
        `encrypted-${path.split("/").at(-1)}`,
        encryptedFile,
      );
    }

    if (option.decrypt) {
      const file = await Deno.readFile(path);
      const decryptedFile = await decrypt(file, option.password);
      await Deno.writeFile(
        `decrypted-${path.split("/").at(-1)?.split("-").at(-1)}`,
        decryptedFile,
      );
    }
  })
  .parse(Deno.args);
