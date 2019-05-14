import * as React from 'react';
import './skiplinks.less';

class Skiplinks extends React.Component {
    render() {
        return (
            <>
                <div className="hodefot">
                    <h2 className="divider">Skip links</h2>
                </div>
                <div id="skiplinks">
                    <div className="hodefot">
                        <nav>
                            <a href="#" className="visuallyhidden focusable">Til hovedmeny</a>
                            <a href="#" className="visuallyhidden focusable">Til hovedinnhold</a>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
}
export default Skiplinks;


