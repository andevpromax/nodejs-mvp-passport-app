import path from 'path';
import Sequelize from 'sequelize';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'mvc_demo.sqlite'),
});

export default sequelize;
