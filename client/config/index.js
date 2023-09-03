import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();

export const API_URL = config.API_URL;
