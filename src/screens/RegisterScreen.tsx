import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { registerUser } from '../services/authService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [accountType, setAccountType] = useState<'PF' | 'PJ'>('PF');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !document) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        accountType,
        document,
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setDocument('');
      setAccountType('PF');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível cadastrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#888"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        placeholder={accountType === 'PF' ? 'CPF' : 'CNPJ'}
        placeholderTextColor="#888"
        style={styles.input}
        value={document}
        onChangeText={setDocument}
      />

      <View style={styles.typeContainer}>
        <Pressable
          style={[
            styles.typeButton,
            accountType === 'PF' && styles.typeButtonActive,
          ]}
          onPress={() => setAccountType('PF')}
        >
          <Text
            style={[
              styles.typeButtonText,
              accountType === 'PF' && styles.typeButtonTextActive,
            ]}
          >
            PF
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeButton,
            accountType === 'PJ' && styles.typeButtonActive,
          ]}
          onPress={() => setAccountType('PJ')}
        >
          <Text
            style={[
              styles.typeButtonText,
              accountType === 'PJ' && styles.typeButtonTextActive,
            ]}
          >
            PJ
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1d24',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3f8f63',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#3f8f63',
  },
  typeButtonText: {
    color: '#3f8f63',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#3f8f63',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});