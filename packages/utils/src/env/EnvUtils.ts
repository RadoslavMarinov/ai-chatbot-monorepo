export class EnvUtils {
  static getEnvVariable<V extends string>(name: V, defaultVal?:string): string {
    const value = process.env[name] || defaultVal;
    if (!value) {
      throw new Error(`Environment variable ${name} is not set.`);
    }
    return value;
  }

  static getAsNumber(name: string, defaultVal?: number): number {
    const value = process.env[name] || defaultVal;
    this.getEnvVariable(name, defaultVal?.toString());
    return Number(value)
  }
}
