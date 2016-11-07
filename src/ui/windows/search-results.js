
import _ from '../i18n';
import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  EventListItem,
  UserListItem,
  Header,
} from '../components';

import StyleSheet from '../styles';

export default class SearchResults extends React.Component {

  render() {
    return (
      <View>
        <Header
          title={_('searchResults')}
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        />

        <ScrollView contentContainerStyle={StyleSheet.container}>
          {this.props.users.map(user =>
            <UserListItem
              key={user.id}
              onPress={() => this.props.onPressUser(user)}
              imageSrc={user.imageSrc}
              name={user.name}
              location={user.location}
              dob={user.dob}
              hideDisclosure={true}
            />
          )}
          {this.props.events.map(event =>
            <EventListItem
              key={event.id}
              onPress={() => this.props.onPressEvent(event)}
              image={{uri: event.imageSrc}}
              title={event.title}
              players={event.players} maxPlayers={event.maxPlayers}
              level={event.level}
              venueName={event.address}
              date={event.date}
              distance={event.distance}
            />
          )}
        </ScrollView>

      </View>
    );
  }
}
