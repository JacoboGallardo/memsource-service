import axios from 'axios';

export class MemsourceClient {
  private authorizationToken: string;

  constructor(authorizationToken: string) {
    this.authorizationToken = authorizationToken;
  }

  public createProject = async (
    name: string,
    sourceLocale: string,
    targetLocales: string[]
  ): Promise<string> => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.authorizationToken}`,
        'Content-Type': 'application/json'
      }
    };

    const bodyParameters = {
      name,
      sourceLang: this.convertToMemsourceLocale(sourceLocale),
      targetLangs: targetLocales.map(this.convertToMemsourceLocale)
    };

    try {
      const result = await axios.post(
        'https://cloud.memsource.com/web/api2/v1/projects',
        bodyParameters,
        config
      );

      return result.data.uid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public createJob = async (
    projectUUID: string,
    targetLocales: string[],
    jsonToTranslate: object
  ): Promise<string> => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.authorizationToken}`,
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'filename=file.json',
        Memsource: JSON.stringify({
          targetLangs: targetLocales.map(this.convertToMemsourceLocale)
        })
      }
    };

    try {
      const result = await axios.post(
        `https://cloud.memsource.com/web/api2/v1/projects/${projectUUID}/jobs`,
        jsonToTranslate,
        config
      );

      return result.data.uid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  private convertToMemsourceLocale = (locale: string): string => {
    const memsourceLocale = locale
      .split('-')
      .map(item => item.toLowerCase())
      .join('_');
    return memsourceLocale;
  };
}
