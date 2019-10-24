import React from 'react'
import { Animated, Dimensions, View, Easing } from 'react-native'

class FadeIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(300)
    }
  }

  componentDidMount() {
      Animated.timing(this.state.topPosition, {
          toValue: 0,
          easing: Easing.back(),
          duration: 2000,
      }).start();
  }

  render() {
    return (
      <Animated.View
        style={{ top: this.state.topPosition }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeIn
