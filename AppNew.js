import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';

const screen = Dimensions.get('screen');

const drawerWidth = screen.width*0.7;

class Application extends React.Component {
  state = {
    isOpened: false,
    left: new Animated.Value(0)
  }

  componentDidMount = () => {

    setInterval(() => {
    const { left, isOpened } = this.state;

      if(isOpened) {
        Animated.timing(
          this.state.left, {
            duration: 500,
            toValue: 0
          }).start();
        this.setState({
          isOpened: false
        });
      } else {
        Animated.timing(
          this.state.left, {
            duration: 500,
            toValue: 1
          }).start();
        this.setState({
          isOpened: true
        });
      }
    },3000);

    
  }

  render () {
    const {
      left
    } = this.state;

    return (
      <View style={styles.screenWrapper}>
        <Animated.View
          style={[styles.drawerWrapper, {
            width: drawerWidth,
            transform: [{
              translateX: this.state.left.interpolate({
                inputRange: [0, 1],
                outputRange: [-drawerWidth, 0] // 0 : 150, 0.5 : 75, 1 : 0
              })
            }],
          }]}
        >
          <Button title='Drawer' style={styles.text}></Button>
        </Animated.View>
        <Animated.View style={[styles.content,
        {
            transform: [{
              translateX: this.state.left.interpolate({
                inputRange: [0, 1],
                outputRange: [-drawerWidth, 0]
              }),
            },
            {
              scale: this.state.left.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9]
              }),
            }
            ],
          }]}>
          <Text style={styles.text}>Content</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(250, 133, 145)'
  },
  drawerWrapper: {
    width: '60%',
    height: '100%',
    backgroundColor: 'rgb(249, 115, 129)'
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(247, 74, 90)',
    elevation: 1
  },
  drawerHided: {
    left: '-50%'
  },
  text: {
    fontSize: 25,
    color: 'white',
    width: '100%',
    textAlign: 'center'
  }
});

export default Application;