import {
  All,
  CACHE_MANAGER,
  Controller,
  Inject,
  Req,
  Res,
} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  @All('/*')
  async getHello(@Req() req, @Res() res): Promise<void> {
    const recipent = req.originalUrl.split('/')[1];
    const recipentUrl = process.env[recipent];

    if (recipentUrl) {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${recipentUrl}${req.originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      };
      const cachKey = `${axiosConfig.method}_${axiosConfig.url}`;
      const cachValue = await this.cacheManager.get(cachKey);

      if (!cachValue) {
        this.appService.getProducts(axiosConfig).subscribe(
          async (resp) => {
            const data = resp.data;
            await this.cacheManager.set(cachKey, data, { ttl: 120 });
            res.json(data);
          },
          (err) => {
            if (err.response) {
              console.log('some error: ', err.response);
              const { status, data } = err.response;
              res.status(status).json(data);
            } else {
              console.log('some error: ', err.message);
              res.status(500).json({ error: err.message });
            }
          },
        );
      } else {
        console.log('cach: ', cachValue);
        res.json(cachValue);
      }
    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }
  }
}
