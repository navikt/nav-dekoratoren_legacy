import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import '@babel/polyfill';

configure({ adapter: new Adapter() });
