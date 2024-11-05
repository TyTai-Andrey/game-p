const path = require('path');

const PATH_SRC = path.resolve(`${__dirname}/../src`);

module.exports = {
    webpack: {
        alias: {
            '@components': `${PATH_SRC}/components/`,
            '@constants': `${PATH_SRC}/constants/`,
            '@pages': `${PATH_SRC}/pages/`,
            '@store': `${PATH_SRC}/store/`,
            '@utils': `${PATH_SRC}/utils/`
        },
    },
};
