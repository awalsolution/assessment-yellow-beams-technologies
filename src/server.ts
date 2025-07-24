import { App } from '@/src/app';
import { AuthRoute } from '@/src/routes/auth';
import { UserRoute } from '@/src/routes/users';
import { ValidateEnv } from '@/src/utils/validateEnv';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute()]);

app.listen();
