import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { BellaDatasource } from "./datasources";

export const bellaTools = [
  zodFunction({
    name: "get_information_about_bella",
    description: "Gives information about a person called Bella who is Rikos friend",
    parameters: z.object({}),
    function: async () => {
      const data =  await BellaDatasource.getInformationAboutBella()
      console.log(`🚀 AI tool called =>  get_information_about_bella` );
      return data
    },
  }),
];
