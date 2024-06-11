import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
//import FontAwesome6 from 'react-native-vector-icons/Ionicons';

const data = [
  { key: '1', value: 'none', },
  { key: '2', value: 'high' },
  { key: '3', value: 'medium' },
  { key: '4', value: 'low', }
]

type Task = {
  title: string | null,
  description: string | null,
  priority: string,
  date: Date | null,
  time: Date | null,
  done: boolean
};



function TaskInputField(props: any) {

  const [title, setTitle] = useState("");




  const handleAddTask = (value: any) => {
      const temp: Task = {
        title: value,
        description: null,
        date: null,
        time: null,
        priority: props.priority,
        done: false
      }
      
      props.addTask(temp);
      setTitle("");
  }


  return (

    <KeyboardAvoidingView style={styles.container}>
      <TextInput style={styles.inputField} value={title} onChangeText={text => setTitle(text)} placeholder={'Write a task'} placeholderTextColor={'#fff'} />
      <TouchableOpacity onPress={() => handleAddTask(title)}>
        <View style={styles.button}>
        
          <Text style={styles.plusButton}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

  );
}





const styles = StyleSheet.create({

  container: {
    borderColor: '#fff',
    backgroundColor: '#3E3364',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
  },
  testo: {
    color: "black",
    fontSize: 10
  },
  inputField: {
    color: '#fff',
    height: 50,
    flex: 1,
  },
  button: {
    height: 38,
    width: 38,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "black"
  },
  plusButton: {
    color: 'purple',
    fontSize: 31,
    fontWeight: "900",
    paddingBottom: 0
  }
});

export default TaskInputField;