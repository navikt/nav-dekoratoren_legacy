import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import '@babel/polyfill';

configure({ adapter: new Adapter() });
