import React, { Component, PropTypes } from 'react';
import { IntlMixin } from 'react-intl';

class BecomeBellhopView extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  i18n = IntlMixin.getIntlMessage;

  componentWillMount() {
    const { flux } = this.context;

    flux.getActions('helmet').update({ title: this.i18n('users.page-title') });
  }

  render() {
    return (
      <div>
        testing
      </div>
    );
  }

}

export default BecomeBellhopView;
