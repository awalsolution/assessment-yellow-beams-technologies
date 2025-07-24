import { App } from '@/src/app';
import { ValidateEnv } from '@/src/utils/validateEnv';
import { AuthRoute } from '@/src/routes/auth';
import { UserRoute } from '@/src/routes/users';
import { CampaignRoute } from '@/src/routes/campaigns';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CampaignRoute()]);

app.listen();
