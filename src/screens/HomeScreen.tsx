import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../services/firebase';
import { getCurrentUserProfile } from '../services/authService';

export default function HomeScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const profile = await getCurrentUserProfile(user.uid);

      if (profile?.name) {
        setName(profile.name);
      }
    }

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seeds</Text>
      <Text style={styles.subtitle}>
        {name ? `Bem-vinda, ${name}` : 'Home do aplicativo'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#b6b6b6',
    fontSize: 16,
    marginTop: 8,
  },
});