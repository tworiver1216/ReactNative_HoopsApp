
import _ from '../i18n';
import React from 'react';
import {View, ScrollView} from 'react-native';

import {Window, Button, Popup, EventListItem, SwitchButton, TabBar} from '../components';
import StyleSheet from '../styles';

import Manage from './manage';

export default class MyEvents extends React.Component {

  static getTest(close) {
    return {
      title: 'My Events',
      view: Window.Participant,
      viewProps: { initialTab: MyEvents, onClose: close }
    };
  }

  constructor() {
    super();
    this.state = {
      tab: 'upcoming',
      disclosureEvent: null,
    };
  }

  onChangeSwitch(switchValue) {
    this.props.onChangeAvailability(switchValue);
  }

  onChangeMode(nextMode, nextProps) {
    nextProps.initialTab = Manage;
  }

  onPressEvent(event) {
    this.props.onPressEvent(event);
  }

  onPressDisclosure(event) {
    this.setState({disclosureEvent: event});
  }

  onPressDropOut() {
    //TODO
    //let event = this.state.disclosureEvent;
    this.setState({disclosureEvent: null});
  }

  onPressEventDetails() {
    this.props.onPressEvent(this.state.disclosureEvent);
    this.setState({disclosureEvent: null});
  }

  onPressOrganizerDetails() {
    //TODO
    this.setState({disclosureEvent: null});
  }

  onPressJoin() {
    //TODO
    this.setState({disclosureEvent: null});
  }

  onPressRemove() {
    //TODO
    this.setState({disclosureEvent: null});
  }

  onPressParticipateAgain() {
    //TODO
    this.setState({disclosureEvent: null});
  }

  render() {
    let events = {
      upcoming: this.props.upcoming,
      saved: this.props.saved,
      history: this.props.history,
    }[this.state.tab];

    return (
      <TabBar
        title={undefined}
        mode={this.props.mode}
        actionIcon="actionSearch"
        actionText={_('search')}
        onActionPress={this.props.onPressSearch}
        accessoryViews={(
          <SwitchButton value={this.props.availability} onChange={this.onChangeSwitch.bind(this)}/>
        )}
        onTabPress={this.props.onTabPress}
        currentTab="myEvents"
      >
        <DisclosurePopup
          type={this.state.tab}
          visible={!!this.state.disclosureEvent}
          onClose={() => this.setState({disclosureEvent: null})}

          onPressDropOut={this.onPressDropOut.bind(this)}
          onPressEventDetails={this.onPressEventDetails.bind(this)}
          onPressOrganizerDetails={this.onPressOrganizerDetails.bind(this)}
          onPressJoin={this.onPressJoin.bind(this)}
          onPressRemove={this.onPressRemove.bind(this)}
          onPressParticipateAgain={this.onPressParticipateAgain.bind(this)}
        />

        <View style={StyleSheet.buttons.bar}>
          <Button type="top" text={_('upcoming')} active={this.state.tab === 'upcoming'} onPress={() => this.setState({ tab: 'upcoming' })} />
          <Button type="top" text={_('saved')} active={this.state.tab === 'saved'} onPress={() => this.setState({ tab: 'saved' })} />
          <Button type="top" text={_('history')} active={this.state.tab === 'history'} onPress={() => this.setState({ tab: 'history' })} />
        </View>

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {events.map(event =>
            <EventListItem key={event.id}
                     onPress={() => this.onPressEvent(event)}
                     image={StyleSheet.images[event.image]}
                     title={event.title}
                     players={event.players} maxPlayers={event.maxPlayers}
                     level={event.level}
                     venue={event.venue}
                     disclosure={StyleSheet.icons.menu}
                     onPressDisclosure={() => this.onPressDisclosure(event)}
                     distance={event.distance}
                     date={event.date} />)}
        </ScrollView>
      </TabBar>
    );
  }
}

class DisclosurePopup extends React.Component {

  _renderUpcomingOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('dropOut')} onPress={this.props.onPressDropOut} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
      </View>
    );
  }

  _renderSavedOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('join')} onPress={this.props.onPressJoin} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
        <Button type="alertVerticalDefault" text={_('remove')} onPress={this.props.onPressRemove} />
      </View>
    );
  }

  _renderHistoryOptions() {
    return (
      <View>
        <Button type="alertVertical" text={_('participateAgain')} onPress={this.props.onPressParticipateAgain} />
        <Button type="alertVertical" text={_('eventDetails')} onPress={this.props.onPressEventDetails} />
        <Button type="alertVertical" text={_('organizerDetails')} onPress={this.props.onPressOrganizerDetails} />
      </View>
    );
  }

  render() {
    let buttons;
    if(this.props.type === 'upcoming'){
      buttons = this._renderUpcomingOptions();
    }else if(this.props.type === 'saved') {
      buttons = this._renderSavedOptions();
    }else{
      buttons = this._renderHistoryOptions();
    }

    return (
      <Popup
        visible={this.props.visible}
        onClose={this.props.onClose}
        style={StyleSheet.dialog.optionsMenu}
      >
        {buttons}
      </Popup>
    );
  }
}
