import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import KnappFullfor from '../skjema/knapp-fullfor';
import EkspanderbartInfo from '../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { Checkbox } from 'nav-frontend-skjema';
import { AVBRYT_PATH, REGVELLYKKET_PATH } from '../utils/konstanter';

type EgenProps = RouteComponentProps<MatchProps>;

interface EgenStateProps {
    markert: boolean;
}

class Fullfor extends React.PureComponent<EgenProps, EgenStateProps> {
    constructor(props: EgenProps) {
        super(props);
        this.state = {
            markert: false,
        };
        this.settMarkert = this.settMarkert.bind(this);
    }
    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });
    }
    render() {
        const { history } = this.props;
        return (
            <PanelBlokkGruppe
                knappAksjoner={[
                    <Knapp
                        key="1"
                        type="standard"
                        className="knapp mmr"
                        onClick={() => history.push(`${AVBRYT_PATH}`)}
                    >
                        <Normaltekst><FormattedMessage id="knapp-avbryt"/></Normaltekst>
                    </Knapp>,
                    <KnappFullfor
                        key="2"
                        disabled={!this.state.markert}
                        onClick={() => history.push(`${REGVELLYKKET_PATH}`)}
                    />
                ]}
            >
                <PanelBlokk
                    tittelId="fullfor-header"
                    tittelCssNavnVariant="oransje-variant"
                >
                    <Normaltekst>
                        <FormattedHTMLMessage id={'fullfor-ingress'}/>
                    </Normaltekst>
                    <ul className="typo-normal blokk pml mmt">
                        <li><FormattedMessage id="fullfor-liste-1"/></li>
                        <li><FormattedMessage id="fullfor-liste-2"/></li>
                        <li><FormattedMessage id="fullfor-liste-3"/></li>
                        <li><FormattedMessage id="fullfor-liste-4"/></li>
                    </ul>
                    <EkspanderbartInfo tittelId="fullfor-les-mer">
                        <Normaltekst>
                            <FormattedMessage id="fullfor-les-mer-beskrivelse"/>
                        </Normaltekst>
                    </EkspanderbartInfo>
                </PanelBlokk>
                <PanelBlokk cssVariant="oransje-variant padding-vertikalt-small">
                    <Checkbox
                        onChange={this.settMarkert}
                        checked={this.state.markert}
                        label={<FormattedMessage id="fullfor-sjekkboks"/>}
                        id="fullfor-sjekkboks"
                    />
                </PanelBlokk>
            </PanelBlokkGruppe>

        );
    }
}

export default Fullfor;