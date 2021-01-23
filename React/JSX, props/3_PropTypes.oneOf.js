/*
  PropTypes.oneOf([~, ~, ~, ...])
  - prop의 값이 될 수 있는 것들의 리스트 지정.
  - prop의 값이 배열의 요소들 중 한 가지에 해당해야만 할 때.
*/
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export default Weather = ({ temp, condition }) => {
  return (
    <View style={styles.container}>
      <Text>{condition}</Text>
      <Text>{temp}℃</Text>
    </View>
  );
};

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
    "Clear",
    "Clouds",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
