import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Gender Icons
const MaleIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="10" cy="14" r="5" />
    <Path d="M14 10l5-5" />
    <Path d="M19 5h-4" />
    <Path d="M19 5v4" />
  </Svg>
);

const FemaleIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="10" r="5" />
    <Path d="M12 15v7" />
    <Path d="M9 19h6" />
  </Svg>
);

export default function PersonalDataScreen() {
  const router = useRouter();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(24);
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const user = auth().currentUser;

  // Fetch existing user data
  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            if (data) {
              if (data.gender) setGender(data.gender);
              if (data.age) setAge(data.age);
              if (data.height) setHeight(data.height.toString());
              if (data.heightUnit) setHeightUnit(data.heightUnit);
              if (data.weight) setWeight(data.weight.toString());
              if (data.weightUnit) setWeightUnit(data.weightUnit);
            }
          }
          setFetching(false);
        }, (error) => {
           console.error("Error fetching user data: ", error);
           setFetching(false);
        });

      return () => unsubscribe();
    } else {
        setFetching(false);
    }
  }, [user]);

  const handleNext = async () => {
    if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
    }

    setLoading(true);
    try {
        await firestore().collection('users').doc(user.uid).set({
            gender,
            age,
            height: parseFloat(height) || 0,
            heightUnit,
            weight: parseFloat(weight) || 0,
            weightUnit,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        // Navigate to Dashboard or go back if editing
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)');
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to save data. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (fetching) {
      return (
        <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color="#ccff00" />
        </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f230f" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#f1f5f9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tell us about yourself</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.description}>
          This information helps us calculate your BMI and daily calorie needs.
        </Text>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENDER</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={[
                styles.genderButton,
                gender === 'male' ? styles.genderButtonSelected : styles.genderButtonUnselected
              ]}
            >
              <View style={gender === 'male' ? styles.iconSelected : styles.iconUnselected}>
                 <MaleIcon color={gender === 'male' ? '#1f230f' : '#cbd5e1'} />
              </View>
              <Text style={[
                styles.genderText,
                gender === 'male' ? styles.textSelected : styles.textUnselected
              ]}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGender('female')}
              style={[
                styles.genderButton,
                gender === 'female' ? styles.genderButtonSelected : styles.genderButtonUnselected
              ]}
            >
              <View style={gender === 'female' ? styles.iconSelected : styles.iconUnselected}>
                 <FemaleIcon color={gender === 'female' ? '#1f230f' : '#cbd5e1'} />
              </View>
              <Text style={[
                styles.genderText,
                gender === 'female' ? styles.textSelected : styles.textUnselected
              ]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Age Input */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AGE</Text>
            <Text style={styles.valueText}>
              {age} <Text style={styles.unitText}>years</Text>
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={10}
              maximumValue={100}
              step={1}
              value={age}
              onValueChange={setAge}
              minimumTrackTintColor="#ccff00"
              maximumTrackTintColor="rgba(204, 255, 0, 0.1)"
              thumbTintColor="#ccff00"
            />
          </View>
        </View>

        {/* Height Input */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HEIGHT</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                onPress={() => setHeightUnit('cm')}
                style={[styles.toggleButton, heightUnit === 'cm' && styles.toggleButtonSelected]}
              >
                <Text style={[styles.toggleText, heightUnit === 'cm' && styles.toggleTextSelected]}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHeightUnit('ft')}
                style={[styles.toggleButton, heightUnit === 'ft' && styles.toggleButtonSelected]}
              >
                <Text style={[styles.toggleText, heightUnit === 'ft' && styles.toggleTextSelected]}>ft</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder={heightUnit === 'cm' ? "180" : "5.9"}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardType="numeric"
          />
        </View>

        {/* Weight Input */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>WEIGHT</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                onPress={() => setWeightUnit('kg')}
                style={[styles.toggleButton, weightUnit === 'kg' && styles.toggleButtonSelected]}
              >
                <Text style={[styles.toggleText, weightUnit === 'kg' && styles.toggleTextSelected]}>kg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setWeightUnit('lb')}
                style={[styles.toggleButton, weightUnit === 'lb' && styles.toggleButtonSelected]}
              >
                <Text style={[styles.toggleText, weightUnit === 'lb' && styles.toggleTextSelected]}>lb</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder={weightUnit === 'kg' ? "75" : "165"}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardType="numeric"
          />
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* Footer */}
      <LinearGradient
        colors={['transparent', '#1f230f', '#1f230f']}
        locations={[0, 0.3, 1]}
        style={styles.footer}
      >
        <TouchableOpacity 
          style={styles.nextButton}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator size="small" color="#1f230f" />
          ) : (
             <>
               <Text style={styles.nextButtonText}>Save</Text>
               <MaterialIcons name="arrow-forward" size={24} color="#1f230f" />
             </>
          )}
        </TouchableOpacity>
      </LinearGradient>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f230f',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  description: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ccff00',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  genderButtonSelected: {
    backgroundColor: '#ccff00',
    borderColor: '#ccff00',
  },
  genderButtonUnselected: {
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderColor: 'transparent',
  },
  iconSelected: {
    opacity: 1,
  },
  iconUnselected: {
    opacity: 0.5,
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSelected: {
    color: '#1f230f',
  },
  textUnselected: {
    color: '#cbd5e1',
  },
  valueText: {
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: 'bold',
  },
  unitText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '400',
  },
  sliderContainer: {
    paddingVertical: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  toggleButtonSelected: {
    backgroundColor: '#ccff00',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  toggleTextSelected: {
    color: '#1f230f',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 48,
  },
  nextButton: {
    backgroundColor: '#ccff00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#ccff00",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: '#1f230f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
