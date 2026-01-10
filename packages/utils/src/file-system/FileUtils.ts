import { readFile, writeFile } from "fs/promises";

export class FileUtils {
  static async readFile(path: string): Promise<string> {
    try {
      return await readFile(path, "utf8");
    } catch (err) {
      console.error(`❌ Error reading file: ${err}`);
      throw err;
    }
  }

  static async writeFile(path: string, data: string): Promise<void> {
    try {
      await writeFile(path, data);
    } catch (err) {
      console.error(`❌ Error writing file: ${err}`);
      throw err;
    }
  }


  static async readJsonFile<T extends unknown>(path: string):Promise<T> {
    const text =  await this.readFile(path)
    return JSON.parse(text) as T
  }


}