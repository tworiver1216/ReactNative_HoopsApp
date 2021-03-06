
import React from 'react'
import {ScrollView, View} from 'react-native'

import StyleSheet from '../styles'
import {Button, CheckButton, Header, HighlightText, Popup} from '../components'
import _ from '../i18n'

export default class Interests extends React.Component {

  constructor() {
    super()
    this.state = {
      viewAll: false,
      selected: {},
      levelPopupInterest: null,
    }
  }

  onChangeInterest = (interest, value) => {
    if(value) {
      this.setState({levelPopupInterest: interest})
    }else{
      this.onSelectLevel(interest, null)
    }
  }

  onSelectLevel = (interest, level) => {
    let selected = {
      ...this.state.selected,
      [interest.id]: level,
    }

    this.setState({
      selected,
    })

    this.props.onInterestsChange(selected)
  }

  onPressViewAll = () => {
    this.props.onPressViewAll(this.state.selected)
  }

  doneButtonEnabled = () => {
    return Object.keys(this.props.user.interests).length > 0
  }

  render() {
    return (
      <View style={{flex:1}}>
        <InterestLevelPopup
          visible={!!this.state.levelPopupInterest}
          onClose={() => this.setState({levelPopupInterest: null})}
          active={this.state.levelPopupInterest && this.state.levelPopupInterest.active}
          onSelectLevel={(level) => {
            this.onSelectLevel(this.state.levelPopupInterest, level)
          }}
        />

        <Header title={_('interests')} simple hideBackButton/>
        <ScrollView>
          <HighlightText highlight={_('sports')} text={_('interestsBanner')}
                   style={[StyleSheet.text, StyleSheet.interests.bannerText]}
                   highlightStyle={StyleSheet.interests.bannerTextHighlight} />


          {this.props.interests.map((interest, i) =>
            <CheckButton key={interest.name} text={interest.name}
                   icon="plus" checkIcon="checkActive"
                   checked={this.state.selected[interest.id]}
                   onChange={checked => this.onChangeInterest(interest, checked)}
                   style={StyleSheet.interests.checkButtonGradient[i]}
                   containerStyle={StyleSheet.interests.containerStyle}
                   underlayColor={StyleSheet.interests.checkButtonHighlightGradient[i]}
                   textStyle={StyleSheet.interests.checkButtonTextStyle}
                   iconStyle={StyleSheet.interests.checkButtonIconStyle}
                   colorMode="transparentWhiteBorder"
                   checkedIconStyle={[StyleSheet.interests.checkButtonCheckedIconStyle]}/>)}


          <View style={StyleSheet.interests.footer}>
            {!this.state.viewAll && <Button type="rounded" text={_('viewAll')} onPress={this.onPressViewAll} style={StyleSheet.interests.viewAllButton} />}
            <Button
              type={this.doneButtonEnabled() ? 'dialogDefault' : 'dialog'}
              text={_('done')}
              onPress={this.doneButtonEnabled() ? this.props.onDonePress : undefined}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

class InterestLevelPopup extends React.Component {
  render() {
    return (
      <Popup
        visible={this.props.visible}
        onClose={this.props.onClose}
        style={[StyleSheet.popupContainer]}
      >
        {this.props.active ? (
          <Button
            type="alertVertical"
            text={_('remove')}
            onPress={() => {
              this.props.onSelectLevel(null)
              this.props.onClose()
            }}
          />
        ) : (
          <View>
            <Button
              type="alertVertical"
              text={_('casual')}
              onPress={() => {
                this.props.onSelectLevel('casual')
                this.props.onClose()
              }}
            />
            <Button
              type="alertVertical"
              text={_('competitive')}
              onPress={() => {
                this.props.onSelectLevel('competitive')
                this.props.onClose()
              }}
            />
            <Button
              type="alertVertical"
              text={_('both')}
              onPress={() => {
                this.props.onSelectLevel('both')
                this.props.onClose()
              }}
            />
          </View>
        )}
      </Popup>
    )
  }
}

InterestLevelPopup.propTypes = {
  visible: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  interest: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }),
}

Interests.InterestLevelPopup = InterestLevelPopup
