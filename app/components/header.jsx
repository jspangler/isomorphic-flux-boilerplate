import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
let reactLogo;
if (process.env.BROWSER) {
  reactLogo = require('images/react-logo.png');
} else {
  reactLogo = imageResolver('images/react-logo.png');
}

@connect(({ requests: { inProgress }, session: { session } }) =>
  ({ inProgress, session }))
class Header extends Component {

  static propTypes = {
    inProgress: PropTypes.bool,
    session: PropTypes.object
  }

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    flux: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  handleLocaleChange(locale) {
    const { flux } = this.context;
    flux.getActions('locale').switchLocale({ locale });
  }

  handleLogout() {
    const { flux } = this.context;
    flux.getActions('session').logout();
  }

  render() {
    const { inProgress, session } = this.props;
    const { locales: [ activeLocale ] } = this.context;

    return (
      <header className='app--header'>
        {/* Spinner in the top right corner */}
        <Spinner active={ inProgress } />

        {/* LangPicker on the right side */}
        <LangPicker
          activeLocale={ activeLocale }
          onChange={ ::this.handleLocaleChange } />

        {/* React Logo in header */}
        <Link to='/' className='app--logo'>
          <img src={ reactLogo } alt='react-logo' />
        </Link>

        {/* Links in the navbar */}
        <ul className='app--navbar text-center reset-list un-select'>
          <li>
            <Link to={ this.i18n('routes.users') }>
              { this.i18n('header.users') }
            </Link>
          </li>
          <li>
            <Link to={ this.i18n('routes.guides') }>
              { this.i18n('header.guides') }
            </Link>
          </li>
          { session ?
            [
              <li key={ 0 }>
                <Link to={ this.i18n('routes.account') }>
                  { this.i18n('header.account') }
                </Link>
              </li>,
              <li key={ 1 }>
                <a href='#' onClick={ ::this.handleLogout }>
                  { this.i18n('header.logout') }
                </a>
              </li>
            ] :
            <li>
              <Link to={ this.i18n('routes.login') }>
                { this.i18n('header.login') }
              </Link>
            </li>
          }
        </ul>
      </header>
    );
  }
}

export default Header;
