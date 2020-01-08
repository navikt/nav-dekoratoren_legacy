import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Skiplinks from './Skiplinks';

configure({ adapter: new Adapter() });

describe('<Skiplinks>', () => {
    const wrapper = shallow(<Skiplinks />);

    it('Skal rendre lenke til hovedmeny', () => {
        expect(wrapper.find('#hovedmenylenke').text()).toEqual(
            'Gå til hovedmeny'
        );
    });

    it('Skal rendre lenke til hovedinnhold', () => {
        expect(wrapper.find('#hovedinnholdlenke').text()).toEqual(
            'Gå til hovedinnhold'
        );
    });

    it('Skal rendre lenke til Søk', () => {
        expect(wrapper.find('#soklenke').text()).toEqual('Gå til søk');
    });

    it('Skal rendre 3 skiplinks-lenker', () => {
        expect(wrapper.find('.visuallyhidden.focusable')).toHaveLength(3);
    });
});
