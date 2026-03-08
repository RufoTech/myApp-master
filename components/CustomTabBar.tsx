import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: any;
        if (route.name === 'index') iconName = 'home';
        else if (route.name === 'programs') iconName = 'format-list-bulleted';
        else if (route.name === 'create') iconName = 'add';
        else if (route.name === 'calendar') iconName = 'calendar-today';
        else if (route.name === 'profile') iconName = 'person';
        else iconName = 'circle'; // Fallback

        // Special styling for Create button
        if (route.name === 'create') {
            return (
                <TouchableOpacity
                    key={index}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.navItem}
                    activeOpacity={0.8}
                >
                    <View style={styles.createButton}>
                        <MaterialIcons name="add" size={24} color="#1f230f" />
                    </View>
                    <Text style={[styles.navText, isFocused && styles.activeText]}>
                        Create
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={iconName}
              size={24}
              color={isFocused ? '#ccff00' : '#94a3b8'}
            />
            <Text style={[styles.navText, isFocused && styles.activeText]}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(31, 35, 15, 0.95)', // Slightly more opaque for visibility
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 8,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#94a3b8', // slate-400
    marginTop: 4,
  },
  activeText: {
    color: '#ccff00', // primary color
  },
  createButton: {
    backgroundColor: '#ccff00', // primary color
    width: 48, // Slightly larger touch target
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginTop: -20, // Push it up slightly to break the line
    shadowColor: '#ccff00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 4,
    borderColor: 'rgba(31, 35, 15, 0.95)', // Match background to create "cutout" effect
  },
});

export default CustomTabBar;
