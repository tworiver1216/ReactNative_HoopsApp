import React from 'react'
import {connect} from 'react-redux'

import {userActions} from '../actions'
import {SignUpFacebookExtra as _SignUpFacebookExtra} from '../windows'

class SignUpFacebookExtra extends React.Component {

  componentDidMount() {
    this.props.loadFacebookData()
  }

  render() {
    const facebookUser = this.props.user.facebookUser || {}
    const picture = facebookUser.picture ? facebookUser.picture.data : undefined

    let facebookImageSrc = null
    if (picture && picture.is_silhouette === false) {
      facebookImageSrc = picture.url
    }

    return (
      <_SignUpFacebookExtra
        onPressContinue={this.props.onPressContinue}
        isLoading={this.props.user.isFacebookUserLoading}
        facebookName={facebookUser.name}
        facebookEmail={facebookUser.email}
        facebookUsername={facebookUser.username}
        facebookDob={new Date(facebookUser.birthday)}
        facebookGender={facebookUser.gender}
        facebookCity={facebookUser.city}
        facebookPhone={facebookUser.phone}
        facebookImageSrc={facebookImageSrc}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    onPressContinue: (data) => dispatch(userActions.facebookSaveExtra(data)),
    loadFacebookData: () => dispatch(userActions.loadFacebookData()),
  }),
)(SignUpFacebookExtra)
