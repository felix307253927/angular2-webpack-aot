import { platformBrowser }    from '@angular/platform-browser';
//Ignore error here, you can also npm run ngc eliminate the error by running npm run ngc
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
