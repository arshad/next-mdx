import { promises as fs } from "fs"
import path from "path"

const DEFAULT_CONFIG_PATH = "next-mdx.json"

export interface SourceConfig {
  contentPath: string
  basePath: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface Config {
  [key: string]: SourceConfig
}

export async function getConfig(): Promise<Config> {
  const configPath = path.resolve(`${process.cwd()}/${DEFAULT_CONFIG_PATH}`)

  try {
    // TODO: Figure out dynamic import.
    // Switch to next-mdx.config.js?
    const json = await fs.readFile(configPath, "utf-8")
    return JSON.parse(json)
  } catch (error) {
    console.error(error)
  }
}

export async function getSourceConfig(source: string): Promise<SourceConfig> {
  try {
    const config = await getConfig()
    return {
      sortBy: "title",
      sortOrder: "asc",
      ...config[source],
    }
  } catch (err) {
    console.error(`${source} does not exist on ${DEFAULT_CONFIG_PATH}`)
  }
}
