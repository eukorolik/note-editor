import './styles.scss';
import './index.pug';
import './core/polyfills';
import './core/dependencies';

// import './dialog-window';
import './layout';
import './main-menu';
import './note';
import './note-editor';
import './note-list';
import './toolbar';

import {bootstrap} from './core/bootstrap';

bootstrap(document.body);
