import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/*')
  getHello(@Req() req, @Res() res): void {
    console.log('originalUrl', req.originalUrl);
    console.log('method', req.method);
    console.log('body', req.body);

    const recipent = req.originalUrl.split('/')[1];
    const recipentUrl = process.env[recipent];
    console.log('recipentUrl', recipentUrl);

    if (recipentUrl) {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${recipentUrl}${req.originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      };

      console.log(axiosConfig);

      this.appService.getProducts(axiosConfig).subscribe(
        (resp) => {
          console.log('resp.data: ', resp.data);
          res.json(resp.data);
        },
        (err) => {
          console.log('some error: ', JSON.stringify(err));

          if (err.response) {
            const { status, data } = err.response;
            res.status(status).json(data);
          } else {
            res.status(500).json({ error: err.message });
          }
        },
      );
    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }
  }
}
