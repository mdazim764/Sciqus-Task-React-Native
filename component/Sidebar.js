import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Enable Layout Animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Example data for your sidebar
const menuItemsData = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    subItems: [],
  },
  {
    label: 'Audience',
    icon: 'groups',
    subItems: [],
  },
  {
    label: 'Posts',
    icon: 'article',
    subItems: [{label: 'Schedules', icon: 'schedule'}],
  },
  {
    label: 'Income',
    icon: 'attach-money',
    subItems: [
      {label: 'Earnings', icon: 'payments'},
      {label: 'Refunds', icon: 'restore'},
      {label: 'Declines', icon: 'highlight-off'},
      {label: 'Payouts', icon: 'account-balance'},
    ],
  },
  {
    label: 'Settings',
    icon: 'settings',
    subItems: [],
  },
];

/**
 * @param {boolean} collapsed - icons-only vs. icons+text
 * @param {function} setCollapsed - function to toggle the collapsed state
 */
const Sidebar = ({collapsed, setCollapsed}) => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Expand/Collapse a single menu item
  const toggleExpand = itemLabel => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItem(prev => (prev === itemLabel ? null : itemLabel));
  };

  // Toggle entire sidebar
  const toggleSidebar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  // Dynamic icon and label for the toggle button
  const toggleIcon = collapsed ? 'chevron-right' : 'chevron-left';
  const toggleLabel = collapsed ? '' : '';

  return (
    <View style={[styles.container, {width: collapsed ? 55 : 240}]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
          }}
        />
        {/* Show profile name/role only when expanded */}
        {!collapsed && (
          <>
            <Text style={styles.profileName}>Andrew Smith</Text>
            <Text style={styles.profileRole}>Product Manager</Text>
          </>
        )}
      </View>

      {/* Main Menu Items */}
      <View style={styles.menuContainer}>
        {menuItemsData.map((item, index) => {
          const isExpanded = expandedItem === item.label;
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <View key={index}>
              {/* Main Menu Row */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (hasSubItems) {
                    toggleExpand(item.label);
                  }
                  // If no subItems, handle navigation or logic
                }}>
                <Icon name={item.icon} size={24} color="#ffffff" />
                {!collapsed && (
                  <Text style={styles.menuText}>{item.label}</Text>
                )}

                {hasSubItems && !collapsed && (
                  <Icon
                    name={
                      isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    size={24}
                    color="#ffffff"
                    style={{marginLeft: 'auto'}}
                  />
                )}
              </TouchableOpacity>

              {/* Submenu Items */}
              {isExpanded &&
                item.subItems.map((subItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    style={[
                      styles.subMenuItem,
                      {paddingLeft: collapsed ? 20 : 40},
                    ]}
                    onPress={() => {
                      // handle sub-item
                    }}>
                    <Icon
                      name={subItem.icon}
                      size={20}
                      color="#ffffff"
                      style={{marginRight: 10}}
                    />
                    {!collapsed && (
                      <Text style={styles.subMenuText}>{subItem.label}</Text>
                    )}
                  </TouchableOpacity>
                ))}
            </View>
          );
        })}
      </View>

      {/* Bottom Actions (Help, Logout, Toggle Sidebar) */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-outline" size={24} color="#ffffff" />
          {!collapsed && <Text style={styles.menuText}>Help</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="exit-to-app" size={24} color="#ffffff" />
          {!collapsed && <Text style={styles.menuText}>Logout Account</Text>}
        </TouchableOpacity>

        {/* Last button toggles the sidebar */}
        <TouchableOpacity style={styles.menuItem} onPress={toggleSidebar}>
          <Icon name={toggleIcon} size={24} color="#ffffff" />
          {!collapsed && <Text style={styles.menuText}>{toggleLabel}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#439cf0',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 99,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: {
    color: '#ffffff',
    fontSize: 12,
  },
  menuContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 10,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subMenuText: {
    color: '#ffffff',
    fontSize: 13,
  },
  bottomSection: {
    marginTop: 10,
  },
});
