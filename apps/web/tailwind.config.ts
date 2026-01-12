import { Config } from "tailwindcss";
import config from '@repo/tailwind-config/';

const webConfig: Config = {
    ...config,
    presets:[config]
}
export default webConfig;