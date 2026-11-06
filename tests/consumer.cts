import * as api from '@lp-labs/css-color-parser';
import { parseCssColor } from '@lp-labs/css-color-parser';
const blue = parseCssColor('#00f');
if (blue.b !== 1 || blue.r !== 0) throw new Error('Unexpected parsed color');
// @ts-expect-error invalid argument must be rejected by declarations
api.parseCssColor(4);
