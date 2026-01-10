import { FileUtils } from "@repo/utils";
import { join } from "path";

export class BellaDatasource {
  static async getInformationAboutBella(): Promise<string> {
    const path = join(__dirname,'../../../../files/Bella.md')
    // console.log(`👉 path = `,path );
    const text = await FileUtils.readFile(path);
    return text;
  }
}
