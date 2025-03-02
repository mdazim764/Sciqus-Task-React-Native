import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'New Message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Order',
    description: 'You have received a new order',
    time: '5 hours ago',
  },
  {
    id: '3',
    title: 'New Message',
    description: 'You have a new message from Jane Doe',
    time: '1 day ago',
  },
  {
    id: '4',
    title: 'New Order',
    description: 'You have received a new order',
    time: '2 days ago',
  },
  {
    id: '5',
    title: 'New Message',
    description: 'You have a new message from John Doe',
    time: '1 week ago',
  },
  {
    id: '6',
    title: 'New Order',
    description: 'You have received a new order',
    time: '2 weeks ago',
  },
];

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});
