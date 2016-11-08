
import moment from 'moment';
import _ from '../i18n';

import React from 'react';


import {View, Image, Text, TouchableHighlight} from 'react-native';

import StyleSheet from '../styles';

export default class EventListItem extends React.Component {

  render() {
    let date = moment(this.props.date).calendar(null, {
      sameDay: "[Today], HH:mm",
      nextDay: "[Yesterday], HH:mm",
    });

    return (
      <TouchableHighlight style={[StyleSheet.eventListItem.container, this.props.style]}
                onPress={this.props.onPress}
                activeOpacity={1.0}
                underlayColor={StyleSheet.eventListItem.underlayColor}>
        <View style={StyleSheet.eventListItem.wrapper}>
          <View style={StyleSheet.eventListItem.imageContainer}>
            <Image source={this.props.image} style={StyleSheet.eventListItem.image} />
          </View>

          <View style={StyleSheet.eventListItem.textContainer}>
            {this.props.distance && <Text style={[StyleSheet.text, StyleSheet.eventListItem.distance]}>{this.props.distance.toFixed(2)} mi</Text>}
            <Text style={[StyleSheet.eventListItem.text, StyleSheet.eventListItem.title]} numberOfLines={1} ellipsizeMode="tail">{this.props.title}</Text>
            <Text style={[StyleSheet.eventListItem.text, StyleSheet.eventListItem.detail]} numberOfLines={2} ellipsizeMode="tail">
              {_('players')}&nbsp;
              <Text style={StyleSheet.eventListItem.highlight}>
                <Text>{this.props.players ? this.props.players.length : ''}</Text>
                {this.props.maxPlayers && <Text>/{this.props.maxPlayers}</Text>}
              </Text>
              {'\u00a0\u00a0|\u00a0\u00a0'}
              {_('level')} <Text style={StyleSheet.eventListItem.highlight}>{this.props.level}</Text>{'\n'}
              <Text style={StyleSheet.eventListItem.venue}>{this.props.venueName}</Text>{'\u00a0\u00a0|\u00a0\u00a0'}
              <Text style={StyleSheet.eventListItem.date}>{date}</Text>
            </Text>
          </View>

          {!this.props.hideDisclosure && (
            <TouchableHighlight
              underlayColor={StyleSheet.colors.transparent}
              onPress={this.props.onPressDisclosure}
              hitSlop={{top: 10, right: 10, bottom: 10, left: 0}}
            >
              <Image
                source={this.props.disclosure || StyleSheet.icons.chevronRight}
                style={StyleSheet.eventListItem.disclosure}
              />
            </TouchableHighlight>
          )}

          {this.props.free && <Image source={StyleSheet.icons.free} style={StyleSheet.eventListItem.freeIcon} />}
        </View>
      </TouchableHighlight>
    );
  }
};

