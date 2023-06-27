import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, DatePickerAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [profilePicture, setProfilePicture] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleChooseProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === true) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setProfilePicture(pickerResult.uri);
    }
  };

  const handleSaveChanges = () => {
    // Perform saving logic here
    // Update user information
    setEditing(false);
  };

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Handle the date selection
        // Update user's date of birth
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseProfilePicture}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>Choose Picture</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Name:</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
      <Text style={styles.label}>Bio:</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
          multiline
        />
      ) : (
        <Text style={styles.text}>{bio}</Text>
      )}
      <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
        <Text style={styles.editButtonText}>{editing ? 'Cancel' : 'Edit'}</Text>
      </TouchableOpacity>
      {editing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.datePickerButton} onPress={openDatePicker}>
        <Text style={styles.datePickerButtonText}>Select Date of Birth</Text>
      </TouchableOpacity>
      {/* Add other editable fields such as dropdown menus here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholderText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#4287f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#42f560',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#42c5f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  datePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
