import express from 'express';
import makeData from './fake_data';
import { slice } from 'lodash';

function _takeLeft<T>(arr: T[], page: number, size: number): T[] {
  const start = (page - 1) * size;
  const length = start + size;
  return slice(arr, start, length);
  // return take(arr, size);
  // return [];
}
class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.route();
  }

  private route() {
    const data = makeData(1000);
    const totalCount = data.length;
    this.app.get('/data', (req: express.Request, res) => {
      let totalPage = Math.floor(totalCount / Number(req.query.size)) + (totalCount % Number(req.query.size) > 0 ? 1 : 0);
      res.json({ 
        result:  _takeLeft(data, Number(req.query.page), Number(req.query.size)),
        totalCount,
        totalPage,
      });
    });
  }

  public getInstance() {
    return this.app;
  }
}

export default Server;
