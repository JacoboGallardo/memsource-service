import { MemsourceClient } from '../clients/memsourceClient';

export class MemsourceService {
  private memsourceClient: MemsourceClient;
  constructor(authorizationToken: string) {
    this.memsourceClient = new MemsourceClient(authorizationToken);
  }

  sendTranslationJob = async (
    sourceLocale: string,
    targetLocales: string[],
    payload: JSON,
  ): Promise<void> => {
    const projectUUID = await this.memsourceClient.createProject(
      this.generateProjectName(payload),
      sourceLocale,
      targetLocales,
    );

    // 1 - Create the project
    // 2 - Cache the project UUID
    // 3 - Create the job linked to the project UUID
    // 4 - Cache the job UUID with the payload so it can be downloaded afterwards
  };

  private generateProjectName = (payload: JSON): string => {
    return 'SOME_NAME_TO_BE_CHANGED';
  };
}
