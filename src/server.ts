import { App } from '@/src/app';
import { ValidateEnv } from '@/src/utils/validateEnv';
import { AuthRoute } from '@/src/routes/auth';
import { CampaignRoute } from '@/src/routes/campaigns';
import { UserRoute } from '@/src/routes/users';

ValidateEnv();

const app = new App([new AuthRoute(), new CampaignRoute(), new UserRoute()]);

app.listen();
