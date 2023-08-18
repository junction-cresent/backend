import { Injectable, Logger } from '@nestjs/common';
import { AppInfoDto, Deployment } from './common/dto/app-info.dto';

import _ from 'lodash';

@Injectable()
export class AppService {
  private appInfo: AppInfoDto;
  private readonly logger = new Logger(AppService.name);

  async onModuleInit() {
    await this.getBackendInfo();
  }

  async getBackendInfo(): Promise<AppInfoDto> {
    if (this.appInfo) return this.appInfo;

    const packageFile = await import('../package.json');
    const packageInfo = _.pick(
      packageFile,
      'name',
      'version',
      'description',
      'author',
    );
    const mode = (process.env.NODE_ENV as Deployment) || 'prod';

    this.appInfo = { ...packageInfo, mode };
    return this.appInfo;
  }
}
