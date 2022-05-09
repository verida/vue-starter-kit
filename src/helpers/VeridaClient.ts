import { Context } from "@verida/client-ts";

class VeridaClientAPI {
  context?: Context;
  account: any;
  did: any;
  contextName: any;

  async setContext(context: Context) {
    this.context = context;
    this.did = await this.context.getAccount().did();
    this.contextName = this.context.getContextName();
  }
}

const VeridaClient = new VeridaClientAPI();
export default VeridaClient;
