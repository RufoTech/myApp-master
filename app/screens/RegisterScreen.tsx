import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { colors } from '@/constants/theme';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundDark} />
      
      {/* Decorative background elements */}
      <View style={styles.decorativeCircleTop} />
      <View style={styles.decorativeCircleBottom} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={colors.textMain} />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Hesab Yaradın / Create Account</Text>
            <Text style={styles.subtitle}>Fitnes səyahətinizə başlayın / Start your fitness journey</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ad Soyad / Full Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="Cavid Əliyev / John Doe"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-poçt / Email</Text>
              <TextInput 
                style={styles.input}
                placeholder="nümunə@fitflow.com / example@fitflow.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifrə / Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput 
                  style={[styles.input, { flex: 1, paddingRight: 50 }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <MaterialIcons 
                    name={passwordVisible ? "visibility" : "visibility-off"} 
                    size={24} 
                    color={colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifrənin təsdiqi / Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput 
                  style={[styles.input, { flex: 1, paddingRight: 50 }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  <MaterialIcons 
                    name={confirmPasswordVisible ? "visibility" : "visibility-off"} 
                    size={24} 
                    color={colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={styles.registerButton} 
              activeOpacity={0.9} 
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.registerButtonText}>Qeydiyyatdan Keç / Sign Up</Text>
            </TouchableOpacity>

          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>VƏ YA / OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD8oHVJB8N0wRAb00bfy0dauuxWculNOpn2LZk2P_m81mkKsjoOUe1WqmUxUS96V5FIijGkdaIXWK5-4QZZGkUF4aXCl6j96zSJzTiBYas47AfXHKbWqfCi_OQOPA4HNBFr_TzmAbZLst4WE2r30SMYl3nhEAoGoXE04re7nMS_5EymNwGdzBGdLtM1ugd4k5h1uEHN5uaB5opnlHrZ5D3wu9J3d75OfvKpe6TS4_qvs088K6b_g1NeUuMYneejDOmFafwroy7TvA' }}
                style={styles.googleIcon}
              />
              <Text style={styles.socialButtonText}>Google ilə davam edin</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Artıq hesabınız var? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginLink}>Daxil olun</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerSubText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  decorativeCircleTop: {
    position: 'absolute',
    top: -96,
    right: -96,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    zIndex: 0,
  },
  decorativeCircleBottom: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
    zIndex: 0,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    zIndex: 1,
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: colors.textMain,
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: colors.textMain,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textMain,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  registerButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonText: {
    color: colors.backgroundDark,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  socialContainer: {
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 56,
    borderRadius: 12,
    gap: 12,
  },
  socialButtonText: {
    color: colors.textMain,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 16,
    gap: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  footerSubText: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
});
