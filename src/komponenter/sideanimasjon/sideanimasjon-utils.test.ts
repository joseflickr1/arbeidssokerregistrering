/*tslint:disable:variable-name*/
import { expect } from 'chai';
import {skalAnimereForover} from "./sideanimasjon-utils";
import {DUERNAREGISTRERT_PATH, FULLFOR_PATH, OPPSUMMERING_PATH, SKJEMA_PATH, START_PATH} from "../../utils/konstanter";

export const paths = [
    START_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DUERNAREGISTRERT_PATH
];

const skjemaPath = (n: number) => SKJEMA_PATH + '/' + n;

describe('sideanimasjon-utils', () => {
    it('skalAnimereForover skal returnere et flagg som indikerer hvorvidt siden skal ha bakover-animasjone eller forover-animasjon, definert av rekkefølgen i paths.', () => {
        paths.slice(0, -1).forEach((path, index) => {
            console.log(path);
            expect(skalAnimereForover(path, paths[index + 1])).to.be.equal(true);
            expect(skalAnimereForover(paths[index + 1], path)).to.be.equal(false);
        });
    });

    it('skalAnimereForover også fungere for f.eks. /skjema/4 og /skjema/5.', () => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((index) => {
            expect(skalAnimereForover(skjemaPath(index), skjemaPath(index + 1))).to.be.equal(true);
            expect(skalAnimereForover(skjemaPath(index + 1), skjemaPath(index))).to.be.equal(false);
        });
    });

    it('Skal ignorere skjema-id hvis ikke begge url-ene har skjema i seg.', () => {
        expect(skalAnimereForover(skjemaPath(5), OPPSUMMERING_PATH)).to.be.equal(true);
        expect(skalAnimereForover(OPPSUMMERING_PATH, skjemaPath(5))).to.be.equal(false);
    });
});