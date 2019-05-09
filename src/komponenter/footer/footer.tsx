import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './footer.less';

class Footer extends React.Component {
    render() {
        return (
            <div className="hodefot">
                <footer className="sitefooter" role="contentinfo">
                    <Sidetittel className="footer__tittel">
                        NAV FOOTER
                    </Sidetittel>
                </footer>
            </div>
        );
    }
}
export default Footer;
