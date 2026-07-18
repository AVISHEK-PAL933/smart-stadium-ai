import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { Toast } from '../../components/Toast';


const PAYMENT_OPTIONS = [
  { id: '1', type: 'Visa', last4: '4242', icon: 'credit-card', isDefault: true },
  { id: '2', type: 'Mastercard', last4: '8888', icon: 'credit-card', isDefault: false },
  { id: '3', type: 'Apple Pay', last4: '', icon: 'apple', isDefault: false },
  { id: '4', type: 'Google Pay', last4: '', icon: 'google', isDefault: false },
  { id: '5', type: 'PayPal', last4: 'user@email.com', icon: 'paypal', isDefault: false },
  { id: '6', type: 'UPI', last4: 'user@upi', icon: 'bank-transfer', isDefault: false },
];

export default function PaymentMethods() {
  const [methods, setMethods] = useState(PAYMENT_OPTIONS);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const { theme, themeColors } = useGlobalContext();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const setDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    showToast('Default payment method updated.');
  };

  const removeMethod = (id: string) => {
    Alert.alert('Remove Card', 'Are you sure you want to remove this payment method?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {
        setMethods(methods.filter(m => m.id !== id));
        showToast('Payment method removed.');
      }},
    ]);
  };

  const addMethod = () => {
    Alert.alert('Add Payment Method', 'This is a demo. In production, this would open a secure payment sheet.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Payment Methods" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {methods.map((method) => (
            <GlassCard key={method.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons name={method.icon as any} size={28} color="#00e5ff" />
                </View>
                <View>
                  <Text style={[styles.cardType, { color: themeColors.text }]}>{method.type}</Text>
                  {method.last4 ? <Text style={styles.cardSub}>**** {method.last4}</Text> : null}
                </View>
              </View>
              <View style={styles.cardRight}>
                {method.isDefault ? (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setDefault(method.id)} style={styles.actionBtn}>
                    <Text style={styles.actionText}>Set Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => removeMethod(method.id)} style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={20} color="#ff1744" />
                </TouchableOpacity>
              </View>
            </GlassCard>
          ))}
          
          <TouchableOpacity style={styles.addBtn} onPress={addMethod}>
            <Ionicons name="add-circle-outline" size={24} color="#00e5ff" />
            <Text style={styles.addBtnText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast visible={toastVisible} message={toastMessage} onHide={() => setToastVisible(false)} type="success" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { padding: Theme.spacing.m, gap: Theme.spacing.m },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.m,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  iconBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(0,229,255,0.1)',
    alignItems: 'center', justifyContent: 'center'
  },
  cardType: { fontSize: 16, fontWeight: 'bold' },
  cardSub: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
  cardRight: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  defaultBadge: {
    backgroundColor: 'rgba(0,229,255,0.2)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4,
  },
  defaultText: { color: '#00e5ff', fontSize: 12, fontWeight: 'bold' },
  actionBtn: { padding: 4 },
  actionText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  deleteBtn: { padding: 4 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1, borderColor: 'rgba(0,229,255,0.3)', borderStyle: 'dashed',
    marginTop: Theme.spacing.l,
  },
  addBtnText: { color: '#00e5ff', fontSize: 16, fontWeight: 'bold' },
});
