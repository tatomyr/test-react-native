import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  header: {
    color: 'powderblue',
    height: 40,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    backgroundColor: 'powderblue',
  },
  post: {
    padding: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  text: {
    fontSize: 16
  },
  postDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    textAlign: 'right',
    color: 'white',
  },
  input: {
    height: 40,
    color: 'blue',
    fontSize: 16,
  },
  button: {
    fontSize: 16,
  }
});
