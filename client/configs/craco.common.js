const path = require('path');

const PATH_SRC = path.resolve(`${__dirname}/../src`);

module.exports = {
    webpack: {
        alias: {
            '@api': `${PATH_SRC}/api/`,
            '@components': `${PATH_SRC}/components/`,
            '@constants': `${PATH_SRC}/constants/`,
            '@hooks': `${PATH_SRC}/hooks/`,
            '@pages': `${PATH_SRC}/pages/`,
            '@store': `${PATH_SRC}/store/`,
            '@utils': `${PATH_SRC}/utils/`,
        },
    },
};
