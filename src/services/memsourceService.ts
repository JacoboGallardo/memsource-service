import { MemsourceClient } from '../clients/memsourceClient';

export class MemsourceService {
  private memsourceClient: MemsourceClient;
  constructor(authorizationToken: string) {
    this.memsourceClient = new MemsourceClient(authorizationToken);
  }

  sendTranslationJob = async (
    pageName: string,
    sourceLocale: string,
    targetLocales: string[],
    payload: object
  ): Promise<string> => {
    let jobUUID = '';
    const projectUUID = await this.memsourceClient.createProject(
      this.generateProjectName(pageName, sourceLocale, targetLocales),
      sourceLocale,
      targetLocales
    );

    jobUUID = await this.memsourceClient.createJob(
      projectUUID,
      targetLocales,
      payload
    );

    return jobUUID;
  };

  private generateProjectName = (
    pageName: string,
    sourceLocale: string,
    targetLocales: string[]
  ): string => {
    return `MLP ${pageName} - ${sourceLocale.toLowerCase()} to ${targetLocales.join(
      ' '
    )} ${new Date().toISOString()}`;
  };
}
