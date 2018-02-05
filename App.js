import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

export default class App extends React.Component {
  state = {
    input: '',
    posts: [],
  };

  componentDidMount() {
    this.getPosts();
  }

  onPressButton() {
    this.addPost();
  }

  getPosts() {
    fetch('https://test-gql.herokuapp.com/posts')
      .then(res => res.json())
      .then(({ data: { posts } }) => {
        this.setState({ posts: posts.map(item => ({ ...item, key: item._id })) });
      })
      .catch(err => Alert.alert(err));
  }

  addPost() {
    fetch('https://test-gql.herokuapp.com/graphql', {
    	headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    	method: 'post',
    	body: JSON.stringify({ query: `mutation {
        addPost(data: {
           text: "${this.state.input}",
           method: "ReactNativeApp/GrapgQL"
        }) {
          _id
          text
          date
          method
        }
      }` }),
    })
      .then(res => res.json())
      .then(({ data: { addPost: posts } }) => {
        this.setState({
          posts: posts.map(item => ({ ...item, key: item._id })),
          input: '',
        });
        setTimeout(() => this.refs.scroll.scrollToEnd(), 0);
      })
      .catch(err => Alert.alert(err));

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome to chat!
        </Text>

        <ScrollView
          ref="scroll"
        >
          <FlatList
            style={styles.list}
            data={this.state.posts}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.postDetails}>
                  <Text style={styles.details}>{moment(+item.date).from()}</Text>
                  <Text style={styles.details}>via {item.method || 'Unknown method'}</Text>
                </View>
              </View>
            )}
          />
        </ScrollView>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Type a post"
            value={this.state.input}
            onChangeText={input => this.setState({input})}
          />

          <Button
            style={styles.button}
            onPress={() => this.onPressButton()}
            title="Submit"
          />
        </View>
      </View>

    );
  }
}
