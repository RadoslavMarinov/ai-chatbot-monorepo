import { FileUtils } from "@repo/utils";
import { join } from "path";
import z from "zod";

const getInformationAboutBellafromChatZod = z.string().describe("Returns information about Bella based on her chat with Riko")
type GetInformationAboutBellafromChatOut = z.infer<typeof getInformationAboutBellafromChatZod>


export class BellaDatasource {
  static async getInformationAboutBella(): Promise<string> {
    const path = join(__dirname,'../../../../files/Bella.md')
    const text = await FileUtils.readFile(path);
    return text;
  }

  static async getInformationAboutBellafromChat(): Promise<GetInformationAboutBellafromChatOut> {
    const path = join(__dirname,'../../../../files/BellaChat.md');
    const text = await FileUtils.readFile(path);
    return text;
  }

}
