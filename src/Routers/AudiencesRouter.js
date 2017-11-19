import ClassesRouter from './ClassesRouter';
import * as middleware from '../middlewares';

export class AudiencesRouter extends ClassesRouter {

  className() {
    return '_Audience';
  }

  handleFind(req) {
    return ClassesRouter.handleFindForClass('_Audience', req).then((response) => {
      response.results.forEach((item) => {
        item.query = JSON.parse(item.query);
      });
      return {response: response};
    });
  }

  handleGet(req) {
    return super.handleGet(req)
      .then((data) => {
        data.response.query = JSON.parse(data.response.query);

        return data;
      });
  }

  mountRoutes() {
    this.route('GET','/push_audiences', middleware.promiseEnforceMasterKeyAccess, req => { return this.handleFind(req); });
    this.route('GET','/push_audiences/:objectId', middleware.promiseEnforceMasterKeyAccess, req => { return this.handleGet(req); });
    this.route('POST','/push_audiences', middleware.promiseEnforceMasterKeyAccess, req => { return this.handleCreate(req); });
    this.route('PUT','/push_audiences/:objectId', middleware.promiseEnforceMasterKeyAccess, req => { return this.handleUpdate(req); });
    this.route('DELETE','/push_audiences/:objectId', middleware.promiseEnforceMasterKeyAccess, req => { return this.handleDelete(req); });
  }
}

export default AudiencesRouter;
