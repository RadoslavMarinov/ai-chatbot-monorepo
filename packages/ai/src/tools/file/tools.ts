import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { BellaDatasource } from "./datasources";

export const bellaTools = [
  zodFunction({
    name: "get_information_about_person_called_bella",
    description: "Gives information about a person called Bella who is Rikos friend",
    parameters: z.object({}),
    function: async () => {
      const data =  await BellaDatasource.getInformationAboutBella()
      console.log(`🚀 AI tool called =>  get_information_about_bella` );
      return data
    },
  }),

  zodFunction({
    name: "get_information_about_person_called_bella_from_chat",
    description: "Returns context and general information about a person called Bella based on her chat with her friend Riko",
    parameters: z.object({}),
    function: async () => {
      const data =  await BellaDatasource.getInformationAboutBellafromChat()
      console.log(`🚀 AI tool called =>  get_information_about_bella_from_chat` );
      return data
    },
  }),
];
