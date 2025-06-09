import { Cardboard } from '../src/cardboard.js';
import * as fs from 'fs';

describe('Cardboard', () => {
    it('loads version', async () => {
        const v1 = Cardboard.version;
        const path = require('path');
        const packageJsonPath = path.join(__dirname, '../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        expect(v1).toEqual(packageJson.version);
    });
});