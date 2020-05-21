module.exports = {
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    roots: ['<rootDir>/test'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
