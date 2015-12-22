import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';

import { Header as BellhopsHeader } from 'stencil';

import imageResolver from 'utils/image-resolver';
let loaderFunc = imageResolver;
if (process.env.BROWSER) {
  loaderFunc = require;
}
const reactLogo = loaderFunc('images/react-logo.png');

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
    return (
      <BellhopsHeader>

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
        </ul>
      </BellhopsHeader>
    );
  }
}

export default Header;
