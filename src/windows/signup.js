import React from 'react'
import {View, Text} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import Button from '../components/button'
import HorizontalRule from '../components/horizontal-rule'
import TextInput from '../components/text-input'
import DateInput from '../components/date-input'
import Form from '../components/form'
import Header from '../components/header'
import LoadingAlert from '../components/loading-alert'
import AvatarEdit from '../components/avatar-edit'
import StyleSheet from '../styles'
import {autocomplete} from '../data/google-places'
import _ from '../i18n'

export default class SignUp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      showDobInfo: false,
      cityText: '',
      city: {},
      citiesAutocomplete: [],
      phone: '',
      image: undefined,
      imageUrl: this.props.imageUrl,
    }
  }

  validate() {
    const {name, email, password, confirmPassword, dob, gender, city} = this.state

    return !!(
      name &&
      email &&
      password && password.length >= 8 &&
      confirmPassword && confirmPassword === password &&
      dob &&
      gender &&
      city.key
    )
  }

  onSubmitEditing = (nextField) => {
    this.refs[nextField].focus()
  }

  onPressMale = () => {
    this.setState({gender: 'male'})
  }

  onPressFemale = () => {
    this.setState({gender: 'female'})
  }

  onPressSignUp = () => {
    this.props.onSignUp(this.state.email, this.state.password, {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      city: this.state.city.text,
      cityGooglePlaceId: this.state.city.key,
      image: this.state.image,
    })
  }

  onPressFacebookConnect = () => {
    this.props.onFacebookSignUp()
  }

  render() {
    const errorCode = this.props.signUpError && this.props.signUpError.code
    const emailError = [
      'auth/email-already-in-use',
      'auth/invalid-email',
    ].indexOf(errorCode) !== -1
    const passwordError = [
      'auth/weak-password',
    ].indexOf(errorCode) !== -1

    return (
      <View style={{flex: 1}}>
        <Header
          title={_('signup')}
          hideSwitcher={true}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        />
        <Form style={StyleSheet.signup.style}>
          <LoadingAlert visible={this.props.isLoading} />
          <Button
            type="facebook"
            icon="facebook"
            text={_('facebookConnect')}
            onPress={this.onPressFacebookConnect}
          />

          <HorizontalRule
            text={_('or')}
            style={StyleSheet.doubleMargin}
          />

          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            type="flat"
            ref="name"
            placeholder={_('name')}
            style={StyleSheet.halfMarginBottom}
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus={true}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => this.onSubmitEditing("email")}
            icon="name"
          />

          {errorCode === 'auth/email-already-in-use' && (
            <Text style={StyleSheet.signup.errorText}>Email already used</Text>
          )}
          {errorCode === 'auth/invalid-email' && (
            <Text style={StyleSheet.signup.errorText}>Invalid email</Text>
          )}

          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            type="flat"
            ref="email"
            error={emailError}
            placeholder={_('email')}
            style={StyleSheet.halfMarginBottom}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="email-address"
            onSubmitEditing={() => this.onSubmitEditing("password")}
            icon="email"
          />

          {errorCode === 'auth/weak-password' && (
            <Text style={StyleSheet.signup.errorText}>Invalid email</Text>
          )}

          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            type="flat"
            ref="password"
            error={passwordError}
            placeholder={_('password')}
            style={StyleSheet.halfMarginBottom}
            secureTextEntry={!this.state.showPassword}
            returnKeyType="next"
            selectTextOnFocus={false}
            clearTextOnFocus={false}
            enablesReturnKeyAutomatically={true}
            icon="password"
            multiline={false}
            rightBar={<Button
              style={StyleSheet.signup.eye}
              type="disclosure"
              active={this.state.showPassword}
              icon="eye"
              onPress={() => this.setState({showPassword: !this.state.showPassword})}
            />}
          />

          <TextInput
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            type="flat"
            ref="confirmPassword"
            error={passwordError}
            placeholder={_('confirmPassword')}
            style={StyleSheet.halfMarginBottom}
            secureTextEntry={!this.state.showConfirmPassword}
            returnKeyType="next"
            selectTextOnFocus={false}
            clearTextOnFocus={false}
            enablesReturnKeyAutomatically={true}
            icon="password"
            multiline={false}
            rightBar={<Button
              style={StyleSheet.signup.eye}
              type="disclosure"
              active={this.state.showPassword}
              icon="eye"
              onPress={() => this.setState({showConfirmPassword: !this.state.showConfirmPassword})}
            />}
          />

          <DateInput
            ref="dob"
            placeholder={_('dob')}
            icon="nappy"
            date={true}
            time={false}
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            value={this.state.dob}
            onChange={(dob) => this.setState({dob})}
          />

          <View style={[StyleSheet.buttons.bar, StyleSheet.doubleMargin]}>
            <Button type="image" icon="male" active={this.state.gender === 'male'} onPress={this.onPressMale}/>
            <View style={StyleSheet.buttons.separator} />
            <Button type="image" icon="female" active={this.state.gender === 'female'} onPress={this.onPressFemale}/>
          </View>

          <TextInput
            value={this.state.cityText}
            onChangeText={(cityText) => {
              this.setState({
                cityText,
                city: {},
              })
              autocomplete(cityText, '(cities)').then(result => {
                this.setState({
                  citiesAutocomplete: result.predictions,
                })
              })
            }}
            type="flat"
            ref="city"
            placeholder={_('city')}
            autocomplete={this.state.citiesAutocomplete.map(suggestion => {
              return {
                key: suggestion.place_id,
                text: suggestion.description,
              }
            })}
            onAutocompletePress={(item) => {
              this.setState({
                cityText: item.text,
                city: item,
                citiesAutocomplete: [],
              })
            }}
            style={StyleSheet.halfMarginBottom}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            icon="city"
            onSubmitEditing={() => this.onSubmitEditing("phone")}
          />

          <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({phone})}
            type="flat"
            ref="phone"
            placeholder={_('optionalPhone')}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="phone-pad"
            icon="phone"
          />

          <AvatarEdit
            onChange={(image) => this.setState({image})}
            imageUrl={this.state.image || this.state.imageUrl}
            style={StyleSheet.singleMarginTop}
          />

          <Button
            type={this.validate() ? "roundedDefault" : "roundedGrey"}
            text={_('signup')}
            onPress={this.validate() ? this.onPressSignUp : undefined}
            style={[StyleSheet.doubleMarginTop, StyleSheet.singleMarginBottom]}
          />

          <KeyboardSpacer/>
        </Form>
      </View>
    )
  }
}

SignUp.propTypes = {
  onSignUp: React.PropTypes.func.isRequired,
}
