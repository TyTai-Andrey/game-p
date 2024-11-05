// local imports
// utilities
import transformVersionToNumber from '../utils/transformVersionToNumber';

const currentVersion = '0.1.0';

const migrateVersions = {
  // Версия в которой были произведены какие-то изменения, требующие миграции
  refactoringSomething: transformVersionToNumber('0.4.2'),
};

export { currentVersion, migrateVersions };
