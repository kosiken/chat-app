import {
HeadLineResponse,
  } from '../types';
  import ApiBase, {Methods} from './api';
  
type HeadLinesResponse = {
    status: string;
    totalResults: number;
    articles: HeadLineResponse[];
}
  export class HeadlineApi extends ApiBase {
    private static _instance: HeadlineApi;
    public loadHeadlines = this.createGenericFetch<HeadLinesResponse, never>(
      '/top-headlines',
      Methods.GET,
    );
  
  
    public static get Instance() {
      return (
        this._instance ||
        (this._instance = new HeadlineApi(
          'https://newsapi.org/v2',
        ))
      );
    }
    public resetAppState() {
      this.setToken('');
    }
  }
  
  export default HeadlineApi.Instance;
  