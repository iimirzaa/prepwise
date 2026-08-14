import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const SkillsContainer = () => {
  const [skills, setSkills] = useState([
    'React Native',
    'JavaScript',
    'Node.js',
  ]);

  const [showInput, setShowInput] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    // Prevent duplicate skills
    if (skills.some(item => item.toLowerCase() === skill.toLowerCase())) {
      setSkillInput('');
      setShowInput(false);
      return;
    }

    setSkills(prev => [...prev, skill]);

    setSkillInput('');
    setShowInput(false);
  };

  const handleRemoveSkill = skill => {
    setSkills(prev => prev.filter(item => item !== skill));
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headingbox}>
        <View style={styles.icon}>
          <MaterialDesignIcons
            name="code-tags"
            size={moderateScale(18)}
            color="#6f49f6"
          />
        </View>

        <View>
          <Text style={styles.heading}>Top Skills</Text>
          <Text style={styles.subtitle}>
            Add skills you want to practice
          </Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillChip}>
            <Text style={styles.skillText}>
              {skill}
            </Text>

            <Pressable
              onPress={() => handleRemoveSkill(skill)}
              hitSlop={8}>
              <MaterialDesignIcons
                name="close"
                size={moderateScale(15)}
                color="#777"
              />
            </Pressable>
          </View>
        ))}
      </View>

      {/* Input */}
      {showInput && (
        <View style={styles.inputContainer}>

          <TextInput
            value={skillInput}
            onChangeText={setSkillInput}
            placeholder="Enter skill..."
            placeholderTextColor="#999"
            style={styles.input}
            autoFocus
            onSubmitEditing={handleAddSkill}
          />

          <Pressable
            style={styles.confirmButton}
            onPress={handleAddSkill}>
            <MaterialDesignIcons
              name="check"
              size={moderateScale(18)}
              color="white"
            />
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setSkillInput('');
              setShowInput(false);
            }}>
            <MaterialDesignIcons
              name="close"
              size={moderateScale(18)}
              color="#777"
            />
          </Pressable>

        </View>
      )}

      {/* Add Skill */}
      {!showInput && (
        <Pressable
          style={styles.addSkill}
          onPress={() => setShowInput(true)}>

          <MaterialDesignIcons
            name="plus"
            size={moderateScale(18)}
            color="#6f49f6"
          />

          <Text style={styles.addSkillText}>
            Add Skill
          </Text>

        </Pressable>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    width: '100%',
    marginVertical: verticalScale(5),
    elevation: 5,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
  },

  headingbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(10),
    backgroundColor: '#E9E5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: '#2C2C2C',
    marginLeft: scale(8),
  },

  subtitle: {
    fontSize: moderateScale(10),
    color: '#888',
    marginLeft: scale(8),
    marginTop: verticalScale(1),
  },

  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(7),
    marginTop: verticalScale(12),
  },

  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#E5DEFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
  },

  skillText: {
    fontSize: moderateScale(11),
    color: '#444',
    fontWeight: '500',
    marginRight: scale(5),
  },

  addSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: verticalScale(12),
    paddingVertical: verticalScale(5),
  },

  addSkillText: {
    color: '#6f49f6',
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginLeft: scale(4),
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(12),
    color: '#222',
  },

  confirmButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(8),
    backgroundColor: '#6f49f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(6),
  },

  cancelButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(8),
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(5),
  },
});

export default SkillsContainer;